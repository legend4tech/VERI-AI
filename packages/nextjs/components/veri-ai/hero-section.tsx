import Link from "next/link"
import { Button } from "../ui/button"

export function HeroSection() {
  return (
    <section className="py-20 px-4 bg-linear-to-b from-primary/5 to-background">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 text-balance">
          Verify Real-World Assets with AI-Powered Intelligence
        </h1>

        <p className="text-xl text-muted-foreground mb-8 text-balance max-w-2xl mx-auto">
          Analyze tokenized real-world assets on Starknet. Get instant risk assessments powered by advanced AI analysis
          and on-chain verification.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/analyze">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Analyze an Asset
            </Button>
          </Link>
          <Button size="lg" variant="outline">
            Learn More
          </Button>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-lg border border-border bg-card">
            <div className="text-3xl font-bold text-primary mb-2">AI-Powered</div>
            <p className="text-muted-foreground">Advanced machine learning analysis of asset data</p>
          </div>
          <div className="p-6 rounded-lg border border-border bg-card">
            <div className="text-3xl font-bold text-primary mb-2">On-Chain</div>
            <p className="text-muted-foreground">Verified on Starknet blockchain</p>
          </div>
          <div className="p-6 rounded-lg border border-border bg-card">
            <div className="text-3xl font-bold text-primary mb-2">Instant</div>
            <p className="text-muted-foreground">Get risk assessments in seconds</p>
          </div>
        </div>
      </div>
    </section>
  )
}
