import { Building2, DollarSign, Users, TrendingUp } from "lucide-react"
import { Card } from "~~/components/ui/card"

export function RealtorStats() {
  const stats = [
    {
      title: "Total Properties",
      value: "5",
      change: "+2 this month",
      icon: Building2,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "Total Value",
      value: "485 STRK",
      change: "+15% this quarter",
      icon: DollarSign,
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
    },
    {
      title: "Active Investors",
      value: "225",
      change: "+38 this week",
      icon: Users,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      title: "Avg. ROI",
      value: "8.2%",
      change: "+0.3% vs last month",
      icon: TrendingUp,
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <Card key={stat.title} className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm text-gray-600 mb-2">{stat.title}</p>
              <p className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</p>
              <p className="text-sm text-emerald-600 font-medium">{stat.change}</p>
            </div>
            <div className={`${stat.iconBg} p-3 rounded-xl`}>
              <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
