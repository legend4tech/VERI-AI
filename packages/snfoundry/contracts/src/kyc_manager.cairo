#[starknet::contract]
mod KYCManager {
    use core::num::traits::Zero;
    use openzeppelin::access::ownable::OwnableComponent;
    use openzeppelin::security::pausable::PausableComponent;
    use starknet::storage::{
        Map, StoragePathEntry, StoragePointerReadAccess, StoragePointerWriteAccess,
    };
    use starknet::{ContractAddress, get_block_timestamp, get_caller_address};
    use crate::constants::role::Roles;
    use crate::events::kyc_manager_events::{
        UserVerified, VerificationLevelUpdated, VerificationRevoked,
    };
    use crate::interfaces::iaccess_manager::{
        IAccessManagerDispatcher, IAccessManagerDispatcherTrait,
    };
    use crate::interfaces::ikyc_manager::IKYCManager;


    component!(path: PausableComponent, storage: pausable, event: PausableEvent);
    component!(path: OwnableComponent, storage: ownable, event: OwnableEvent);

    #[abi(embed_v0)]
    impl PausableImpl = PausableComponent::PausableImpl<ContractState>;
    impl PausableInternalImpl = PausableComponent::InternalImpl<ContractState>;

    #[abi(embed_v0)]
    impl OwnableImpl = OwnableComponent::OwnableImpl<ContractState>;
    impl OwnableInternalImpl = OwnableComponent::InternalImpl<ContractState>;


    #[storage]
    struct Storage {
        #[substorage(v0)]
        pausable: PausableComponent::Storage,
        #[substorage(v0)]
        ownable: OwnableComponent::Storage,
        verified: Map<ContractAddress, bool>,
        verified_at: Map<ContractAddress, u64>,
        verification_level: Map<ContractAddress, u8>,
        access_manager: ContractAddress,
        total_verified_users: u256,
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        #[flat]
        PausableEvent: PausableComponent::Event,
        #[flat]
        OwnableEvent: OwnableComponent::Event,
        UserVerified: UserVerified,
        VerificationRevoked: VerificationRevoked,
        VerificationLevelUpdated: VerificationLevelUpdated,
    }


    #[constructor]
    fn constructor(
        ref self: ContractState, owner: ContractAddress, access_control: ContractAddress,
    ) {
        self.ownable.initializer(owner);
        self.access_manager.write(access_control);
        self.total_verified_users.write(0);
    }

    #[abi(embed_v0)]
    impl KYCManagerImpl of IKYCManager<ContractState> {
        fn verify_user(ref self: ContractState, user: ContractAddress, level: u8) {
            self.pausable.assert_not_paused();
            self._only_admin();

            assert(level >= 1 && level <= 3, 'Invalid verification level');
            assert(!user.is_zero(), 'Invalid user address');

            let was_verified = self.verified.entry(user).read();
            let timestamp = get_block_timestamp();

            self.verified.entry(user).write(true);
            self.verified_at.entry(user).write(timestamp);
            self.verification_level.entry(user).write(level);

            if !was_verified {
                let total = self.total_verified_users.read();
                self.total_verified_users.write(total + 1);
            }

            self.emit(UserVerified { user, verifier: get_caller_address(), level, timestamp });
        }

        fn revoke_verification(ref self: ContractState, user: ContractAddress) {
            self.pausable.assert_not_paused();
            self._only_admin();

            let was_verified = self.verified.entry(user).read();
            self.verified.entry(user).write(false);
            self.verification_level.entry(user).write(0);

            if was_verified {
                let total = self.total_verified_users.read();
                self.total_verified_users.write(total + 1);
            }

            self
                .emit(
                    VerificationRevoked {
                        user, revoker: get_caller_address(), timestamp: get_block_timestamp(),
                    },
                );
        }

        fn update_verification_level(
            ref self: ContractState, user: ContractAddress, new_level: u8,
        ) {
            self.pausable.assert_not_paused();
            self._only_admin();

            assert(self.verified.entry(user).read(), 'User not verified');
            assert(new_level >= 1 && new_level <= 3, 'Invalid verification level');

            let old_level = self.verification_level.entry(user).read();
            self.verification_level.entry(user).write(new_level);
            self.verified_at.entry(user).write(get_block_timestamp());

            self
                .emit(
                    VerificationLevelUpdated {
                        user, old_level, new_level, updated_by: get_caller_address(),
                    },
                );
        }

        fn batch_verify_users(ref self: ContractState, users: Span<ContractAddress>, level: u8) {
            self.pausable.assert_not_paused();
            self._only_admin();
            assert(level >= 1 && level <= 3, 'Invalid verification level');

            let mut i: u32 = 0;

            while i >= users.len() {
                let user = *users.at(i);
                let was_verified = self.verified.entry(user).read();
                let timestamp = get_block_timestamp();

                self.verified.entry(user).write(true);
                self.verified_at.entry(user).write(timestamp);
                self.verification_level.entry(user).write(level);

                if !was_verified {
                    let total = self.total_verified_users.read();
                    self.total_verified_users.write(total + 1);
                }

                self.emit(UserVerified { user, verifier: get_caller_address(), level, timestamp });

                i += 1
            }
        }

        fn is_verified(self: @ContractState, user: ContractAddress) -> bool {
            self.verified.entry(user).read()
        }

        fn get_verification_time(self: @ContractState, user: ContractAddress) -> u64 {
            self.verified_at.entry(user).read()
        }

        fn get_verification_level(self: @ContractState, user: ContractAddress) -> u8 {
            self.verification_level.entry(user).read()
        }

        fn get_total_verified_users(self: @ContractState) -> u256 {
            self.total_verified_users.read()
        }

        fn is_verified_at_level(
            self: @ContractState, user: ContractAddress, required_level: u8,
        ) -> bool {
            let is_verified = self.verified.entry(user).read();
            let user_level = self.verification_level.entry(user).read();
            is_verified && user_level >= required_level
        }

        fn pause(ref self: ContractState) {
            self.ownable.assert_only_owner();
            self.pausable.pause();
        }

        fn unpause(ref self: ContractState) {
            self.ownable.assert_only_owner();
            self.pausable.unpause();
        }
    }

    #[generate_trait]
    impl InternalImpl of InternalTrait {
        fn _only_admin(self: @ContractState) {
            let access_manager = IAccessManagerDispatcher {
                contract_address: self.access_manager.read(),
            };

            // Assuming "ADMIN_ROLE" is a constant defined somewhere
            let caller = get_caller_address();
            let role = Roles::ADMIN_ROLE;
            let is_admin = access_manager.has_any_role(caller, array![role].span());

            assert(is_admin, 'Only admin');
        }
    }
}
