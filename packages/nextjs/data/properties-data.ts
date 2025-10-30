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
    location: "Lekki Phase 1, Lagos",
    totalValue: "1,200 STRK",
    image: "/estate-img-4.jpg",
    availableTokens: "2400",
    minimumInvestment: "50 STRK",
    apy: "9.2%",
    funded: 70,
    rating: 4.3,
    status: "Active",
  },
  {
    id: 2,
    name: "Banana Island Mansion",
    location: "Banana Island, Ikoyi",
    totalValue: "2,500 STRK",
    image: "/estate-img-3.jpg",
    availableTokens: "5000",
    minimumInvestment: "100 STRK",
    apy: "8.8%",
    funded: 85,
    rating: 4.8,
    status: "Active",
  },
  {
    id: 3,
    name: "Victoria Island Complex",
    location: "Victoria Island, Lagos",
    totalValue: "1,800 STRK",
    image: "/estate-img-1.jpg",
    availableTokens: "3600",
    minimumInvestment: "75 STRK",
    apy: "9.5%",
    funded: 65,
    rating: 4.5,
    status: "Active",
  },
  {
    id: 4,
    name: "Abuja Central Plaza",
    location: "Central Business District, Abuja",
    totalValue: "3,200 STRK",
    image: "/estate-img-5.jpg",
    availableTokens: "6400",
    minimumInvestment: "120 STRK",
    apy: "10.2%",
    funded: 45,
    rating: 4.6,
    status: "Active",
  },
  {
    id: 5,
    name: "Ikeja GRA Residence",
    location: "Ikeja GRA, Lagos",
    totalValue: "950 STRK",
    image: "/estate-img-2.jpg",
    availableTokens: "1900",
    minimumInvestment: "35 STRK",
    apy: "8.5%",
    funded: 92,
    rating: 4.2,
    status: "Active",
  },
]
