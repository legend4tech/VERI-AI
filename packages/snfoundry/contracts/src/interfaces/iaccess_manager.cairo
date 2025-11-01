use crate::structs::access_manager_structs::RoleExpiry;
use starknet::ContractAddress;


#[starknet::interface]
pub trait IAccessManager<TContractState> {
    // Role checking
    fn has_any_role(self: @TContractState, account: ContractAddress, roles: Span<felt252>) -> bool;
    fn has_role_and_kyc(self: @TContractState, user: ContractAddress, role: felt252) -> bool;
    fn role_valid(self: @TContractState, user: ContractAddress, role: felt252) -> bool;

    // KYC management
    fn set_kyc(ref self: TContractState, user: ContractAddress, status: bool);
    fn is_kyc_verified(self: @TContractState, user: ContractAddress) -> bool;

    // Blacklist management
    fn blacklist(ref self: TContractState, user: ContractAddress, status: bool);
    fn is_user_blacklisted(self: @TContractState, user: ContractAddress) -> bool;

    // IP whitelist
    fn whitelist_ip(ref self: TContractState, ip_hash: felt252, status: bool);
    fn is_ip_whitelisted(self: @TContractState, ip_hash: felt252) -> bool;

    // Time-limited roles
    fn set_time_limited_role(
        ref self: TContractState, user: ContractAddress, role: felt252, duration: u64,
    );
    fn get_role_expiry(
        self: @TContractState, user: ContractAddress, role: felt252,
    ) -> RoleExpiry;

    // Property permissions
    fn grant_property_permission(
        ref self: TContractState, property_id: u256, user: ContractAddress,
    );
    fn revoke_property_permission(
        ref self: TContractState, property_id: u256, user: ContractAddress,
    );
    fn has_access_to_property(
        self: @TContractState, property_id: u256, user: ContractAddress,
    ) -> bool;

    // Pause/unpause
    fn pause(ref self: TContractState);
    fn unpause(ref self: TContractState);

    // Role management
    fn grant_admin_role(ref self: TContractState, account: ContractAddress);
    fn grant_realtor_role(ref self: TContractState, account: ContractAddress);
    fn grant_investor_role(ref self: TContractState, account: ContractAddress);
    fn grant_tenant_role(ref self: TContractState, account: ContractAddress);
    fn grant_auditor_role(ref self: TContractState, account: ContractAddress);
    fn revoke_admin_role(ref self: TContractState, account: ContractAddress);
    fn revoke_realtor_role(ref self: TContractState, account: ContractAddress);
    fn revoke_investor_role(ref self: TContractState, account: ContractAddress);
    fn revoke_tenant_role(ref self: TContractState, account: ContractAddress);
    fn revoke_auditor_role(ref self: TContractState, account: ContractAddress);
}
