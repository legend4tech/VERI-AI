"use client"

import { DollarSign, Zap, Shield } from "lucide-react"

export function Features() {
  const features = [
    {
      icon: DollarSign,
      title: "No High Costs",
      description: "Start investing with just 50 STRK. No need for millions to own premium real estate.",
      color: "bg-red-100",
      iconColor: "text-red-500",
    },
    {
      icon: Zap,
      title: "Instant Liquidity",
      description: "Trade your property token anytime on our marketplace. No waiting months to sell.",
      color: "bg-blue-100",
      iconColor: "text-blue-500",
    },
    {
      icon: Shield,
      title: "Complete Trust",
      description: "Smart contracts ensures Transparency. All transaction are Secure and verifiable on the blockchain.",
      color: "bg-emerald-100",
      iconColor: "text-emerald-500",
    },
  ]

  return (
    <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Real Estate Reinvented For Everyone</h2>
          <p className="text-lg text-gray-600">
            Traditional Real Estate barriers eliminated through blockchain innovation
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="rounded-2xl border border-gray-200 bg-white p-8 hover:shadow-lg transition-shadow"
              >
                <div className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-full ${feature.color}`}>
                  <Icon className={`h-7 w-7 ${feature.iconColor}`} />
                </div>
                <h3 className="mb-3 text-xl font-bold text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
