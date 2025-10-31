"use client"

import { useState } from "react"
import { Card } from "~~/components/ui/card"
import { Button } from "~~/components/ui/button"
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data7d = [
  { day: "Mon", earnings: 2.5 },
  { day: "Tue", earnings: 3.2 },
  { day: "Wed", earnings: 2.8 },
  { day: "Thu", earnings: 4.1 },
  { day: "Fri", earnings: 3.6 },
  { day: "Sat", earnings: 5.2 },
  { day: "Sun", earnings: 4.8 },
]

const data30d = [
  { day: "Week 1", earnings: 18.5 },
  { day: "Week 2", earnings: 22.3 },
  { day: "Week 3", earnings: 19.8 },
  { day: "Week 4", earnings: 25.6 },
]

const data90d = [
  { day: "Month 1", earnings: 65.2 },
  { day: "Month 2", earnings: 72.8 },
  { day: "Month 3", earnings: 78.5 },
]

export function CommissionChart() {
  const [period, setPeriod] = useState<"7d" | "30d" | "90d">("7d")

  const data = period === "7d" ? data7d : period === "30d" ? data30d : data90d

  return (
    <Card className="p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Commission Performance</h2>
        <div className="flex gap-2">
          <Button
            variant={period === "7d" ? "default" : "outline"}
            onClick={() => setPeriod("7d")}
            className={period === "7d" ? "bg-emerald-600 hover:bg-emerald-700" : ""}
          >
            7D
          </Button>
          <Button
            variant={period === "30d" ? "default" : "outline"}
            onClick={() => setPeriod("30d")}
            className={period === "30d" ? "bg-emerald-600 hover:bg-emerald-700" : ""}
          >
            30D
          </Button>
          <Button
            variant={period === "90d" ? "default" : "outline"}
            onClick={() => setPeriod("90d")}
            className={period === "90d" ? "bg-emerald-600 hover:bg-emerald-700" : ""}
          >
            90D
          </Button>
        </div>
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="day" stroke="#9ca3af" fontSize={12} />
            <YAxis stroke="#9ca3af" fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                padding: "8px 12px",
              }}
              formatter={(value: number) => [`${value} STRK`, "Earnings"]}
            />
            <Area type="monotone" dataKey="earnings" stroke="#10b981" strokeWidth={2} fill="url(#colorEarnings)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}
