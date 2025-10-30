"use client"

import { CheckCircle2, Shield, Users, Building2, TrendingUp } from "lucide-react"

export function BuiltForNigeria() {
  const features = [
    {
      title: "Audited Smart Contract",
      description: "No rug pull. All contracts are audited by leading security firm",
      icon: CheckCircle2,
    },
    {
      title: "Diasporal-Friendly Investment",
      description: "Invest from anywhere with stablecoins and international payment method",
      icon: CheckCircle2,
    },
    {
      title: "Legal Compliance",
      description: "Fully compliant with nigerian regulation and international standard",
      icon: CheckCircle2,
    },
    {
      title: "Instant Liquidity via P2PDX Trading",
      description: "Trade your token 24/7 on our Decentralized exchange",
      icon: CheckCircle2,
    },
  ]

  const securityMetrics = [
    { label: "100%\nsecured", icon: Shield },
    { label: "100%\nsecured", icon: Users },
    { label: "100%\nsecured", icon: Building2 },
    { label: "100%\nsecured", icon: TrendingUp },
  ]

  return (
    <section className="bg-white py-16 md:py-24 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Features */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">Built for Nigeria,</h2>
              <p className="text-2xl md:text-3xl font-semibold text-emerald-600">Powered by Blockchain</p>
            </div>

            <p className="text-gray-700 text-lg leading-relaxed">
              We built the most secure and compliant platform for real estate tokenization in Nigeria.
            </p>

            <div className="space-y-6">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <div key={index} className="flex gap-4">
                    <Icon className="w-6 h-6 text-emerald-600 shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg">{feature.title}</h3>
                      <p className="text-gray-600 text-sm mt-1">{feature.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right side - Security Metrics */}
          <div className="grid grid-cols-2 gap-6">
            {securityMetrics.map((metric, index) => {
              const Icon = metric.icon
              return (
                <div
                  key={index}
                  className="bg-emerald-50 rounded-lg p-8 flex flex-col items-center justify-center text-center border border-emerald-200"
                >
                  <Icon className="w-12 h-12 text-emerald-600 mb-4" />
                  <p className="text-gray-900 font-semibold whitespace-pre-line text-sm md:text-base">{metric.label}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
