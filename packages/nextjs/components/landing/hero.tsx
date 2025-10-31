"use client"

import { Button } from "../ui/button"
import { ArrowRight } from "lucide-react"
import { useState } from "react"
import { WelcomeModal } from "./welcome-modal"

export function Hero() {
  const [showWelcomeModal, setShowWelcomeModal] = useState(false)

  return (
    <>
      <section className="relative overflow-hidden bg-white px-4 py-20 sm:px-6 lg:px-8 border-b border-gray-200">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-6">
              Own a Piece Of Nigerian's
              <br />
              <span className="text-emerald-600">Premium Real Estate</span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-700 max-w-2xl mx-auto mb-8 leading-relaxed">
              Invest in Anambra, Lagos, Abuja, Enugu and Many more.. Properties with as little as{" "}
              <span className="font-semibold text-gray-900">50 STRK</span>, tokenize, trade, and earn yield all on
              blockchain
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button
                size="lg"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
                onClick={() => setShowWelcomeModal(true)}
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white font-semibold transition-colors bg-transparent"
              >
                Learn More
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-8">
              <div>
                <p className="text-3xl sm:text-4xl font-bold text-emerald-600">2.5M+</p>
                <p className="text-sm text-gray-600 mt-2">Total STRK Locked</p>
              </div>
              <div>
                <p className="text-3xl sm:text-4xl font-bold text-emerald-600">15,000+</p>
                <p className="text-sm text-gray-600 mt-2">Active Investors</p>
              </div>
              <div>
                <p className="text-3xl sm:text-4xl font-bold text-emerald-600">8.5%</p>
                <p className="text-sm text-gray-600 mt-2">Average APY</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <WelcomeModal open={showWelcomeModal} onOpenChange={setShowWelcomeModal} />
    </>
  )
}
