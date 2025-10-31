
import { Card } from "~~/components/ui/card"
import { Button } from "~~/components/ui/button"
import { Search, Target, FileText, Users } from "lucide-react"
import Link from "next/link"

const actions = [
  {
    label: "Explore New Properties",
    icon: Search,
    href: "/properties",
    variant: "default" as const,
  },
  {
    label: "Set Investment Goal",
    icon: Target,
    href: "#",
    variant: "outline" as const,
  },
  {
    label: "Download Documents",
    icon: FileText,
    href: "#",
    variant: "outline" as const,
  },

]

export function QuickActions() {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
      <div className="space-y-3">
        {actions.map((action) => (
          <Link key={action.label} href={action.href}>
            <Button
              variant={action.variant}
              className={`w-full justify-start gap-3 h-12 ${
                action.variant === "default" ? "bg-emerald-600 hover:bg-emerald-700" : ""
              }`}
            >
              <action.icon className="h-5 w-5" />
              {action.label}
            </Button>
          </Link>
        ))}
      </div>
    </Card>
  )
}
