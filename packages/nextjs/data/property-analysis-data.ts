import type { Property } from "./properties-data"

export interface AnalysisResult {
  status: string
  riskScore: number
  riskCategory: string
  summary: string
  evidenceSummary: Array<{
    source: string
    result: "Success" | "Failure" | "Warning"
    detail: string
  }>
  potentialRiskType: string
  aiSummary: string
}

export const loadingMessages = [
  "Initializing reAI analysis engine...",
  "Connecting to blockchain registry...",
  "Verifying property ownership records...",
  "Analyzing land registry documents...",
  "Cross-referencing legal databases...",
  "Checking for title disputes...",
  "Evaluating market conditions...",
  "Assessing investment risk factors...",
  "Generating comprehensive report...",
  "Finalizing analysis results...",
]

export function generateAnalysisData(property: Property): AnalysisResult {
  const riskProfiles = [
    {
      score: 92,
      category: "Low Risk",
      summary: `This property has been thoroughly verified and shows excellent investment potential. The ${property.name} has clear title documentation, no outstanding legal disputes, and strong market fundamentals. All ownership records are properly registered with the land registry, and the property has a clean history of transactions.`,
      evidenceSummary: [
        {
          source: "Starknet Land Registry",
          result: "Success" as const,
          detail: `Certificate of Occupancy verified and active. Property title is clear with no encumbrances or disputes recorded.`,
        },
        {
          source: "Legal Database Search",
          result: "Success" as const,
          detail:
            "No pending litigation or legal claims found against this property. All historical transactions are properly documented.",
        },
        {
          source: "Market Analysis",
          result: "Success" as const,
          detail: `Property located in high-demand area with ${property.apy} projected annual returns. Market trends indicate strong appreciation potential.`,
        },
        {
          source: "Ownership Verification",
          result: "Success" as const,
          detail:
            "Current owner has valid documentation. Chain of title is complete and verified through blockchain records.",
        },
      ],
      potentialRiskType: "Minimal Risk",
      aiSummary: `reAI has completed a comprehensive analysis of ${property.name}. This property demonstrates excellent investment characteristics with verified ownership, clear legal standing, and strong market fundamentals. The property is located in ${property.location}, a prime area with consistent demand. All documentation has been verified through multiple sources including blockchain registry and legal databases. Investment risk is assessed as minimal with high confidence in projected returns.`,
    },
    {
      score: 78,
      category: "Medium Risk",
      summary: `This property shows moderate investment potential with some areas requiring attention. While the ${property.name} has valid ownership documentation, there are minor concerns regarding pending administrative approvals and market volatility in the area.`,
      evidenceSummary: [
        {
          source: "Starknet Land Registry",
          result: "Success" as const,
          detail:
            "Certificate of Occupancy is valid. Property title is registered but shows pending administrative updates.",
        },
        {
          source: "Legal Database Search",
          result: "Warning" as const,
          detail:
            "Minor zoning variance application pending. No major legal disputes, but administrative process ongoing.",
        },
        {
          source: "Market Analysis",
          result: "Success" as const,
          detail: `Property in developing area with ${property.apy} projected returns. Market shows moderate volatility but positive long-term trends.`,
        },
        {
          source: "Ownership Verification",
          result: "Success" as const,
          detail:
            "Ownership is verified and documented. Some historical transaction records require additional verification.",
        },
      ],
      potentialRiskType: "Administrative Delays",
      aiSummary: `reAI analysis indicates ${property.name} is a viable investment with moderate risk factors. The property has valid ownership and legal standing, though some administrative processes are pending completion. Located in ${property.location}, the area shows development potential with some market volatility. Investors should be aware of potential delays in administrative approvals, but overall fundamentals remain sound. Recommended for investors with medium risk tolerance.`,
    },
    {
      score: 65,
      category: "Higher Risk",
      summary: `This property requires careful consideration due to identified risk factors. The ${property.name} has some documentation concerns and market uncertainties that potential investors should thoroughly evaluate before proceeding.`,
      evidenceSummary: [
        {
          source: "Starknet Land Registry",
          result: "Warning" as const,
          detail:
            "Property title is registered but shows historical ownership disputes that were resolved. Additional verification recommended.",
        },
        {
          source: "Legal Database Search",
          result: "Warning" as const,
          detail:
            "Previous legal dispute was resolved in favor of current owner. No active litigation, but historical concerns noted.",
        },
        {
          source: "Market Analysis",
          result: "Success" as const,
          detail: `Area shows ${property.apy} potential returns but with higher volatility. Market conditions require close monitoring.`,
        },
        {
          source: "Ownership Verification",
          result: "Success" as const,
          detail:
            "Current ownership is valid. Previous ownership chain had complications that have been legally resolved.",
        },
      ],
      potentialRiskType: "Historical Disputes",
      aiSummary: `reAI has identified elevated risk factors for ${property.name}. While current ownership is legally valid and documented, the property has a history of resolved disputes that warrant careful consideration. Located in ${property.location}, the market shows potential but with notable volatility. All current legal issues have been resolved, but investors should conduct additional due diligence. This property may be suitable for experienced investors comfortable with higher risk profiles and longer investment horizons.`,
    },
  ]

  // Assign risk profile based on property ID for consistency
  const profileIndex = property.id % riskProfiles.length
  const profile = riskProfiles[profileIndex]

  return {
    status: "Success",
    riskScore: profile.score,
    riskCategory: profile.category,
    summary: profile.summary,
    evidenceSummary: profile.evidenceSummary,
    potentialRiskType: profile.potentialRiskType,
    aiSummary: profile.aiSummary,
  }
}
