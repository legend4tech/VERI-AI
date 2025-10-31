#[starknet::contract]
mod AccessManager {
    use openzeppelin::access::accesscontrol::AccessControlComponent;
    use openzeppelin::introspection::src5::SRC5Component;
    use openzeppelin::security::pausable::PausableComponent;
    use openzeppelin::security::reentrancyguard::ReentrancyGuardComponent;
    use starknet::storage::{
        Map, StoragePathEntry, StoragePointerReadAccess, StoragePointerWriteAccess,
    };
    use starknet::{ContractAddress, get_block_timestamp, get_caller_address};
    use crate::constants::role::Roles::{
        ADMIN_ROLE, AUDITOR_ROLE, DEFAULT_ADMIN_ROLE, INVESTOR_ROLE, REALTOR_ROLE, TENANT_ROLE,
        TOKEN_ADMIN_ROLE,
    };
    use crate::interfaces::iaccess_manager::IAccessManager;
    use crate::structs::access_manager_structs::{
        IPWhitelisted, KYCStatusUpdated, PropertyPermissionGranted, PropertyPermissionRevoked,
        RoleExpiry, TimeLimitedRoleGranted, UserBlacklisted,
    };
    component!(path: AccessControlComponent, storage: accesscontrol, event: AccessControlEvent);
    component!(path: PausableComponent, storage: pausable, event: PausableEvent);
    component!(
        path: ReentrancyGuardComponent, storage: reentrancyguard, event: ReentrancyGuardEvent,
    );
    component!(path: SRC5Component, storage: src5, event: SRC5Event);

    // Embed component implementations
    #[abi(embed_v0)]
    impl AccessControlImpl =
        AccessControlComponent::AccessControlImpl<ContractState>;
    impl AccessControlInternalImpl = AccessControlComponent::InternalImpl<ContractState>;

    #[abi(embed_v0)]
    impl PausableImpl = PausableComponent::PausableImpl<ContractState>;
    impl PausableInternalImpl = PausableComponent::InternalImpl<ContractState>;

    impl ReentrancyGuardInternalImpl = ReentrancyGuardComponent::InternalImpl<ContractState>;

    #[abi(embed_v0)]
    impl SRC5Impl = SRC5Component::SRC5Impl<ContractState>;


    #[storage]
    struct Storage {
        #[substorage(v0)]
        accesscontrol: AccessControlComponent::Storage,
        #[substorage(v0)]
        pausable: PausableComponent::Storage,
        #[substorage(v0)]
        reentrancyguard: ReentrancyGuardComponent::Storage,
        #[substorage(v0)]
        src5: SRC5Component::Storage,
        is_kyc_verified: Map<ContractAddress, bool>,
        is_blacklisted: Map<ContractAddress, bool>,
        is_whitelisted_ip: Map<felt252, bool>,
        role_expiries: Map<(ContractAddress, felt252), RoleExpiry>,
        property_permissions: Map<(u256, ContractAddress), bool>,
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        #[flat]
        AccessControlEvent: AccessControlComponent::Event,
        #[flat]
        PausableEvent: PausableComponent::Event,
        #[flat]
        ReentrancyGuardEvent: ReentrancyGuardComponent::Event,
        #[flat]
        SRC5Event: SRC5Component::Event,
        KYCStatusUpdated: KYCStatusUpdated,
        UserBlacklisted: UserBlacklisted,
        IPWhitelisted: IPWhitelisted,
        TimeLimitedRoleGranted: TimeLimitedRoleGranted,
        PropertyPermissionGranted: PropertyPermissionGranted,
        PropertyPermissionRevoked: PropertyPermissionRevoked,
    }


    #[constructor]
    fn constructor(ref self: ContractState, super_admin: ContractAddress) {
        // Initialize all components
        self.accesscontrol.initializer();
        // self.pausable.initializer();

        // Grant admin roles
        self.accesscontrol._grant_role(DEFAULT_ADMIN_ROLE, super_admin);
        self.accesscontrol._grant_role(ADMIN_ROLE, super_admin);
        self.accesscontrol._grant_role(TOKEN_ADMIN_ROLE, super_admin);
        // Set role admins
    // self.accesscontrol._set_role_admin(REALTOR_ROLE, ADMIN_ROLE);
    // self.accesscontrol._set_role_admin(INVESTOR_ROLE, ADMIN_ROLE);
    // self.accesscontrol._set_role_admin(TENANT_ROLE, ADMIN_ROLE);
    // self.accesscontrol._set_role_admin(AUDITOR_ROLE, ADMIN_ROLE);
    // self.accesscontrol._set_role_admin(TOKEN_ADMIN_ROLE, DEFAULT_ADMIN_ROLE);
    }

