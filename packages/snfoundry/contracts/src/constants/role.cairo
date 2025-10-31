pub mod Roles {
    pub const ADMIN_ROLE: felt252 = selector!("ADMIN_ROLE");
    pub const REALTOR_ROLE: felt252 = selector!("REALTOR_ROLE");
    pub const INVESTOR_ROLE: felt252 = selector!("INVESTOR_ROLE");
    pub const TENANT_ROLE: felt252 = selector!("TENANT_ROLE");
    pub const AUDITOR_ROLE: felt252 = selector!("AUDITOR_ROLE");
    pub const TOKEN_ADMIN_ROLE: felt252 = selector!("TOKEN_ADMIN_ROLE");
    pub const DEFAULT_ADMIN_ROLE: felt252 = 0;

    const STATUS_DEACTIVATED: felt252 = 2;
    // Status constants (using felt252 for storage efficiency)
    const STATUS_PENDING: felt252 = 0; // Property is pending (not all optional fields filled)
    const STATUS_ACTIVE: felt252 = 1; // Property is active (complete and approved)
    // Property is deactivated (admin action)

}
