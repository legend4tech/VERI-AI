export interface Property {
  id: number
  name: string
  location: string
  totalValue: string
  image: string
  availableTokens: string
  minimumInvestment: string
  apy: string
  funded: number
  rating: number
  status: string
}

export const properties: Property[] = [
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
