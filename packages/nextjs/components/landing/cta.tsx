"use client"

import { Button } from "../ui/button"
import { ArrowRight } from "lucide-react"

export function CTA() {
  return (
    <section className="border-t border-gray-200 bg-white px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="relative overflow-hidden rounded-3xl border border-emerald-200 bg-linear-to-br from-emerald-50 to-emerald-100 p-12 sm:p-16 lg:p-20">
          {/* Background Gradient */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-emerald-200 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-emerald-300 blur-3xl" />
          </div>

          <div className="relative z-10 text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Ready to Start Investing?</h2>
            <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
              Join thousands of investors building wealth through tokenized real estate. Start with just 50 STRK today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white transition-colors">
                Get Started Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white transition-colors bg-transparent"
              >
                Join Our Waitlist
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
