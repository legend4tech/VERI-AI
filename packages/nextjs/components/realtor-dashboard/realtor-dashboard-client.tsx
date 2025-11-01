"use client"

import { useState } from "react"
import { Search, Filter, Plus, Eye, Calendar } from "lucide-react"
import { Card } from "~~/components/ui/card"
import { Button } from "~~/components/ui/button"
import { Input } from "~~/components/ui/input"
import { Badge } from "~~/components/ui/badge"
import { Progress } from "~~/components/ui/progress"
import { properties } from "~~/data/properties-data"
import { RealtorStats } from "./realtor-stats"
import { CommissionChart } from "./commission-chart"
import { RecentActivity } from "./recent-activity"
import { QuickActionsRealtor } from "./quick-actions-realtor"
import { MonthlyStats } from "./monthly-stats"
import { AddPropertyModal } from "./add-property-modal"


export function RealtorDashboardClient({ userName }: { userName: string }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddPropertyOpen, setIsAddPropertyOpen] = useState(false)

   // Use our existing properties data
 const realtorProperties = properties.map((property, index) => ({
  ...property,
  title: property.name, // Add this line to create a title field from name
  investors: [45, 67, 23, 38, 52][index] || 30,
  fundingProgress: [85, 92, 68, 75, 88][index] || 70,
  addedDate: ["2024-01-15", "2024-01-10", "2024-01-20", "2024-01-08", "2024-01-12"][index] || "2024-01-15",
  status: index < 2 ? "Active" : index === 2 ? "Funding" : "Active",
}))

  const filteredProperties = realtorProperties.filter((property) =>
    property.title.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {userName}</h1>
          <p className="text-gray-600 mt-2">
            Manage your property listings, track commissions, and grow your business.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <RealtorStats />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <h2 className="text-2xl font-bold text-gray-900">My Property Listings</h2>
                <Button
                  onClick={() => setIsAddPropertyOpen(true)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Property
                </Button>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="Search properties..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-12"
                  />
                </div>
                <Button variant="outline" className="h-12 px-6 bg-transparent">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>

              <div className="space-y-4">
                {filteredProperties.map((property) => (
                  <Card key={property.id} className="p-6 hover:shadow-md transition-shadow">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-xl font-bold text-gray-900">{property.title}</h3>
                          <Badge
                            className={
                              property.status === "Active"
                                ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
                                : "bg-orange-100 text-orange-700 hover:bg-orange-100"
                            }
                          >
                            {property.status}
                          </Badge>
                        </div>
                        <p className="text-gray-600 flex items-center gap-1 mb-4">
                          <span className="text-gray-400">📍</span>
                          {property.location}
                        </p>

                        <div className="grid grid-cols-3 gap-4 mb-4">
                          <div>
                            <p className="text-sm text-gray-600 mb-1">Value</p>
                            <p className="font-bold text-gray-900">{property.totalValue} STRK</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 mb-1">APY</p>
                            <p className="font-bold text-gray-900">{property.apy}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 mb-1">Investors</p>
                            <p className="font-bold text-gray-900">{property.investors}</p>
                          </div>
                        </div>

                        <div className="mb-4">
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-sm text-gray-600">Funding Progress</p>
                            <p className="text-sm font-bold text-gray-900">{property.fundingProgress}%</p>
                          </div>
                          <Progress value={property.fundingProgress} className="h-2" />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Calendar className="h-4 w-4" />
                            <span>Added {property.addedDate}</span>
                          </div>
                          <Button variant="ghost" className="text-emerald-600 hover:text-emerald-700">
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>

            <CommissionChart />
          </div>

          <div className="space-y-6">
            <RecentActivity />
            <QuickActionsRealtor />
            <MonthlyStats />
          </div>
        </div>
      </div>

      <AddPropertyModal open={isAddPropertyOpen} onOpenChange={setIsAddPropertyOpen} />
    </div>
  )
}
