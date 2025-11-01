#[derive(Drop, starknet::Event)]
pub struct PropertyDetailsUpdated {
    #[key]
    pub property_id: u256,
    pub updated_by: ContractAddress,
}

#[derive(Drop, starknet::Event)]
pub struct PropertyActivated {
    #[key]
    pub property_id: u256,
    pub activated_by: ContractAddress,
}

#[derive(Drop, starknet::Event)]
pub struct PropertyRegistered {
    #[key]
    pub property_id: u256,
    #[key]
    pub realtor: ContractAddress,
    pub name: ByteArray,
    pub description: ByteArray,
    pub listed_fee: u256,
    pub metadata_uri: ByteArray,
    pub timestamp: u64,
}

#[derive(Drop, starknet::Event)]
pub struct TokenLinked {
    #[key]
    pub property_id: u256,
    pub token: ContractAddress,
}

#[derive(Drop, starknet::Event)]
pub struct PropertyStatusUpdated {
    #[key]
    pub property_id: u256,
    pub is_active: bool,
}

#[derive(Drop, starknet::Event)]
pub struct PropertyDeactivated {
    #[key]
    pub property_id: u256,
}

#[derive(Drop, starknet::Event)]
pub struct TokenFactoryUpdated {
    pub new_factory: ContractAddress,
}

#[derive(Drop, starknet::Event)]
pub struct FeeTransferred {
    #[key]
    pub recipient: ContractAddress,
    pub amount: u256,
}

#[derive(Drop, starknet::Event)]
pub struct FeeRecipientUpdated {
    pub new_recipient: ContractAddress,
}

#[derive(Drop, starknet::Event)]
pub struct RealtorPropertyCount {
    #[key]
    pub realtor: ContractAddress,
    pub count: u256,
}
