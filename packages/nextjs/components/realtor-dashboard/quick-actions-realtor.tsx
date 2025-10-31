import { Plus, BarChart3, FileText, Users } from "lucide-react"
import { Card } from "~~/components/ui/card"
import { Button } from "~~/components/ui/button"

export function QuickActionsRealtor() {
  const actions = [
    {
      icon: Plus,
      iconBg: "bg-emerald-600",
      title: "Add Property",
      description: "List a new property for tokenization",
    },
    {
      icon: BarChart3,
      iconBg: "bg-blue-600",
      title: "View Analytics",
      description: "Check detailed performance metrics",
    },
    {
      icon: FileText,
      iconBg: "bg-purple-600",
      title: "Manage Documents",
      description: "Upload and organize property documents",
    },
    {
      icon: Users,
      iconBg: "bg-orange-600",
      title: "Investor Relations",
      description: "Communicate with your investors",
    },
  ]

  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
      <div className="space-y-3">
        {actions.map((action, index) => (
          <Button
            key={index}
            variant="outline"
            className="w-full justify-start h-auto p-4 hover:bg-gray-50 transition-colors bg-transparent"
          >
            <div className="flex items-center gap-4 w-full">
              <div className={`${action.iconBg} p-2 rounded-lg`}>
                <action.icon className="h-5 w-5 text-white" />
              </div>
              <div className="text-left flex-1">
                <p className="font-semibold text-gray-900">{action.title}</p>
                <p className="text-xs text-gray-600">{action.description}</p>
              </div>
            </div>
          </Button>
        ))}
      </div>
    </Card>
  )
}
