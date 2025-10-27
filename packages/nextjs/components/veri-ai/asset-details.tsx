interface AssetDetailsProps {
  details: {
    token_id: string
    contract_address: string
    asset_name: string
    asset_type?: string
    location?: string
  }
}

export function AssetDetails({ details }: AssetDetailsProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-foreground">Asset Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-lg border border-border bg-card">
          <p className="text-xs font-medium text-muted-foreground mb-1">Asset Name</p>
          <p className="text-lg font-semibold text-foreground">{details.asset_name}</p>
        </div>

        <div className="p-4 rounded-lg border border-border bg-card">
          <p className="text-xs font-medium text-muted-foreground mb-1">Token ID</p>
          <p className="text-lg font-semibold text-foreground font-mono">{details.token_id}</p>
        </div>

        <div className="p-4 rounded-lg border border-border bg-card md:col-span-2">
          <p className="text-xs font-medium text-muted-foreground mb-1">Contract Address</p>
          <p className="text-sm font-mono text-foreground break-all">{details.contract_address}</p>
        </div>

        {details.asset_type && (
          <div className="p-4 rounded-lg border border-border bg-card">
            <p className="text-xs font-medium text-muted-foreground mb-1">Asset Type</p>
            <p className="text-lg font-semibold text-foreground">{details.asset_type}</p>
          </div>
        )}

        {details.location && (
          <div className="p-4 rounded-lg border border-border bg-card">
            <p className="text-xs font-medium text-muted-foreground mb-1">Location</p>
            <p className="text-lg font-semibold text-foreground">{details.location}</p>
          </div>
        )}
      </div>
    </div>
  )
}
