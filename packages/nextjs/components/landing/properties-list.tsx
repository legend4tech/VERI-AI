"use client"

import { useState } from "react"
import { Card } from "~~/components/ui/card"
import { Badge } from "~~/components/ui/badge"
import { Button } from "~~/components/ui/button"
import { Progress } from "~~/components/ui/progress"
import { Input } from "~~/components/ui/input"
import { MapPin, TrendingUp, Search } from "lucide-react"
import { properties, Property } from "~~/data/properties-data"
import { PropertyAnalysisModal } from "./property-analysis-modal"
import { useRouter } from "next/navigation"


export function PropertiesList() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  const [isAnalysisOpen, setIsAnalysisOpen] = useState(false)

  const filteredProperties = properties.filter(
    (property) =>
      property.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.location.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleAnalyze = (property: Property) => {
    setSelectedProperty(property)
    setIsAnalysisOpen(true)
  }

  const handleInvest = () => {
    router.push("/signup?type=investor")
  }

  return (
    <>
      {/* Search Bar */}
      <div className="relative max-w-2xl mb-12">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <Input
          type="text"
          placeholder="Search properties by name or location..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-12 py-6 text-base border-gray-300 focus:border-emerald-600 focus:ring-emerald-600"
        />
      </div>

      {/* Properties Grid */}
      {filteredProperties.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-xl text-gray-600">No properties found matching your search.</p>
        </div>
      ) : (
        <>
          <p className="text-sm text-gray-600 mb-6">
            Showing {filteredProperties.length} {filteredProperties.length === 1 ? "property" : "properties"}
          </p>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredProperties.map((property) => (
              <Card
                key={property.id}
                className="overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col border-gray-200"
              >
                {/* Property Image */}
                <div className="relative h-64 bg-gray-100 overflow-hidden">
                  <img
                    src={property.image || "/placeholder.svg"}
                    alt={property.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-emerald-600 text-white font-semibold">{property.status}</Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary" className="bg-gray-800 text-white">
                      ★ {property.rating}
                    </Badge>
                  </div>
                </div>

                {/* Card Content */}
                <div className="flex-1 p-6 flex flex-col bg-white">
                  {/* Property Name and Value */}
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{property.name}</h3>
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="text-sm">{property.location}</span>
                  </div>

                  {/* Total Value */}
                  <div className="mb-6 pb-6 border-b border-gray-200">
                    <p className="text-sm text-gray-600 mb-1">Total Value</p>
                    <div className="flex items-center gap-2">
                      <p className="text-2xl font-bold text-gray-900">{property.totalValue}</p>
                    </div>
                  </div>

                  {/* Investment Details */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Available Tokens</p>
                      <p className="font-semibold text-gray-900">{property.availableTokens}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Minimum Investment</p>
                      <p className="font-semibold text-gray-900">{property.minimumInvestment}</p>
                    </div>
                  </div>

                  {/* APY and Funding */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-4 h-4 text-emerald-600" />
                      <span className="font-bold text-emerald-600">{property.apy} APY</span>
                    </div>
                    <span className="text-sm text-gray-600">{property.funded}% Funded</span>
                  </div>

                  {/* Progress Bar */}
                  <Progress value={property.funded} className="mb-6 h-2" />

                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      onClick={() => handleAnalyze(property)}
                      variant="outline"
                      className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 font-semibold py-6"
                    >
                      Analyse
                    </Button>
                    <Button
                      onClick={handleInvest}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-6"
                    >
                      Invest Now
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </>
      )}

      <PropertyAnalysisModal property={selectedProperty} open={isAnalysisOpen} onOpenChange={setIsAnalysisOpen} />
    </>
  )
}
