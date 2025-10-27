export type AnalysisData = {
  risk_score: number
  summary: string
  evidence_summary: Array<{
    item: string
    status: string
  }>
  onchain_identity: {
    token_id: string
    contract_address: string
    asset_name: string
    asset_type: string
    location: string
  }
}

export const mockAnalysisData: AnalysisData = {
  risk_score: 72,
  summary:
    "High risk detected. Title dispute identified in property records. Recommend legal review before proceeding with tokenization.",
  evidence_summary: [
    {
      item: "Title Dispute Found",
      status: "warning",
    },
    {
      item: "Verified Ownership",
      status: "success",
    },
    {
      item: "No Active Liens",
      status: "success",
    },
    {
      item: "Property Tax Current",
      status: "success",
    },
    {
      item: "Boundary Dispute Detected",
      status: "warning",
    },
    {
      item: "Insurance Coverage Valid",
      status: "success",
    },
  ],
  onchain_identity: {
    token_id: "1",
    contract_address: "0x1234567890abcdef1234567890abcdef12345678",
    asset_name: "Commercial Property - Downtown District",
    asset_type: "Real Estate",
    location: "New York, NY",
  },
}

export const mockDataVariants: AnalysisData[] = [
  {
    risk_score: 35,
    summary: "Low risk asset. All verifications passed successfully. Ready for tokenization.",
    evidence_summary: [
      { item: "Clear Title", status: "success" },
      { item: "Verified Ownership", status: "success" },
      { item: "No Liens", status: "success" },
      { item: "Property Tax Current", status: "success" },
      { item: "Insurance Coverage Valid", status: "success" },
      { item: "No Boundary Disputes", status: "success" },
    ],
    onchain_identity: {
      token_id: "2",
      contract_address: "0x1234567890abcdef1234567890abcdef12345678",
      asset_name: "Residential Property - Suburban Area",
      asset_type: "Real Estate",
      location: "Austin, TX",
    },
  },
  {
    risk_score: 85,
    summary: "Critical risk detected. Multiple issues require immediate attention before tokenization.",
    evidence_summary: [
      { item: "Title Dispute Found", status: "error" },
      { item: "Ownership Verification Failed", status: "error" },
      { item: "Active Liens Present", status: "error" },
      { item: "Property Tax Delinquent", status: "error" },
      { item: "Insurance Lapsed", status: "warning" },
      { item: "Boundary Dispute Detected", status: "error" },
    ],
    onchain_identity: {
      token_id: "3",
      contract_address: "0x1234567890abcdef1234567890abcdef12345678",
      asset_name: "Industrial Property - Port Area",
      asset_type: "Real Estate",
      location: "Los Angeles, CA",
    },
  },
]
