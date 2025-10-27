import { CheckCircle2, AlertCircle, XCircle } from "lucide-react"

interface VerificationChecklistProps {
  items: Array<{
    item: string
    status: "success" | "warning" | "error"
  }>
}

export function VerificationChecklist({ items }: VerificationChecklistProps) {
  const getIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle2 className="w-5 h-5 text-green-600" />
      case "warning":
        return <AlertCircle className="w-5 h-5 text-yellow-600" />
      case "error":
        return <XCircle className="w-5 h-5 text-red-600" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-green-50 border-green-200"
      case "warning":
        return "bg-yellow-50 border-yellow-200"
      case "error":
        return "bg-red-50 border-red-200"
      default:
        return "bg-gray-50 border-gray-200"
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-foreground">Verification Checklist</h2>

      <div className="space-y-3">
        {items.map((item, idx) => (
          <div key={idx} className={`p-4 rounded-lg border-2 flex items-center gap-4 ${getStatusColor(item.status)}`}>
            {getIcon(item.status)}
            <span className="font-medium text-foreground">{item.item}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
