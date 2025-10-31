use starknet::ContractAddress;
use crate::structs::registery_struct::Property;

#[starknet::interface]
pub trait IRegistry<TContractState> {
    fn register_property(
        ref self: TContractState,
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
    );
    fn update_property_details(
        ref self: TContractState,
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
    );
    fn activate_property(ref self: TContractState, property_id: u256);
    fn get_property(self: @TContractState, property_id: u256) -> Property;
    fn get_all_properties(self: @TContractState) -> Array<Property>;
    fn update_property_status(ref self: TContractState, property_id: u256, is_active: bool);
    fn grant_realtor_role(ref self: TContractState, realtor: ContractAddress);
    fn revoke_realtor_role(ref self: TContractState, realtor: ContractAddress);
    fn get_properties_by_realtor(self: @TContractState, realtor: ContractAddress) -> Array<u256>;
    fn update_fee_recipient(ref self: TContractState, new_recipient: ContractAddress);
    fn withdraw(ref self: TContractState);
    fn update_token_factory(ref self: TContractState, new_factory: ContractAddress);
}