    #[abi(embed_v0)]
    impl AccessManagerImpl of IAccessManager<ContractState> {
        fn has_any_role(
            self: @ContractState, account: ContractAddress, roles: Span<felt252>,
        ) -> bool {
            let mut i: u32 = 0;
            let len = roles.len();
            loop {
                if i >= len {
                    break false;
                }
                if self.accesscontrol.has_role(*roles.at(i), account) {
                    break true;
                }
                i += 1;
            }
        }

        fn set_kyc(ref self: ContractState, user: ContractAddress, status: bool) {
            self.pausable.assert_not_paused();
            self._only_auditor();

            self.is_kyc_verified.entry(user).write(status);

            self.emit(KYCStatusUpdated { user, status, updated_by: get_caller_address() });
        }

        fn blacklist(ref self: ContractState, user: ContractAddress, status: bool) {
            self.pausable.assert_not_paused();
            self._only_admin();

            self.is_blacklisted.entry(user).write(status);

            self.emit(UserBlacklisted { user, status, updated_by: get_caller_address() });
        }

        fn whitelist_ip(ref self: ContractState, ip_hash: felt252, status: bool) {
            self.pausable.assert_not_paused();
            self._only_admin();

            self.is_whitelisted_ip.entry(ip_hash).write(status);

            self.emit(IPWhitelisted { ip_hash, status, updated_by: get_caller_address() });
        }

        fn set_time_limited_role(
            ref self: ContractState, user: ContractAddress, role: felt252, duration: u64,
        ) {
            self.pausable.assert_not_paused();
            self._only_admin();

            let expiry_timestamp = get_block_timestamp() + duration;
            let expiry = RoleExpiry { expiry_timestamp, enabled: true };

            self.role_expiries.entry((user, role)).write(expiry);
            self.accesscontrol._grant_role(role, user);

            self
                .emit(
                    TimeLimitedRoleGranted {
                        user, role, expiry_timestamp, granted_by: get_caller_address(),
                    },
                );
        }

        fn grant_property_permission(
            ref self: ContractState, property_id: u256, user: ContractAddress,
        ) {
            self.pausable.assert_not_paused();
            self._only_realtor();

            self.property_permissions.entry((property_id, user)).write(true);

            self
                .emit(
                    PropertyPermissionGranted {
                        property_id, user, granted_by: get_caller_address(),
                    },
                );
        }

        fn revoke_property_permission(
            ref self: ContractState, property_id: u256, user: ContractAddress,
        ) {
            self.pausable.assert_not_paused();
            self._only_realtor();

            self.property_permissions.entry((property_id, user)).write(false);

            self
                .emit(
                    PropertyPermissionRevoked {
                        property_id, user, revoked_by: get_caller_address(),
                    },
                );
        }

        fn pause(ref self: ContractState) {
            self._only_admin();
            self.pausable.pause();
        }

        fn unpause(ref self: ContractState) {
            self._only_admin();
            self.pausable.unpause();
        }

        fn has_access_to_property(
            self: @ContractState, property_id: u256, user: ContractAddress,
        ) -> bool {
            self.property_permissions.entry((property_id, user)).read()
        }

        fn role_valid(self: @ContractState, user: ContractAddress, role: felt252) -> bool {
            let data = self.role_expiries.entry((user, role)).read();
            if !data.enabled {
                return true;
            }
            get_block_timestamp() <= data.expiry_timestamp
        }

        fn has_role_and_kyc(self: @ContractState, user: ContractAddress, role: felt252) -> bool {
            self.accesscontrol.has_role(role, user)
                && self.is_kyc_verified.entry(user).read()
                && !self.is_blacklisted.entry(user).read()
                && self.role_valid(user, role)
        }

