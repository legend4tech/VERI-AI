import { FeaturesSection } from "~~/components/veri-ai/features-section";
import { Footer } from "~~/components/veri-ai/footer";
import { Header } from "~~/components/veri-ai/header";
import { HeroSection } from "~~/components/veri-ai/hero-section";


export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  )
}
