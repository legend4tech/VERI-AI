use starknet::ContractAddress;

#[derive(Drop, starknet::Event)]
pub struct UserVerified {
    #[key]
    pub user: ContractAddress,
    pub verifier: ContractAddress,
    pub level: u8,
    pub timestamp: u64,
}

#[derive(Drop, starknet::Event)]
pub struct VerificationRevoked {
    #[key]
    pub user: ContractAddress,
    pub revoker: ContractAddress,
    pub timestamp: u64,
}

#[derive(Drop, starknet::Event)]
pub struct VerificationLevelUpdated {
    #[key]
    pub user: ContractAddress,
    pub old_level: u8,
    pub new_level: u8,
    pub updated_by: ContractAddress,
}
