import { Card } from "~~/components/ui/card"

export function MonthlyStats() {
  const stats = [
    { label: "Properties Listed", value: "5" },
    { label: "Total Investments", value: "485 STRK" },
    { label: "Commission Earned", value: "38.8 STRK" },
    { label: "New Investors", value: "38" },
  ]

  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">This Month</h2>
      <div className="space-y-4">
        {stats.map((stat, index) => (
          <div key={index} className="flex items-center justify-between">
            <p className="text-sm text-gray-600">{stat.label}</p>
            <p className="text-lg font-bold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>
    </Card>
  )
}