        fn is_kyc_verified(self: @ContractState, user: ContractAddress) -> bool {
            self.is_kyc_verified.entry(user).read()
        }

        fn is_user_blacklisted(self: @ContractState, user: ContractAddress) -> bool {
            self.is_blacklisted.entry(user).read()
        }

        fn is_ip_whitelisted(self: @ContractState, ip_hash: felt252) -> bool {
            self.is_whitelisted_ip.entry(ip_hash).read()
        }

        fn get_role_expiry(
            self: @ContractState, user: ContractAddress, role: felt252,
        ) -> RoleExpiry {
            self.role_expiries.entry((user, role)).read()
        }

        fn grant_admin_role(ref self: ContractState, account: ContractAddress) {
            self._only_admin();
            self.accesscontrol.grant_role(ADMIN_ROLE, account);
        }

        fn grant_realtor_role(ref self: ContractState, account: ContractAddress) {
            self._only_admin();
            self.accesscontrol.grant_role(REALTOR_ROLE, account);
        }

        fn grant_investor_role(ref self: ContractState, account: ContractAddress) {
            self._only_admin();
            self.accesscontrol.grant_role(INVESTOR_ROLE, account);
        }

        fn grant_tenant_role(ref self: ContractState, account: ContractAddress) {
            self._only_admin();
            self.accesscontrol.grant_role(TENANT_ROLE, account);
        }

        fn grant_auditor_role(ref self: ContractState, account: ContractAddress) {
            self._only_admin();
            self.accesscontrol.grant_role(AUDITOR_ROLE, account);
        }

        fn revoke_admin_role(ref self: ContractState, account: ContractAddress) {
            self._only_admin();
            self.accesscontrol.revoke_role(ADMIN_ROLE, account);
        }

        fn revoke_realtor_role(ref self: ContractState, account: ContractAddress) {
            self._only_admin();
            self.accesscontrol.revoke_role(REALTOR_ROLE, account);
        }

        fn revoke_investor_role(ref self: ContractState, account: ContractAddress) {
            self._only_admin();
            self.accesscontrol.revoke_role(INVESTOR_ROLE, account);
        }

        fn revoke_tenant_role(ref self: ContractState, account: ContractAddress) {
            self._only_admin();
            self.accesscontrol.revoke_role(TENANT_ROLE, account);
        }

        fn revoke_auditor_role(ref self: ContractState, account: ContractAddress) {
            self._only_admin();
            self.accesscontrol.revoke_role(AUDITOR_ROLE, account);
        }
    }

    #[generate_trait]
    impl InternalImpl of InternalTrait {
        fn _only_admin(self: @ContractState) {
            assert(self.accesscontrol.has_role(ADMIN_ROLE, get_caller_address()), 'Only admin');
        }

        fn _only_realtor(self: @ContractState) {
            assert(self.accesscontrol.has_role(REALTOR_ROLE, get_caller_address()), 'Only realtor');
        }

        fn _only_auditor(self: @ContractState) {
            assert(self.accesscontrol.has_role(AUDITOR_ROLE, get_caller_address()), 'Only auditor');
        }

        fn _only_admin_or_auditor(self: @ContractState) {
            let caller = get_caller_address();
            assert(
                self.accesscontrol.has_role(ADMIN_ROLE, caller)
                    || self.accesscontrol.has_role(AUDITOR_ROLE, caller),
                'Not admin or auditor',
            );
        }

        fn _not_blacklisted(self: @ContractState) {
            let caller = get_caller_address();
            assert(!self.is_blacklisted.entry(caller).read(), 'Blacklisted');
        }

        fn _only_whitelisted_ip(self: @ContractState, ip_hash: felt252) {
            assert(self.is_whitelisted_ip.entry(ip_hash).read(), 'IP not allowed');
        }

        fn _only_kyc_verified(self: @ContractState) {
            let caller = get_caller_address();
            assert(self.is_kyc_verified.entry(caller).read(), 'Not KYC verified');
        }

        fn _check_role_time(self: @ContractState, role: felt252) {
            let caller = get_caller_address();
            let data = self.role_expiries.entry((caller, role)).read();
            if data.enabled {
                assert(get_block_timestamp() <= data.expiry_timestamp, 'Role expired');
            }
        }
    }
}
