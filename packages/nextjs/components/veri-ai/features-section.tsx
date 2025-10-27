export function FeaturesSection() {
  const features = [
    {
      title: "Risk Scoring",
      description: "Comprehensive risk assessment with detailed scoring from 0-100",
    },
    {
      title: "Evidence Summary",
      description: "Step-by-step verification checklist of all identified risks",
    },
    {
      title: "Asset Details",
      description: "Complete on-chain identity and metadata information",
    },
    {
      title: "Real-Time Analysis",
      description: "Instant processing of tokenized asset data",
    },
  ]

  return (
    <section className="py-16 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Comprehensive Asset Analysis</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, idx) => (
            <div key={idx} className="p-6 rounded-lg border border-border bg-card hover:border-primary/50 transition">
              <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
