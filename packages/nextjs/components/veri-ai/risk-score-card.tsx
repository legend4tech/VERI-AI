interface RiskScoreCardProps {
  riskScore: number
  summary: string
}

export function RiskScoreCard({ riskScore, summary }: RiskScoreCardProps) {
  const getRiskLevel = (score: number) => {
    if (score >= 70) return { level: "High Risk", color: "text-red-600", bgColor: "bg-red-50 border-red-200" }
    if (score >= 40)
      return { level: "Medium Risk", color: "text-yellow-600", bgColor: "bg-yellow-50 border-yellow-200" }
    return { level: "Low Risk", color: "text-green-600", bgColor: "bg-green-50 border-green-200" }
  }

  const riskInfo = getRiskLevel(riskScore)

  return (
    <div className={`p-8 rounded-lg border-2 ${riskInfo.bgColor} sticky top-4`}>
      <div className="text-center">
        <p className="text-sm font-medium text-muted-foreground mb-2">Risk Assessment</p>

        <div className="mb-6">
          <div className="text-6xl font-bold mb-2">
            <span className={riskInfo.color}>{riskScore}</span>
          </div>
          <p className={`text-lg font-semibold ${riskInfo.color}`}>{riskInfo.level}</p>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
          <div
            className={`h-2 rounded-full transition-all ${
              riskScore >= 70 ? "bg-red-600" : riskScore >= 40 ? "bg-yellow-600" : "bg-green-600"
            }`}
            style={{ width: `${riskScore}%` }}
          />
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed">{summary}</p>
      </div>
    </div>
  )
}
