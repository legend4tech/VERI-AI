#[starknet::contract]
mod PropertyToken {
    use openzeppelin::token::erc20::{ERC20Component, ERC20HooksEmptyImpl};
    use starknet::{ContractAddress, get_caller_address};
    use core::starknet::storage::StoragePointerReadAccess;

    component!(path: ERC20Component, storage: erc20, event: ERC20Event);

    #[abi(embed_v0)]
    impl ERC20Impl = ERC20Component::ERC20Impl<ContractState>;
    #[abi(embed_v0)]
    impl ERC20MetadataImpl = ERC20Component::ERC20MetadataImpl<ContractState>;
    
    impl ERC20InternalImpl = ERC20Component::InternalImpl<ContractState>;

    #[storage]
    struct Storage {
        #[substorage(v0)]
        erc20: ERC20Component::Storage,
        asset_id: u256,
        asset_registry: ContractAddress,
        minter: ContractAddress,
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        #[flat]
        ERC20Event: ERC20Component::Event,
    }

    #[constructor]
    fn constructor(
        ref self: ContractState,
        asset_id: u256,
        name: ByteArray,
        symbol: ByteArray,
        total_supply: u256,
        recipient: ContractAddress,
        asset_registry: ContractAddress,
    ) {
        self.erc20.initializer(name, symbol);
        self.asset_id.write(asset_id);
        self.asset_registry.write(asset_registry);
        self.minter.write(recipient);
        self.erc20.mint(recipient, total_supply);
    }

    #[abi(embed_v0)]
    impl PropertyTokenImpl of super::IPropertyToken<ContractState> {
        fn get_asset_id(self: @ContractState) -> u256 {
            self.asset_id.read()
        }

        fn get_asset_registry(self: @ContractState) -> ContractAddress {
            self.asset_registry.read()
        }

        fn mint(ref self: ContractState, recipient: ContractAddress, amount: u256) {
            assert(get_caller_address() == self.minter.read(), 'Only minter');
            self.erc20.mint(recipient, amount);
        }

        fn burn(ref self: ContractState, amount: u256) {
            self.erc20.burn(get_caller_address(), amount);
        }
    }
}



#[starknet::interface]
pub trait IPropertyToken<TContractState> {
    fn get_asset_id(self: @TContractState) -> u256;
    fn get_asset_registry(self: @TContractState) -> ContractAddress;
    fn mint(ref self: TContractState, recipient: ContractAddress, amount: u256);
    fn burn(ref self: TContractState, amount: u256);
}

