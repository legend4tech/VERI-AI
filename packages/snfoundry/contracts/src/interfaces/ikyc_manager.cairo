/// @title IKYCManager Interface
/// @notice Interface for managing KYC (Know Your Customer) verification statuses and levels
/// @dev Handles user verification, verification levels, and related queries
/// 
use starknet::ContractAddress;

#[starknet::interface]
pub trait IKYCManager<TContractState> {

    /// @notice Verifies a user at a specific KYC level
    /// @param user The address of the user to verify
    /// @param level The KYC level to assign
    fn verify_user(ref self: TContractState, user: ContractAddress, level: u8);

    /// @notice Revokes KYC verification for a user
    fn revoke_verification(ref self: TContractState, user: ContractAddress);

    /// @notice Updates the verification level for an already verified user
    fn update_verification_level(ref self: TContractState, user: ContractAddress, new_level: u8);

    /// @notice Verifies multiple users at once with the same level
    fn batch_verify_users(ref self: TContractState, users: Span<ContractAddress>, level: u8);

    /// @notice Checks if a user has any level of KYC verification
    fn is_verified(self: @TContractState, user: ContractAddress) -> bool;

    /// @notice Gets the timestamp of when the user was verified
    fn get_verification_time(self: @TContractState, user: ContractAddress) -> u64;

    /// @notice Gets the current verification level of a user
    fn get_verification_level(self: @TContractState, user: ContractAddress) -> u8;

    /// @notice Gets the total number of verified users
    fn get_total_verified_users(self: @TContractState) -> u256;

    /// @notice Checks if a user is verified at or above a specific level
    fn is_verified_at_level(
        self: @TContractState, user: ContractAddress, required_level: u8,
    ) -> bool;

    /// @notice Pauses all KYC operations
    fn pause(ref self: TContractState);

    /// @notice Resumes KYC operations
    fn unpause(ref self: TContractState);
}
