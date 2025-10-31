
import { Card } from "~~/components/ui/card"
import { ArrowUpRight, ArrowDownLeft } from "lucide-react"

const transactions = [
  {
    id: 1,
    type: "Investment",
    property: "Lagos Duplex",
    amount: "100 STRK",
    date: "2024-01-15",
    icon: ArrowUpRight,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    id: 2,
    type: "Dividend",
    property: "Abuja Apartments",
    amount: "18.5 STRK",
    date: "2024-01-10",
    icon: ArrowDownLeft,
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
  },
  {
    id: 3,
    type: "Investment",
    property: "Lekki Terrace",
    amount: "50 STRK",
    date: "2024-01-08",
    icon: ArrowUpRight,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
]

export function RecentTransactions() {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Transactions</h2>
      <div className="space-y-4">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="flex items-center gap-3">
            <div className={`${transaction.iconBg} p-2 rounded-full`}>
              <transaction.icon className={`h-5 w-5 ${transaction.iconColor}`} />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm text-gray-900">{transaction.type}</p>
              <p className="text-xs text-gray-600">{transaction.property}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-sm text-gray-900">{transaction.amount}</p>
              <p className="text-xs text-gray-500">{transaction.date}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
