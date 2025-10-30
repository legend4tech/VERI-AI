import { BuiltForNigeria } from "~~/components/landing/built-for-nigeria";
import { CTA } from "~~/components/landing/cta";
import { Features } from "~~/components/landing/features";
import { Footer } from "~~/components/landing/footer";
import { Header } from "~~/components/landing/header";
import { Hero } from "~~/components/landing/hero";
import { Listings } from "~~/components/landing/listings";
import { Process } from "~~/components/landing/process";


export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <Hero/>
      <Features />
      <Listings />
      <BuiltForNigeria />
      <Process />
      <CTA />
      <Footer />
    </main>
  )
}
