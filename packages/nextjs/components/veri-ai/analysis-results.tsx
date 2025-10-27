"use client"

import { Button } from "../ui/button"
import { RiskScoreCard } from "./risk-score-card"
import { VerificationChecklist } from "./verification-checklist"
import { AssetDetails } from "./asset-details"


interface AnalysisResultsProps {
  data: any
  onNewAnalysis: () => void
}

export function AnalysisResults({ data, onNewAnalysis }: AnalysisResultsProps) {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Analysis Results</h1>
        <Button variant="outline" onClick={onNewAnalysis}>
          New Analysis
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <RiskScoreCard riskScore={data.risk_score} summary={data.summary} />
        </div>

        <div className="lg:col-span-2 space-y-8">
          <VerificationChecklist items={data.evidence_summary} />
          <AssetDetails details={data.onchain_identity} />
        </div>
      </div>
    </div>
  )
}
