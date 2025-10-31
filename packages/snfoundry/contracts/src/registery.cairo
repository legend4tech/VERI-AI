#[starknet::contract]
mod Registry {
    use crate::interfaces::ikyc_manager::IKYCManagerDispatcher;
use core::num::traits::Zero;
    use starknet::storage::{Map, StoragePointerReadAccess, StoragePointerWriteAccess};
    use starknet::{ContractAddress, get_block_timestamp, get_caller_address, get_contract_address};
    use crate::constants::role::Roles;
    use crate::events::registry_contract_events::{
        FeeRecipientUpdated, FeeTransferred, PropertyActivated, PropertyDeactivated,
        PropertyRegistered, PropertyStatusUpdated, RealtorPropertyCount, TokenFactoryUpdated,
        TokenLinked,
    };
    use crate::interfaces::iaccess_manager::{
        IAccessManagerDispatcher, IAccessManagerDispatcherTrait,
    };
    use crate::interfaces::iregistory_contract::IRegistry;
    use crate::structs::registery_struct::Property;


    // Status constants
    const STATUS_PENDING: felt252 = 0;
    const STATUS_ACTIVE: felt252 = 1;
    const STATUS_DEACTIVATED: felt252 = 2;

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        PropertyRegistered: PropertyRegistered,
        TokenLinked: TokenLinked,
        PropertyStatusUpdated: PropertyStatusUpdated,
        PropertyDeactivated: PropertyDeactivated,
        TokenFactoryUpdated: TokenFactoryUpdated,
        FeeTransferred: FeeTransferred,
        FeeRecipientUpdated: FeeRecipientUpdated,
        RealtorPropertyCount: RealtorPropertyCount,
        PropertyDetailsUpdated: PropertyDetailsUpdated,
        PropertyActivated: PropertyActivated,
    }

    #[derive(Drop, starknet::Event)]
    struct PropertyDetailsUpdated {
        #[key]
        property_id: u256,
        updated_by: ContractAddress,
    }


    #[storage]
    struct Storage {
        property_counter: u256,
        fee_recipient: ContractAddress,
        price_feed: ContractAddress,
        token_factory: ContractAddress,
        kyc_manager: ContractAddress,
        access_manager: ContractAddress,
        vault: ContractAddress,
        eth: ContractAddress,
        properties: Map<u256, Property>,
        realtor_property_length: Map<ContractAddress, u256>,
        realtor_properties: Map<(ContractAddress, u256), u256>,
    }

    #[constructor]
    fn constructor(
        ref self: ContractState,
        admin: ContractAddress,
        token_factory: ContractAddress,
        fee_recipient: ContractAddress,
        price_feed: ContractAddress,
        kyc_manager: ContractAddress,
        access_manager: ContractAddress,
        vault: ContractAddress,
        eth: ContractAddress,
    ) {
        self.fee_recipient.write(fee_recipient);
        self.price_feed.write(price_feed);
        self.token_factory.write(token_factory);
        self.kyc_manager.write(kyc_manager);
        self.access_manager.write(access_manager);
        self.vault.write(vault);
        self.eth.write(eth);
    }

    fn u256_to_byte_array(mut value: u256) -> ByteArray {
        let mut result: ByteArray = Default::default();
        if value == 0 {
            result.append_byte(48_u8);
            return result;
        }
        let mut temp: Array<u8> = ArrayTrait::new();
        while value > 0 {
            let digit: u8 = ((value % 10).low.try_into().unwrap()) + 48_u8;
            temp.append(digit);
            value /= 10;
        }
        let len = temp.len();
        let mut i = len;
        while i > 0 {
            result.append_byte(*temp.at(i - 1));
            i -= 1;
        }
        result
    }

    // fn get_eth_amount_from_usd(usd_amount: u256, price_feed: ContractAddress) -> u256 {
    //     let dispatcher = IAggregatorV3InterfaceDispatcher { contract_address: price_feed };
    //     let (_, answer, _, _, _) = dispatcher.latest_round_data();
    //     assert(answer > 0, 'Invalid price');
    //     let price: u256 = answer.try_into().unwrap();
    //     let ten_pow_26: u256 = 10000000000000000000000000;
    //     (usd_amount * ten_pow_26) / price
    // }

    
      

    #[generate_trait]
    impl InternalImpl of InternalTrait {
        fn only_realtor(self: @ContractState) {
            let caller = get_caller_address();

            let access_manager = IAccessManagerDispatcher {
                contract_address: self.access_manager.read(),
            };

            // Assuming "_ROLE" is a constant defined somewhere
            let role = Roles::REALTOR_ROLE;
            let is_admin = access_manager.has_any_role(caller, array![role].span());

            assert(is_admin, 'Not authorized: Realtor only');
        }

        fn valid_property(self: @ContractState, property_id: u256) {
            assert(
                property_id > 0 && property_id <= self.property_counter.read(),
                'Invalid property ID',
            );
        }

        fn _is_valid_uri(self: @ContractState, uri: @ByteArray) -> bool {
            if uri.len() < 9 {
                return false;
            }
            let ipfs_prefix: ByteArray = "ipfs://";
            let https_prefix: ByteArray = "https://";
            self._starts_with(uri, @ipfs_prefix) || self._starts_with(uri, @https_prefix)
        }

        fn _starts_with(self: @ContractState, data: @ByteArray, prefix: @ByteArray) -> bool {
            if data.len() < prefix.len() {
                return false;
            }
            let mut i: usize = 0;
            loop {
                if i >= prefix.len() {
                    break true;
                }
                if data.byte_at(i).unwrap() != prefix.byte_at(i).unwrap() {
                    break false;
                }
                i += 1;
            }
        }

        fn _calculate_token_supply(
            self: @ContractState, total_value_usd: u256, price_per_token_usd: u256,
        ) -> u256 {
            assert!(price_per_token_usd > 0, "Token price must be greater than zero");
            (total_value_usd * 1000000000000000000) / price_per_token_usd
        }

        fn _is_property_complete(self: @ContractState, prop: @Property) -> bool {
            prop.name.len() >= 5
                && prop.description.len() >= 30
                && prop.property_type.len() > 0
                && prop.address_.len() >= 10
                && prop.city.len() > 0
                && prop.state.len() > 0
                && prop.bedrooms > 0
                && prop.bathrooms > 0
                && prop.square_footage > 0
                && prop.year_built > 1000
                && // Assume min 4 digits
                prop.features.len() > 0
                && // Assume >4 features
                prop.land_size > 0
                && prop.north_border.len() >= 6
                && prop.south_border.len() >= 6
                && prop.east_border.len() >= 6
                && prop.west_border.len() >= 6
                && prop.land_title.len() > 0
                && prop.survey_plan.len() >= 15
                && prop.total_value > 99999
                && // min 6 digits
                prop.price_per_token > 9999
                && // minInvestment min 5 digits
                prop.latitude.len() >= 8
                && prop.longitude.len() >= 8
                && prop.images.len() > 0
                && // min 4
                prop.documents.len() > 0
                && // min 2
                prop.document_types.len() > 0 // match documents
        }


           fn generate_symbol(name: @ByteArray, id: u256) -> ByteArray {
            let mut symbol: ByteArray = name.clone();
            symbol.append(@"-");
            let id_str = u256_to_byte_array(id);
            symbol.append(@id_str);
            symbol
        }

        fn generate_name(name: @ByteArray, id: u256) -> ByteArray {
            let mut token_name: ByteArray = "Brickchain Property - ";
            token_name.append(name);
            token_name.append(@" #");
            let id_str = u256_to_byte_array(id);
            token_name.append(@id_str);
            token_name
        }
    
    }

    #[abi(embed_v0)]
    impl RegistryImpl of IRegistry<ContractState> {
        fn register_property(
            ref self: ContractState,
            name: ByteArray,
            description: ByteArray,
            property_type: ByteArray,
            construction_status: Option<ByteArray>,
            completion_date: Option<ByteArray>,
            address_: ByteArray,
            city: ByteArray,
            state: ByteArray,
            bedrooms: u32,
            bathrooms: u32,
            square_footage: u256,
            year_built: u32,
            features: ByteArray,
            land_size: u256,
            north_border: ByteArray,
            south_border: ByteArray,
            east_border: ByteArray,
            west_border: ByteArray,
            land_title: ByteArray,
            survey_plan: ByteArray,
            total_value_usd: u256,
            price_per_token_usd: u256,
            expected_roi: Option<ByteArray>,
            latitude: ByteArray,
            longitude: ByteArray,
            accuracy: Option<ByteArray>,
            location_method: Option<ByteArray>,
            metadata_uri: ByteArray,
            images: ByteArray,
            documents: ByteArray,
            document_types: ByteArray,
            location: Option<ByteArray>,
        ) {
            let caller = get_caller_address();
            self.only_realtor();
            let kyc_dispatcher = IKYCManagerDispatcher {
                contract_address: self.kyc_manager.read(),
            };
            assert(kyc_dispatcher.is_verified(caller), 'KYC not approved');
            assert(total_value_usd > 0, 'Total property value must be > 0');
            assert(name.len() >= 5, 'Property name must be at least 5 characters');
            assert(description.len() >= 30, 'Description must be at least 30 characters');
            assert(property_type.len() > 0, 'Property type is required');
            assert(address_.len() >= 10, 'Address must be at least 10 characters');
            assert(city.len() > 0, 'City is required');
            assert(state.len() > 0, 'State is required');
            assert(bedrooms > 0, 'Bedrooms is required');
            assert(bathrooms > 0, 'Bathrooms is required');
            assert(square_footage > 0, 'Square footage is required');
            assert(year_built > 1000, 'Year built must be at least 4 digits');
            assert(features.len() > 0, 'Features is required');
            assert(land_size > 0, 'Land size is required');
            assert(north_border.len() >= 6, 'North border must be at least 6 characters');
            assert(south_border.len() >= 6, 'South border must be at least 6 characters');
            assert(east_border.len() >= 6, 'East border must be at least 6 characters');
            assert(west_border.len() >= 6, 'West border must be at least 6 characters');
            assert(land_title.len() > 0, 'Land title is required');
            assert(survey_plan.len() >= 15, 'Survey plan must be at least 15 characters');
            assert(latitude.len() >= 8, 'Latitude must be at least 8 characters');
            assert(longitude.len() >= 8, 'Longitude must be at least 8 characters');
            assert(self._is_valid_uri(@metadata_uri), 'Invalid metadata URI');
            assert(images.len() > 0, 'Images are required');
            assert(documents.len() > 0, 'Documents are required');
            assert(document_types.len() > 0, 'Document types are required');
            if total_value_usd < 50000 {
                assert(price_per_token_usd == 5, 'Token price must be $5 for properties < $50k');
            } else if total_value_usd <= 150000 {
                assert(price_per_token_usd == 10, 'Token price must be $10 for $50k-$150k');
            } else {
                assert(price_per_token_usd == 20, 'Token price must be $20 for properties > $150k');
            }
            let listing_fee_usd = (total_value_usd * 15) / 100;
            let listing_fee_eth = get_eth_amount_from_usd(listing_fee_usd, self.price_feed.read());
            let eth_dispatcher = IERC20Dispatcher { contract_address: self.eth.read() };
            let fee_recipient = self.fee_recipient.read();
            eth_dispatcher.transfer_from(caller, fee_recipient, listing_fee_eth);
            self
                .emit(
                    Event::FeeTransferred(
                        FeeTransferred { recipient: fee_recipient, amount: listing_fee_eth },
                    ),
                );
            self.property_counter.write(self.property_counter.read() + 1);
            let new_property_id = self.property_counter.read();
            let token_symbol = symbol_utils::generate_symbol(@name, new_property_id);
            let token_name = symbol_utils::generate_name(@name, new_property_id);
            let token_supply = self._calculate_token_supply(total_value_usd, price_per_token_usd);
            let mut brick_symbol: ByteArray = "BRICK";
            let id_str = u256_to_byte_array(new_property_id);
            brick_symbol.append(@id_str);
            let token_factory_dispatcher = ITokenFactoryDispatcher {
                contract_address: self.token_factory.read(),
            };
            let token = token_factory_dispatcher
                .create_token(
                    name.clone(),
                    brick_symbol,
                    token_supply,
                    token_name,
                    token_symbol,
                    metadata_uri.clone(),
                    self.kyc_manager.read(),
                    get_contract_address(),
                    self.vault.read(),
                );
            assert(!token.is_zero(), 'Token creation failed');
            let realtor_length = self.realtor_property_length.read(caller);
            let mut property = Property {
                id: new_property_id,
                name: name,
                description: description,
                property_type: property_type,
                construction_status: "",
                completion_date: "",
                address_: address_,
                city: city,
                state: state,
                bedrooms: bedrooms,
                bathrooms: bathrooms,
                square_footage: square_footage,
                year_built: year_built,
                features: features,
                land_size: land_size,
                north_border: north_border,
                south_border: south_border,
                east_border: east_border,
                west_border: west_border,
                land_title: land_title,
                survey_plan: survey_plan,
                total_value: total_value_usd,
                price_per_token: price_per_token_usd,
                expected_roi: "",
                latitude: latitude,
                longitude: longitude,
                accuracy: "",
                location_method: "",
                metadata_uri: metadata_uri,
                images: images,
                documents: documents,
                document_types: document_types,
                token_address: token,
                realtor: caller,
                vault: self.vault.read(),
                listed_fee: listing_fee_usd,
                timestamp: get_block_timestamp(),
                token_supply: token_supply,
                status: STATUS_PENDING,
                location: "",
            };
            if let Option::Some(val) = construction_status {
                property.construction_status = val;
            }
            if let Option::Some(val) = completion_date {
                property.completion_date = val;
            }
            if let Option::Some(val) = expected_roi {
                property.expected_roi = val;
            }
            if let Option::Some(val) = accuracy {
                property.accuracy = val;
            }
            if let Option::Some(val) = location_method {
                property.location_method = val;
            }
            if let Option::Some(val) = location {
                property.location = val;
            }
            if self._is_property_complete(@property) {
                property.status = STATUS_ACTIVE;
                self
                    .emit(
                        Event::PropertyActivated(
                            PropertyActivated {
                                property_id: new_property_id, activated_by: caller,
                            },
                        ),
                    );
            }
            self.properties.write(new_property_id, property);
            self.realtor_properties.write((caller, realtor_length), new_property_id);
            self.realtor_property_length.write(caller, realtor_length + 1);
            self
                .emit(
                    Event::PropertyRegistered(
                        PropertyRegistered {
                            property_id: new_property_id,
                            realtor: caller,
                            name: property.name.clone(),
                            description: property.description.clone(),
                            listed_fee: listing_fee_usd,
                            metadata_uri: property.metadata_uri.clone(),
                            timestamp: property.timestamp,
                        },
                    ),
                );
            self
                .emit(
                    Event::RealtorPropertyCount(
                        RealtorPropertyCount { realtor: caller, count: realtor_length + 1 },
                    ),
                );
            self.emit(Event::TokenLinked(TokenLinked { property_id: new_property_id, token }));
        }

        fn update_property_details(
            ref self: ContractState,
            property_id: u256,
            description: Option<ByteArray>,
            property_type: Option<ByteArray>,
            construction_status: Option<ByteArray>,
            completion_date: Option<ByteArray>,
            address_: Option<ByteArray>,
            city: Option<ByteArray>,
            state: Option<ByteArray>,
            bedrooms: Option<u32>,
            bathrooms: Option<u32>,
            square_footage: Option<u256>,
            year_built: Option<u32>,
            features: Option<ByteArray>,
            land_size: Option<u256>,
            north_border: Option<ByteArray>,
            south_border: Option<ByteArray>,
            east_border: Option<ByteArray>,
            west_border: Option<ByteArray>,
            land_title: Option<ByteArray>,
            survey_plan: Option<ByteArray>,
            expected_roi: Option<ByteArray>,
            latitude: Option<ByteArray>,
            longitude: Option<ByteArray>,
            accuracy: Option<ByteArray>,
            location_method: Option<ByteArray>,
            metadata_uri: Option<ByteArray>,
            images: Option<ByteArray>,
            documents: Option<ByteArray>,
            document_types: Option<ByteArray>,
            location: Option<ByteArray>,
        ) {
            self.valid_property(property_id);
            let mut prop = self.properties.read(property_id);
            let caller = get_caller_address();
            assert(caller == prop.realtor, 'Only realtor can update');
            assert(prop.status == STATUS_PENDING, 'Can only update pending properties');
            if let Option::Some(val) = description {
                prop.description = val;
            }
            if let Option::Some(val) = property_type {
                prop.property_type = val;
            }
            if let Option::Some(val) = construction_status {
                prop.construction_status = val;
            }
            if let Option::Some(val) = completion_date {
                prop.completion_date = val;
            }
            if let Option::Some(val) = address_ {
                prop.address_ = val;
            }
            if let Option::Some(val) = city {
                prop.city = val;
            }
            if let Option::Some(val) = state {
                prop.state = val;
            }
            if let Option::Some(val) = bedrooms {
                prop.bedrooms = val;
            }
            if let Option::Some(val) = bathrooms {
                prop.bathrooms = val;
            }
            if let Option::Some(val) = square_footage {
                prop.square_footage = val;
            }
            if let Option::Some(val) = year_built {
                prop.year_built = val;
            }
            if let Option::Some(val) = features {
                prop.features = val;
            }
            if let Option::Some(val) = land_size {
                prop.land_size = val;
            }
            if let Option::Some(val) = north_border {
                prop.north_border = val;
            }
            if let Option::Some(val) = south_border {
                prop.south_border = val;
            }
            if let Option::Some(val) = east_border {
                prop.east_border = val;
            }
            if let Option::Some(val) = west_border {
                prop.west_border = val;
            }
            if let Option::Some(val) = land_title {
                prop.land_title = val;
            }
            if let Option::Some(val) = survey_plan {
                prop.survey_plan = val;
            }
            if let Option::Some(val) = expected_roi {
                prop.expected_roi = val;
            }
            if let Option::Some(val) = latitude {
                prop.latitude = val;
            }
            if let Option::Some(val) = longitude {
                prop.longitude = val;
            }
            if let Option::Some(val) = accuracy {
                prop.accuracy = val;
            }
            if let Option::Some(val) = location_method {
                prop.location_method = val;
            }
            if let Option::Some(val) = metadata_uri {
                prop.metadata_uri = val;
            }
            if let Option::Some(val) = images {
                prop.images = val;
            }
            if let Option::Some(val) = documents {
                prop.documents = val;
            }
            if let Option::Some(val) = document_types {
                prop.document_types = val;
            }
            if let Option::Some(val) = location {
                prop.location = val;
            }
            if self._is_property_complete(@prop) {
                prop.status = STATUS_ACTIVE;
                self
                    .emit(
                        Event::PropertyActivated(
                            PropertyActivated { property_id, activated_by: caller },
                        ),
                    );
            }
            self.properties.write(property_id, prop);
            self
                .emit(
                    Event::PropertyDetailsUpdated(
                        PropertyDetailsUpdated { property_id, updated_by: caller },
                    ),
                );
        }

        fn activate_property(ref self: ContractState, property_id: u256) {
            self.valid_property(property_id);
            let mut prop = self.properties.read(property_id);
            let caller = get_caller_address();
            let access_dispatcher = IAccessManagerDispatcher {
                contract_address: self.access_manager.read(),
            };
            assert(
                caller == prop.realtor
                    || access_dispatcher.has_role(access_dispatcher.default_admin_role(), caller),
                'Not authorized',
            );
            assert(prop.status == STATUS_PENDING, 'Not pending');
            assert(self._is_property_complete(@prop), 'Property not complete');
            prop.status = STATUS_ACTIVE;
            self.properties.write(property_id, prop);
            self
                .emit(
                    Event::PropertyActivated(
                        PropertyActivated { property_id, activated_by: caller },
                    ),
                );
        }

        fn get_property(self: @ContractState, property_id: u256) -> Property {
            self.valid_property(property_id);
            self.properties.read(property_id)
        }

        fn get_all_properties(self: @ContractState) -> Array<Property> {
            let counter = self.property_counter.read();
            let mut props: Array<Property> = ArrayTrait::new();
            let mut i: u256 = 1;
            while i <= counter {
                props.append(self.properties.read(i));
                i += 1;
            }
            props
        }

        fn update_property_status(ref self: ContractState, property_id: u256, is_active: bool) {
            self.valid_property(property_id);
            let mut prop = self.properties.read(property_id);
            let caller = get_caller_address();
            let access_dispatcher = IAccessManagerDispatcher {
                contract_address: self.access_manager.read(),
            };
            assert(
                caller == prop.realtor
                    || access_dispatcher.has_role(access_dispatcher.default_admin_role(), caller),
                'Not authorized',
            );
            prop.is_active = is_active;
            if !is_active {
                prop.status = STATUS_DEACTIVATED;
            } else if self._is_property_complete(@prop) {
                prop.status = STATUS_ACTIVE;
            } else {
                prop.status = STATUS_PENDING;
            }
            self.properties.write(property_id, prop);
            self
                .emit(
                    Event::PropertyStatusUpdated(PropertyStatusUpdated { property_id, is_active }),
                );
        }

        fn grant_realtor_role(ref self: ContractState, realtor: ContractAddress) {
            let access_dispatcher = IAccessManagerDispatcher {
                contract_address: self.access_manager.read(),
            };
            access_dispatcher.assert_only_role(access_dispatcher.default_admin_role());
            access_dispatcher.grant_role(selector!("REALTOR_ROLE"), realtor);
        }

        fn revoke_realtor_role(ref self: ContractState, realtor: ContractAddress) {
            let access_dispatcher = IAccessManagerDispatcher {
                contract_address: self.access_manager.read(),
            };
            access_dispatcher.assert_only_role(access_dispatcher.default_admin_role());
            access_dispatcher.revoke_role(selector!("REALTOR_ROLE"), realtor);
        }

        fn get_properties_by_realtor(
            self: @ContractState, realtor: ContractAddress,
        ) -> Array<u256> {
            let length = self.realtor_property_length.read(realtor);
            let mut props: Array<u256> = ArrayTrait::new();
            let mut i: u256 = 0;
            while i < length {
                props.append(self.realtor_properties.read((realtor, i)));
                i += 1;
            }
            props
        }

        fn update_fee_recipient(ref self: ContractState, new_recipient: ContractAddress) {
            let access_dispatcher = IAccessManagerDispatcher {
                contract_address: self.access_manager.read(),
            };
            access_dispatcher.assert_only_role(access_dispatcher.default_admin_role());
            assert(!new_recipient.is_zero(), 'Invalid address');
            self.fee_recipient.write(new_recipient);
            self.emit(Event::FeeRecipientUpdated(FeeRecipientUpdated { new_recipient }));
        }

        fn withdraw(ref self: ContractState) {
            let access_dispatcher = IAccessManagerDispatcher {
                contract_address: self.access_manager.read(),
            };
            access_dispatcher.assert_only_role(access_dispatcher.default_admin_role());
            let eth_dispatcher = IERC20Dispatcher { contract_address: self.eth.read() };
            let balance = eth_dispatcher.balance_of(get_contract_address());
            assert(balance > 0, 'No ETH to withdraw');
            eth_dispatcher.transfer(self.fee_recipient.read(), balance);
        }

        fn update_token_factory(ref self: ContractState, new_factory: ContractAddress) {
            let access_dispatcher = IAccessManagerDispatcher {
                contract_address: self.access_manager.read(),
            };
            access_dispatcher.assert_only_role(access_dispatcher.default_admin_role());
            assert(!new_factory.is_zero(), 'Invalid address');
            self.token_factory.write(new_factory);
            self.emit(Event::TokenFactoryUpdated(TokenFactoryUpdated { new_factory }));
        }
    }
}
