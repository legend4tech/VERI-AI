use starknet::ContractAddress;


#[derive(Copy, Drop, Serde, starknet::Store)]
pub struct RoleExpiry {
    pub expiry_timestamp: u64,
    pub enabled: bool,
}

#[derive(Drop, starknet::Event)]
pub struct KYCStatusUpdated {
    #[key]
    pub user: ContractAddress,
    pub status: bool,
    pub updated_by: ContractAddress,
}

#[derive(Drop, starknet::Event)]
pub struct UserBlacklisted {
    #[key]
    pub user: ContractAddress,
    pub status: bool,
    pub updated_by: ContractAddress,
}

#[derive(Drop, starknet::Event)]
pub struct IPWhitelisted {
    #[key]
    pub ip_hash: felt252,
    pub status: bool,
    pub updated_by: ContractAddress,
}

#[derive(Drop, starknet::Event)]
pub struct TimeLimitedRoleGranted {
    #[key]
    pub user: ContractAddress,
    pub role: felt252,
    pub expiry_timestamp: u64,
    pub granted_by: ContractAddress,
}

#[derive(Drop, starknet::Event)]
pub struct PropertyPermissionGranted {
    #[key]
    pub property_id: u256,
    #[key]
    pub user: ContractAddress,
    pub granted_by: ContractAddress,
}

#[derive(Drop, starknet::Event)]
pub struct PropertyPermissionRevoked {
    #[key]
    pub property_id: u256,
    #[key]
    pub user: ContractAddress,
    pub revoked_by: ContractAddress,
}
