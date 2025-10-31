import { DollarSign, Target, Users, FileText } from "lucide-react"
import { Card } from "~~/components/ui/card"

export function RecentActivity() {
  const activities = [
    {
      icon: DollarSign,
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
      title: "New investment of 50 STRK in Lagos Luxury Duplex",
      time: "2 hours ago",
    },
    {
      icon: Target,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      title: "Abuja Executive Apartments reached 92% funding",
      time: "5 hours ago",
    },
    {
      icon: Users,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      title: "15 new investors joined your properties today",
      time: "1 day ago",
    },
    {
      icon: FileText,
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
      title: "Property documents updated for Lekki Modern Terrace",
      time: "2 days ago",
    },
  ]

  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex gap-4">
            <div className={`${activity.iconBg} p-2 rounded-lg h-fit`}>
              <activity.icon className={`h-5 w-5 ${activity.iconColor}`} />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-900 font-medium leading-relaxed">{activity.title}</p>
              <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
