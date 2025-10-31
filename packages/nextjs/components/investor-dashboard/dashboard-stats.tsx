"use client"

import { TrendingUp, Wallet, DollarSign, ArrowUpRight } from "lucide-react"
import { Card } from "~~/components/ui/card"

const stats = [
  {
    title: "Total Portfolio Value",
    value: "1,250 STRK",
    change: "+16.67%",
    icon: TrendingUp,
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
  },
  {
    title: "Total Invested",
    value: "1,070 STRK",
    subtitle: "Across 3 Properties",
    icon: Wallet,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    title: "Monthly Income",
    value: "45 STRK",
    subtitle: "From rental yields",
    icon: DollarSign,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
  },
  {
    title: "Total Returns",
    value: "180 STRK",
    change: "+16.67%",
    icon: ArrowUpRight,
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
  },
]

export function DashboardStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm text-gray-600 mb-2">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
              {stat.change && (
                <p className="text-sm font-medium text-emerald-600 flex items-center gap-1">
                  <TrendingUp className="h-4 w-4" />
                  {stat.change}
                </p>
              )}
              {stat.subtitle && <p className="text-sm text-gray-500">{stat.subtitle}</p>}
            </div>
            <div className={`${stat.iconBg} p-3 rounded-full`}>
              <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
