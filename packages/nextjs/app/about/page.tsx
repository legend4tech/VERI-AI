import { Shield, Zap, TrendingUp, Users, Lock, BarChart3, Building2, Sparkles } from "lucide-react"
import { Button } from "~~/components/ui/button"
import { Card } from "~~/components/ui/card"
import Link from "next/link"
import type { Metadata } from "next"



export const metadata: Metadata = {
  title: "About reAI - AI-Powered Real Estate Tokenization",
  description:
    "Learn how reAI combines blockchain technology and artificial intelligence to revolutionize real estate investment through secure asset tokenization.",
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-linear-to-br from-emerald-50 via-white to-emerald-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-700">
              <Sparkles className="h-4 w-4" />
              Blockchain Meets Artificial Intelligence
            </div>
            <h1 className="mb-6 text-4xl font-bold text-gray-900 sm:text-5xl lg:text-6xl">
              Revolutionizing Real Estate
              <span className="block text-emerald-600">Through Smart Tokenization</span>
            </h1>
            <p className="mx-auto max-w-3xl text-lg text-gray-600 leading-relaxed">
              reAI is pioneering the future of real estate investment by combining the security of Starknet blockchain
              with advanced AI analysis to make property investment accessible, transparent, and safe for everyone.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <h2 className="mb-6 text-3xl font-bold text-gray-900 sm:text-4xl">Our Mission</h2>
              <p className="mb-6 text-lg text-gray-600 leading-relaxed">
                Traditional real estate investment has always been limited to those with significant capital and insider
                knowledge. We're changing that narrative by democratizing access to premium properties through
                fractional ownership powered by blockchain technology.
              </p>
              <p className="mb-6 text-lg text-gray-600 leading-relaxed">
                But accessibility isn't enough. Safety and transparency are paramount. That's why we've integrated
                cutting-edge AI analysis to verify property credibility, assess risks, and provide investors with
                comprehensive insights before they commit their capital.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Our vision is a world where anyone can build wealth through real estate, backed by the security of
                blockchain and the intelligence of AI.
              </p>
            </div>
            <div className="grid gap-6">
              <Card className="p-6 border-emerald-200 hover:border-emerald-400 transition-colors">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100">
                  <Building2 className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900">Asset Tokenization</h3>
                <p className="text-gray-600">
                  Convert real estate into digital tokens on Starknet, enabling fractional ownership and instant
                  liquidity.
                </p>
              </Card>
              <Card className="p-6 border-emerald-200 hover:border-emerald-400 transition-colors">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100">
                  <Sparkles className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900">AI-Powered Analysis</h3>
                <p className="text-gray-600">
                  Advanced algorithms verify property authenticity, assess risks, and provide detailed credibility
                  reports.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">How reAI Works</h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              A seamless blend of blockchain security and artificial intelligence for safe, transparent real estate
              investment.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-600 text-white text-xl font-bold">
                  1
                </div>
              </div>
              <h3 className="mb-3 text-xl font-semibold text-gray-900">Property Listing</h3>
              <p className="text-gray-600">
                Verified realtors list premium properties with complete documentation and legal compliance.
              </p>
            </div>

            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-600 text-white text-xl font-bold">
                  2
                </div>
              </div>
              <h3 className="mb-3 text-xl font-semibold text-gray-900">AI Analysis</h3>
              <p className="text-gray-600">
                Our AI engine analyzes ownership records, legal documents, market data, and blockchain registry for
                credibility.
              </p>
            </div>

            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-600 text-white text-xl font-bold">
                  3
                </div>
              </div>
              <h3 className="mb-3 text-xl font-semibold text-gray-900">Tokenization</h3>
              <p className="text-gray-600">
                Properties are converted into STRK tokens on Starknet blockchain, enabling fractional ownership.
              </p>
            </div>

            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-600 text-white text-xl font-bold">
                  4
                </div>
              </div>
              <h3 className="mb-3 text-xl font-semibold text-gray-900">Invest & Earn</h3>
              <p className="text-gray-600">
                Investors purchase tokens with as little as 50 STRK and earn passive income from property appreciation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">Why Choose reAI?</h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              We've built the most secure and intelligent real estate investment platform on the blockchain.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="p-8 border-gray-200 hover:border-emerald-400 hover:shadow-lg transition-all">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-emerald-100">
                <Shield className="h-7 w-7 text-emerald-600" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-gray-900">AI-Verified Safety</h3>
              <p className="text-gray-600">
                Every property undergoes rigorous AI analysis checking ownership records, legal compliance, and market
                authenticity before listing.
              </p>
            </Card>

            <Card className="p-8 border-gray-200 hover:border-emerald-400 hover:shadow-lg transition-all">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-emerald-100">
                <Lock className="h-7 w-7 text-emerald-600" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-gray-900">Blockchain Security</h3>
              <p className="text-gray-600">
                Built on Starknet, ensuring immutable ownership records, transparent transactions, and protection
                against fraud.
              </p>
            </Card>

            <Card className="p-8 border-gray-200 hover:border-emerald-400 hover:shadow-lg transition-all">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-emerald-100">
                <TrendingUp className="h-7 w-7 text-emerald-600" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-gray-900">Low Entry Barrier</h3>
              <p className="text-gray-600">
                Start investing in premium real estate with as little as 50 STRK tokens. No need for millions in
                capital.
              </p>
            </Card>

            <Card className="p-8 border-gray-200 hover:border-emerald-400 hover:shadow-lg transition-all">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-emerald-100">
                <Zap className="h-7 w-7 text-emerald-600" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-gray-900">Instant Liquidity</h3>
              <p className="text-gray-600">
                Unlike traditional real estate, your tokenized assets can be traded instantly on the blockchain
                marketplace.
              </p>
            </Card>

            <Card className="p-8 border-gray-200 hover:border-emerald-400 hover:shadow-lg transition-all">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-emerald-100">
                <BarChart3 className="h-7 w-7 text-emerald-600" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-gray-900">Transparent Analytics</h3>
              <p className="text-gray-600">
                Access detailed AI-generated reports showing risk assessments, market analysis, and property credibility
                scores.
              </p>
            </Card>

            <Card className="p-8 border-gray-200 hover:border-emerald-400 hover:shadow-lg transition-all">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-emerald-100">
                <Users className="h-7 w-7 text-emerald-600" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-gray-900">Community Driven</h3>
              <p className="text-gray-600">
                Join a growing community of investors and realtors building the future of decentralized real estate.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="bg-linear-to-br from-emerald-50 via-white to-emerald-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">Powered by Cutting-Edge Technology</h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              We leverage the best blockchain and AI technologies to deliver a secure, intelligent platform.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <Card className="p-8 border-emerald-200">
              <h3 className="mb-4 text-2xl font-bold text-gray-900">Starknet Blockchain</h3>
              <p className="mb-4 text-gray-600">
                Built on Starknet, a Layer 2 scaling solution for Ethereum that provides:
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 text-xs">
                    ✓
                  </span>
                  <span>High transaction throughput with low fees</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 text-xs">
                    ✓
                  </span>
                  <span>Zero-knowledge proof security</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 text-xs">
                    ✓
                  </span>
                  <span>Immutable ownership records</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 text-xs">
                    ✓
                  </span>
                  <span>Smart contract automation</span>
                </li>
              </ul>
            </Card>

            <Card className="p-8 border-emerald-200">
              <h3 className="mb-4 text-2xl font-bold text-gray-900">AI Analysis Engine</h3>
              <p className="mb-4 text-gray-600">
                Our proprietary AI system analyzes multiple data sources to ensure property credibility:
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 text-xs">
                    ✓
                  </span>
                  <span>Blockchain registry verification</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 text-xs">
                    ✓
                  </span>
                  <span>Legal document analysis</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 text-xs">
                    ✓
                  </span>
                  <span>Market data cross-referencing</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 text-xs">
                    ✓
                  </span>
                  <span>Risk assessment modeling</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="mb-6 text-3xl font-bold text-gray-900 sm:text-4xl">Ready to Start Your Investment Journey?</h2>
          <p className="mb-8 text-lg text-gray-600">
            Join thousands of investors who are building wealth through AI-verified, blockchain-secured real estate.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/properties">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8">
                Browse Properties
              </Button>
            </Link>
            <Link href="/onboarding">
              <Button
                size="lg"
                variant="outline"
                className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 px-8 bg-transparent"
              >
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
