#[starknet::contract]
pub mod Registry {
    use starknet::{ContractAddress, get_caller_address, get_contract_address, get_block_timestamp};
    use starknet::class_hash::ClassHash;

    // Interfaces (traits)
    #[starknet::interface]
    trait IAggregatorV3Interface<TContractState> {
        fn latest_round_data(ref self: TContractState) -> (u128, i256, u256, u256, u128);
    }

    #[starknet::interface]
    trait IKYCManager<TContractState> {
        fn is_kyc_approved(ref self: TContractState, account: ContractAddress) -> bool;
    }

    #[starknet::interface]
    trait ITokenFactory<TContractState> {
        fn create_token(
            ref self: TContractState, 
            name: ByteArray, 
            symbol: ByteArray, 
            total_supply: u256, 
            token_name: ByteArray, 
            token_symbol: ByteArray, 
            metadata_uri: ByteArray, 
            kyc_manager: ContractAddress, 
            owner: ContractAddress, 
            vault: ContractAddress
        ) -> ContractAddress;
    }

    #[starknet::interface]
    trait IERC20<TContractState> {
        fn balance_of(ref self: TContractState, account: ContractAddress) -> u256;
        fn transfer(ref self: TContractState, recipient: ContractAddress, amount: u256) -> bool;
        fn transfer_from(ref self: TContractState, sender: ContractAddress, recipient: ContractAddress, amount: u256) -> bool;
    }

    // Assume IRegistry trait if needed, but not used in implementation
    #[starknet::interface]
    trait IRegistry<TContractState> {
        // Add functions if definitions are available
    }

