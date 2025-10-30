"use client"

import { Card } from "../ui/card"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Progress } from "../ui/progress"
import { MapPin, TrendingUp } from "lucide-react"

export function Listings() {
  const properties = [
    {
      id: 1,
      name: "Lekki Pearl Towers",
      location: "Sub location",
      totalValue: "120,000 STRK",
      image: "/modern-luxury-apartment-building-in-lagos.jpg",
      availableTokens: "240000",
      minimumInvestment: "50,000 STRK",
      apy: "9.2%",
      funded: 70,
      rating: 4.3,
      status: "Active",
    },
    {
      id: 2,
      name: "Banana Island Mansion",
      location: "Sub location",
      totalValue: "250,000 STRK",
      image: "/luxury-waterfront-mansion-property.jpg",
      availableTokens: "500000",
      minimumInvestment: "100,000 STRK",
      apy: "8.8%",
      funded: 70,
      rating: 4.0,
      status: "Active",
    },
    {
      id: 3,
      name: "Victoria Island Complex",
      location: "Sub location",
      totalValue: "180,000 STRK",
      image: "/premium-commercial-real-estate-complex.jpg",
      availableTokens: "360000",
      minimumInvestment: "75,000 STRK",
      apy: "9.5%",
      funded: 65,
      rating: 4.5,
      status: "Active",
    },
  ]

  return (
    <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 text-balance">
            Invest in Iconic Nigerian Properties
          </h2>
          <p className="text-lg text-gray-600">Listings are illustrative. Actual properties require verification.</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {properties.map((property) => (
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

                {/* Invest Button */}
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-6">
                  Invest Now
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
