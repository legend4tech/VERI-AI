"use client"

import { Gem, Briefcase, TrendingUp } from "lucide-react"

export function Process() {
  const steps = [
    {
      icon: Gem,
      title: "Tokenize",
      subtitle: "Minimum investment 50 STRK",
      description: "Property owners mint tokens (1 token = 5 STRK of equity).",
      color: "bg-purple-100",
      iconColor: "text-purple-600",
      highlightColor: "bg-purple-200",
    },
    {
      icon: Briefcase,
      title: "Invest",
      subtitle: "Instant ownership verification",
      description: "Buy tokens with STRK Own fractions hassle-free.",
      color: "bg-blue-100",
      iconColor: "text-blue-600",
      highlightColor: "bg-blue-200",
    },
    {
      icon: TrendingUp,
      title: "Earn",
      subtitle: "Up to 12% annual return",
      description: "Stake tokens to earn 5% annual yield or trade on our P2P market.",
      color: "bg-red-100",
      iconColor: "text-red-600",
      highlightColor: "bg-red-200",
    },
  ]

  return (
    <section className="border-t border-gray-200 bg-gray-50 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Own Real Estate in 3 Simple Steps</h2>
          <p className="text-lg text-gray-600">Get started in minutes, not months</p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div
                key={index}
                className="rounded-2xl border border-gray-200 bg-white p-8 hover:shadow-lg transition-shadow"
              >
                <div className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-full ${step.color}`}>
                  <Icon className={`h-7 w-7 ${step.iconColor}`} />
                </div>
                <h3 className="mb-2 text-2xl font-bold text-gray-900">{step.title}</h3>
                <div className={`mb-4 inline-block px-3 py-1 rounded-full ${step.highlightColor} text-sm font-medium`}>
                  {step.subtitle}
                </div>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
