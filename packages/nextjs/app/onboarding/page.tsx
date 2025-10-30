import type { Metadata } from "next"
import Link from "next/link"
import { Users, Building2, CheckCircle2, Briefcase, Building } from "lucide-react"

export const metadata: Metadata = {
  title: "Choose Your Path | BrickChain",
  description: "Select how you'd like to join the BrickChain ecosystem",
}

export default function OnboardingPage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Choose Your Path</h1>
          <p className="text-lg text-gray-600">Select how you'd like to join the BrickChain ecosystem</p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Investor Card */}
          <Link
            href="/signup?type=investor"
            className="group relative bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-emerald-500 hover:shadow-lg transition-all"
          >
            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-emerald-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Users className="w-10 h-10 text-white" />
              </div>
            </div>

            {/* Title */}
            <div className="text-center mb-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Briefcase className="w-5 h-5 text-gray-700" />
                <h2 className="text-2xl font-bold text-gray-900">I'm an Investor</h2>
              </div>
              <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 text-sm font-medium rounded-full">
                Most Popular
              </span>
            </div>

            {/* Description */}
            <p className="text-center text-gray-600 mb-6">
              Start investing in premium real estate with as little as 10,000 STRK
            </p>

            {/* Features */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                <span className="text-gray-700">Low minimum investment</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                <span className="text-gray-700">Instant liquidity</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                <span className="text-gray-700">Passive income</span>
              </div>
            </div>
          </Link>

          {/* Realtor Card */}
          <Link
            href="/signup?type=realtor"
            className="group relative bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-blue-500 hover:shadow-lg transition-all"
          >
            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Building2 className="w-10 h-10 text-white" />
              </div>
            </div>

            {/* Title */}
            <div className="text-center mb-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Building className="w-5 h-5 text-gray-700" />
                <h2 className="text-2xl font-bold text-gray-900">I'm a Realtor</h2>
              </div>
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
                Professional
              </span>
            </div>

            {/* Description */}
            <p className="text-center text-gray-600 mb-6">
              List and tokenize your properties on our blockchain platform
            </p>

            {/* Features */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0" />
                <span className="text-gray-700">List properties</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0" />
                <span className="text-gray-700">Earn commissions</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0" />
                <span className="text-gray-700">Manage listings</span>
              </div>
            </div>
          </Link>
        </div>

        {/* Back to home */}
        <div className="text-center">
          <Link href="/" className="text-gray-600 hover:text-gray-900 text-sm">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  )
}
