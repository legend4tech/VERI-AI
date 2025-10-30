"use client"

export function Stats() {
  const stats = [
    {
      value: "2.5M+ STRK",
      label: "Total Value Locked",
      company: "On-Chain",
    },
    {
      value: "15,000+",
      label: "Active Investors",
      company: "Community",
    },
    {
      value: "8.5%",
      label: "Average APY",
      company: "Returns",
    },
    {
      value: "50+",
      label: "Premium Properties",
      company: "Portfolio",
    },
  ]

  return (
    <section className="border-t border-gray-200 bg-white px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col gap-4 p-6 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 transition-colors"
            >
              <div>
                <p className="text-3xl font-bold text-emerald-600">{stat.value}</p>
                <p className="text-sm text-gray-600 mt-2">{stat.label}</p>
              </div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{stat.company}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
