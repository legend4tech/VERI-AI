"use client"

import { useState } from "react"
import { Card } from "~~/components/ui/card"
import { Button } from "~~/components/ui/button"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data7d = [
  { date: "Mon", value: 1050 },
  { date: "Tue", value: 1100 },
  { date: "Wed", value: 1080 },
  { date: "Thu", value: 1150 },
  { date: "Fri", value: 1200 },
  { date: "Sat", value: 1220 },
  { date: "Sun", value: 1250 },
]

const data30d = [
  { date: "Week 1", value: 950 },
  { date: "Week 2", value: 1050 },
  { date: "Week 3", value: 1150 },
  { date: "Week 4", value: 1250 },
]

const data90d = [
  { date: "Month 1", value: 800 },
  { date: "Month 2", value: 1000 },
  { date: "Month 3", value: 1250 },
]

export function PortfolioChart() {
  const [period, setPeriod] = useState<"7d" | "30d" | "90d">("7d")

  const data = period === "7d" ? data7d : period === "30d" ? data30d : data90d

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Investment Growth</h2>
        <div className="flex gap-2">
          {(["7d", "30d", "90d"] as const).map((p) => (
            <Button
              key={p}
              variant={period === p ? "default" : "outline"}
              size="sm"
              onClick={() => setPeriod(p)}
              className={period === p ? "bg-emerald-600 hover:bg-emerald-700" : ""}
            >
              {p.toUpperCase()}
            </Button>
          ))}
        </div>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="date" stroke="#6b7280" />
          <YAxis stroke="#6b7280" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
            }}
            formatter={(value: number) => [`${value} STRK`, "Portfolio Value"]}
          />
          <Area type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} fill="url(#colorValue)" />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  )
}
