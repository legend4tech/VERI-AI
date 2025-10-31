use starknet::ContractAddress;


#[derive(Drop, Serde, starknet::Store)]
pub struct Property {
    pub id: u256, // Unique property ID
    pub name: ByteArray, // Property name, min 5 chars, required
    pub description: ByteArray, // Description, min 30 chars, required
    pub property_type: ByteArray, // Property type, required
    pub construction_status: Option<ByteArray>, // Optional construction status
    pub completion_date: Option<ByteArray>, // Optional completion date
    pub address_: ByteArray, // Street address, min 10 chars, required
    pub city: ByteArray, // City, required
    pub state: ByteArray, // State, required
    pub bedrooms: u32, // Number of bedrooms (>0), required
    pub bathrooms: u32, // Number of bathrooms (>0), required
    pub square_footage: u256, // Square footage (>0), required
    pub year_built: u32, // Year built (>1000), required
    pub features: ByteArray, // Features, at least 4, required
    pub land_size: u256, // Land size (>0), required
    pub north_border: ByteArray, // North border, min 6 chars, required
    pub south_border: ByteArray, // South border, min 6 chars, required
    pub east_border: ByteArray, // East border, min 6 chars, required
    pub west_border: ByteArray, // West border, min 6 chars, required
    pub land_title: ByteArray, // Land title, required
    pub survey_plan: ByteArray, // Survey plan, min 15 chars, required
    pub total_value: u256, // Total value, min 6 digits, required
    pub price_per_token: u256, // Price per token, required
    pub expected_roi: Option<ByteArray>, // Optional expected ROI
    pub latitude: ByteArray, // Latitude, min 8 chars, required
    pub longitude: ByteArray, // Longitude, min 8 chars, required
    pub accuracy: Option<ByteArray>, // Optional accuracy
    pub location_method: Option<ByteArray>, // Optional location method
    pub metadata_uri: ByteArray, // Metadata URI, required
    pub images: ByteArray, // Property images, 4-6 images, required
    pub documents: ByteArray, // Property documents, 2-6 documents, required
    pub document_types: ByteArray, // Document types, match documents length, required
    pub token_address: ContractAddress, // Token representing property
    pub realtor: ContractAddress, // Realtor address
    pub vault: ContractAddress, // Vault address
    pub listed_fee: u256, // Listing fee in USD
    pub timestamp: u64, // Timestamp when registered
    pub token_supply: u256, // Total token supply 
    pub status: felt252, // Pending/Active/Deactivated
    pub location: Option<ByteArray> // Optional general location
}

