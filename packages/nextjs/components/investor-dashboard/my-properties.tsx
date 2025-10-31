"use client"

import { Card } from "~~/components/ui/card"
import { Badge } from "~~/components/ui/badge"
import { Progress } from "~~/components/ui/progress"
import { MapPin, TrendingUp } from "lucide-react"
import { Button } from "~~/components/ui/button"
import Link from "next/link"

const properties = [
  {
    id: 1,
    name: "Lekki Pearl Towers",
    location: "Lekki Phase 1, Lagos",
    image: "/estate-img-4.jpg",

    invested: "500 STRK",
    currentValue: "580 STRK",
    monthlyIncome: "25 STRK",
    change: "+16.0%",
    ownership: 168000,
    ownershipPercent: 70,
    status: "Active",
  },
  {
    id: 2,
    name: "Banana Island Mansion",
    location: "Banana Island, Lagos",
       image: "/estate-img-3.jpg",

    invested: "450 STRK",
    currentValue: "520 STRK",
    monthlyIncome: "18 STRK",
    change: "+15.6%",
    ownership: 150000,
    ownershipPercent: 65,
    status: "Active",
  },
  {
    id: 3,
    name: "Ikeja GRA Residence",

        location: "Ikeja GRA, Lagos",

        image: "/estate-img-2.jpg",

    invested: "120 STRK",
    currentValue: "150 STRK",
    monthlyIncome: "2 STRK",
    change: "+25.0%",
    ownership: 40000,
    ownershipPercent: 40,
    status: "Active",
  },
]

export function MyProperties() {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">My Properties</h2>
        <Link href="/properties">
          <Button className="bg-emerald-600 hover:bg-emerald-700">+ Invest More</Button>
        </Link>
      </div>
      <div className="space-y-4">
        {properties.map((property) => (
          <Card key={property.id} className="p-4 hover:shadow-md transition-shadow">
            <div className="flex gap-4">
              <img
                src={property.image || "/placeholder.svg"}
                alt={property.name}
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-900">{property.name}</h3>
                    <p className="text-sm text-gray-600 flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {property.location}
                    </p>
                  </div>
                  <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">{property.status}</Badge>
                </div>

                <div className="grid grid-cols-4 gap-4 mb-3">
                  <div>
                    <p className="text-xs text-gray-600">Invested</p>
                    <p className="font-semibold text-sm">{property.invested}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Current Value</p>
                    <p className="font-semibold text-sm">{property.currentValue}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Monthly Income</p>
                    <p className="font-semibold text-sm text-emerald-600">{property.monthlyIncome}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Change</p>
                    <p className="font-semibold text-sm text-emerald-600 flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      {property.change}
                    </p>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-600">Ownership: {property.ownership.toLocaleString()}</span>
                    <span className="font-semibold">{property.ownershipPercent}%</span>
                  </div>
                  <Progress value={property.ownershipPercent} className="h-2" />
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Card>
  )
}