    // Events
    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        FeeTransferred: FeeTransferred,
        PropertyRegistered: PropertyRegistered,
        RealtorPropertyCount: RealtorPropertyCount,
        TokenLinked: TokenLinked,
        PropertyStatusUpdated: PropertyStatusUpdated,
        PropertyDeactivated: PropertyDeactivated,
        FeeRecipientUpdated: FeeRecipientUpdated,
        TokenFactoryUpdated: TokenFactoryUpdated,
    }

    #[derive(Drop, starknet::Event)]
    struct FeeTransferred {
        #[key]
        recipient: ContractAddress,
        amount: u256,
    }

    #[derive(Drop, starknet::Event)]
    struct PropertyRegistered {
        #[key]
        property_id: u256,
        #[key]
        realtor: ContractAddress,
        name: ByteArray,
        description: ByteArray,
        listed_fee: u256,
        metadata_uri: ByteArray,
        timestamp: u64,
    }

    #[derive(Drop, starknet::Event)]
    struct RealtorPropertyCount {
        #[key]
        realtor: ContractAddress,
        count: u256,
    }

    #[derive(Drop, starknet::Event)]
    struct TokenLinked {
        #[key]
        property_id: u256,
        token: ContractAddress,
    }

    #[derive(Drop, starknet::Event)]
    struct PropertyStatusUpdated {
        #[key]
        property_id: u256,
        is_active: bool,
    }

    #[derive(Drop, starknet::Event)]
    struct PropertyDeactivated {
        #[key]
        property_id: u256,
    }

    #[derive(Drop, starknet::Event)]
    struct FeeRecipientUpdated {
        new_recipient: ContractAddress,
    }

    #[derive(Drop, starknet::Event)]
    struct TokenFactoryUpdated {
        new_factory: ContractAddress,
    }

    // Property struct
    #[derive(Copy, Drop, Serde, starknet::Store)]
    struct Property {
        id: u256,
        name: ByteArray,
        location: ByteArray,
        total_value: u256,
        token_address: ContractAddress,
        realtor: ContractAddress,
        description: ByteArray,
        is_active: bool,
        vault: ContractAddress,
        metadata_uri: ByteArray,
        listed_fee: u256,
        price_per_token: u256,
        timestamp: u64,
        token_supply: u256,
        realtor_property_count: u256,
    }

    // Roles
    const DEFAULT_ADMIN_ROLE: felt252 = selector!("DEFAULT_ADMIN_ROLE");
    const REALTOR_ROLE: felt252 = selector!("REALTOR_ROLE");

    #[storage]
    struct Storage {
        property_counter: u256,
        listing_fee: u256,
        fee_recipient: ContractAddress,
        price_feed: ContractAddress,
        token_factory: ContractAddress,
        kyc_manager: ContractAddress,
        vault: ContractAddress,
        eth: ContractAddress, // Added for ETH ERC20 handling
        properties: Map<u256, Property>,
        // Roles: role -> account -> has_role
        roles: Map<(felt252, ContractAddress), bool>,
        // Realtor properties: realtor -> length
        realtor_property_length: Map<ContractAddress, u256>,
        // realtor -> index -> property_id
        realtor_properties: Map<(ContractAddress, u256), u256>,
    }

    #[constructor]
    fn constructor(
        ref self: ContractState,
        admin: ContractAddress,
        token_factory: ContractAddress,
        listing_fee: u256,
        fee_recipient: ContractAddress,
        price_feed: ContractAddress,
        kyc_manager: ContractAddress,
        vault: ContractAddress,
        eth: ContractAddress, 
    ) {
        self.roles.write((DEFAULT_ADMIN_ROLE, admin), true);
        self.token_factory.write(token_factory);
        self.listing_fee.write(listing_fee);
        self._set_fee_recipient(fee_recipient);
        self.price_feed.write(price_feed);
        self.kyc_manager.write(kyc_manager);
        self.vault.write(vault);
        self.eth.write(eth);
    }

    // Helper functions (like libraries)
    fn u256_to_byte_array(mut value: u256) -> ByteArray {
        let mut result: ByteArray = Default::default();
        if value == 0 {
            result.append_byte(b'0');
            return result;
        }
        let mut temp: Array<u8> = ArrayTrait::new();
        while value > 0 {
            let digit: u8 = ((value % 10).low.try_into().unwrap()) + b'0';
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

    fn get_eth_amount_from_usd(usd_amount: u256, price_feed: ContractAddress) -> u256 {
        let dispatcher = IAggregatorV3InterfaceDispatcher { contract_address: price_feed };
        let (_, answer, _, _, _) = dispatcher.latest_round_data();
        assert(answer > 0, 'Invalid price');
        let price: u256 = answer.try_into().unwrap();
        // Chainlink ETH/USD has 8 decimals, so usd_amount * 10**26 / price
        let ten_pow_26: u256 = 10000000000000000000000000;
        (usd_amount * ten_pow_26) / price
    }

    // Assume SymbolUtils implementations (since not provided in original code)
    mod symbol_utils {
        use super::u256_to_byte_array;

        fn generate_symbol(name: @ByteArray, id: u256) -> ByteArray {
            // Assumed implementation: e.g., "BCP-" + name.upper() + "-" + id, but simplified
            // Since StringUtils may have toUpper, but not provided, simplify to name + "-" + id
            let mut symbol: ByteArray = name.clone();
            symbol.append(@"-");
            let id_str = u256_to_byte_array(id);
            symbol.append(@id_str);
            symbol
        }

        fn generate_name(name: @ByteArray, id: u256) -> ByteArray {
            // Assumed: "Brickchain Property - " + name + " #" + id
            let mut token_name: ByteArray = "Brickchain Property - ";
            token_name.append(name);
            token_name.append(@" #");
            let id_str = u256_to_byte_array(id);
            token_name.append(@id_str);
            token_name
        }
    }

    // Modifiers simulated as assertions
    fn only_realtor(self: @ContractState, caller: ContractAddress) {
        assert(self.has_role(REALTOR_ROLE, caller), 'Not authorized: Realtor only');
    }

    fn valid_property(self: @ContractState, property_id: u256) {
        assert(property_id > 0 && property_id <= self.property_counter.read(), 'Invalid property ID');
    }

    #[external(v0)]
    fn register_property(
        ref self: ContractState,
        name: ByteArray,
        location: ByteArray,
        total_value_usd: u256,
        description: ByteArray,
        price_per_token_usd: u256,
        metadata_uri: ByteArray,
    ) {
        let caller = get_caller_address();
        self.only_realtor(caller);

        let kyc_dispatcher = IKYCManagerDispatcher { contract_address: self.kyc_manager.read() };
        assert(kyc_dispatcher.is_kyc_approved(caller), 'KYC not approved');

        assert(total_value_usd > 0, 'Total property value must be > 0');
        assert(name.len() > 0, 'Property name is required');
        assert(self._is_valid_uri(@metadata_uri), 'Invalid metadata URI');

        if (total_value_usd < 50000) {
            assert(price_per_token_usd == 5, 'Token price must be $5 for properties < $50k');
        } else if (total_value_usd <= 150000) {
            assert(price_per_token_usd == 10, 'Token price must be $10 for $50k-$150k');
        } else {
            assert(price_per_token_usd == 20, 'Token price must be $20 for properties > $150k');
        }

        let listing_fee_usd = (total_value_usd * 15) / 100;
        let listing_fee_eth = get_eth_amount_from_usd(listing_fee_usd, self.price_feed.read());

        // Payment adapted for Starknet: assume user approved Registry to spend ETH
        let eth_dispatcher = IERC20Dispatcher { contract_address: self.eth.read() };
        let fee_recipient = self.fee_recipient.read();
        eth_dispatcher.transfer_from(caller, fee_recipient, listing_fee_eth);

        self.emit(Event::FeeTransferred(FeeTransferred { recipient: fee_recipient, amount: listing_fee_eth }));

        self.property_counter.write(self.property_counter.read() + 1);
        let new_property_id = self.property_counter.read();

        let token_symbol = symbol_utils::generate_symbol(@name, new_property_id);
        let token_name = symbol_utils::generate_name(@name, new_property_id);
        let token_supply = self._calculate_token_supply(total_value_usd, price_per_token_usd);

        let mut brick_symbol: ByteArray = "BRICK";
        let id_str = u256_to_byte_array(new_property_id);
        brick_symbol.append(@id_str);

        let token_factory_dispatcher = ITokenFactoryDispatcher { contract_address: self.token_factory.read() };
        let token = token_factory_dispatcher.create_token(
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
        assert(token.is_non_zero(), 'Token creation failed');

        let realtor_length = self.realtor_property_length.read(caller);

        let property = Property {
            id: new_property_id,
            name: name,
            location: location,
            total_value: total_value_usd,
            token_address: token,
            realtor: caller,
            description: description,
            is_active: true,
            vault: self.vault.read(),
            metadata_uri: metadata_uri,
            listed_fee: listing_fee_usd,
            price_per_token: price_per_token_usd,
            timestamp: get_block_timestamp(),
            token_supply: token_supply,
            realtor_property_count: realtor_length + 1,
        };
        self.properties.write(new_property_id, property);

        // Push to realtor properties
        self.realtor_properties.write((caller, realtor_length), new_property_id);
        self.realtor_property_length.write(caller, realtor_length + 1);

        self.emit(Event::PropertyRegistered(PropertyRegistered {
            property_id: new_property_id,
            realtor: caller,
            name: property.name.clone(),
            description: property.description.clone(),
            listed_fee: listing_fee_usd,
            metadata_uri: property.metadata_uri.clone(),
            timestamp: property.timestamp,
        }));
        self.emit(Event::RealtorPropertyCount(RealtorPropertyCount { realtor: caller, count: realtor_length + 1 }));
        self.emit(Event::TokenLinked(TokenLinked { property_id: new_property_id, token }));
    }

    #[view(v0)]
    fn calculate_token_supply(self: @ContractState, total_value_usd: u256, price_per_token_usd: u256) -> u256 {
        self._calculate_token_supply(total_value_usd, price_per_token_usd)
    }

    fn _calculate_token_supply(self: @ContractState, total_value_usd: u256, price_per_token_usd: u256) -> u256 {
        assert(price_per_token_usd > 0, 'Token price must be greater than zero');
        (total_value_usd * 1000000000000000000) / price_per_token_usd
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

    #[external(v0)]
    fn update_property_status(ref self: ContractState, property_id: u256, is_active: bool) {
        self.valid_property(property_id);
        let mut prop = self.properties.read(property_id);
        let caller = get_caller_address();
        assert(caller == prop.realtor || self.has_role(DEFAULT_ADMIN_ROLE, caller), 'Not authorized');
        prop.is_active = is_active;
        self.properties.write(property_id, prop);
        self.emit(Event::PropertyStatusUpdated(PropertyStatusUpdated { property_id, is_active }));
    }

    #[external(v0)]
    fn deactivate_property(ref self: ContractState, property_id: u256) {
        let caller = get_caller_address();
        assert(self.has_role(DEFAULT_ADMIN_ROLE, caller), 'Only admin');
        self.valid_property(property_id);
        let mut prop = self.properties.read(property_id);
        prop.is_active = false;
        self.properties.write(property_id, prop);
        self.emit(Event::PropertyDeactivated(PropertyDeactivated { property_id }));
    }

    #[external(v0)]
    fn grant_realtor_role(ref self: ContractState, realtor: ContractAddress) {
        let caller = get_caller_address();
        assert(self.has_role(DEFAULT_ADMIN_ROLE, caller), 'Only admin');
        self.roles.write((REALTOR_ROLE, realtor), true);
    }

    #[external(v0)]
    fn revoke_realtor_role(ref self: ContractState, realtor: ContractAddress) {
        let caller = get_caller_address();
        assert(self.has_role(DEFAULT_ADMIN_ROLE, caller), 'Only admin');
        self.roles.write((REALTOR_ROLE, realtor), false);
    }

    fn has_role(self: @ContractState, role: felt252, account: ContractAddress) -> bool {
        self.roles.read((role, account))
    }

    #[view(v0)]
    fn get_properties_by_realtor(self: @ContractState, realtor: ContractAddress) -> Array<u256> {
        let length = self.realtor_property_length.read(realtor);
        let mut props: Array<u256> = ArrayTrait::new();
        let mut i: u256 = 0;
        while i < length {
            props.append(self.realtor_properties.read((realtor, i)));
            i += 1;
        }
        props
    }

    #[view(v0)]
    fn get_property(self: @ContractState, property_id: u256) -> Property {
        self.valid_property(property_id);
        self.properties.read(property_id)
    }

    #[external(v0)]
    fn update_fee_recipient(ref self: ContractState, new_recipient: ContractAddress) {
        let caller = get_caller_address();
        assert(self.has_role(DEFAULT_ADMIN_ROLE, caller), 'Only admin');
        assert(new_recipient.is_non_zero(), 'Invalid address');
        self.fee_recipient.write(new_recipient);
        self.emit(Event::FeeRecipientUpdated(FeeRecipientUpdated { new_recipient }));
    }

    #[external(v0)]
    fn withdraw(ref self: ContractState) {
        let caller = get_caller_address();
        assert(self.has_role(DEFAULT_ADMIN_ROLE, caller), 'Only admin');
        let eth_dispatcher = IERC20Dispatcher { contract_address: self.eth.read() };
        let balance = eth_dispatcher.balance_of(get_contract_address());
        assert(balance > 0, 'No ETH to withdraw');
        eth_dispatcher.transfer(self.fee_recipient.read(), balance);
    }

    #[external(v0)]
    fn update_token_factory(ref self: ContractState, new_factory: ContractAddress) {
        let caller = get_caller_address();
        assert(self.has_role(DEFAULT_ADMIN_ROLE, caller), 'Only admin');
        assert(new_factory.is_non_zero(), 'Invalid address');
        self.token_factory.write(new_factory);
        self.emit(Event::TokenFactoryUpdated(TokenFactoryUpdated { new_factory }));
    }

    #[view(v0)]
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

    fn _set_token_factory(ref self: ContractState, token_factory: ContractAddress) {
        assert(token_factory.is_non_zero(), 'Invalid token factory');
        self.token_factory.write(token_factory);
    }

    fn _set_fee_recipient(ref self: ContractState, fee_recipient: ContractAddress) {
        assert(fee_recipient.is_non_zero(), 'Invalid fee recipient');
        self.fee_recipient.write(fee_recipient);
    }
}