"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "~~/components/ui/button"
import Link from "next/link"
import { WelcomeModal } from "./welcome-modal"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [showWelcomeModal, setShowWelcomeModal] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600">
                <span className="text-sm font-bold text-white">rA</span>
              </div>
              <span className="text-xl font-bold text-gray-900">reAI</span>
            </Link>

            <nav className="hidden gap-8 md:flex">
              <Link href="/" className="text-sm text-gray-600 hover:text-emerald-600 transition-colors">
                Home
              </Link>
              <Link href="/properties" className="text-sm text-gray-600 hover:text-emerald-600 transition-colors">
                Properties
              </Link>
              <Link href="/about" className="text-sm text-gray-600 hover:text-emerald-600 transition-colors">
                About
              </Link>
              <a href="#" className="text-sm text-gray-600 hover:text-emerald-600 transition-colors">
                Contact
              </a>
            </nav>

            <div className="hidden gap-3 md:flex">
            
              <Button
                size="sm"
                className="bg-emerald-600 hover:bg-emerald-700 text-white transition-colors"
                onClick={() => setShowWelcomeModal(true)}
              >
                Get Started
              </Button>
            </div>

            <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-gray-900">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {isOpen && (
            <nav className="flex flex-col gap-4 pb-4 md:hidden">
              <Link href="/" className="text-sm text-gray-600 hover:text-emerald-600">
                Home
              </Link>
              <Link href="/properties" className="text-sm text-gray-600 hover:text-emerald-600">
                Properties
              </Link>
              <Link href="/about" className="text-sm text-gray-600 hover:text-emerald-600">
                About
              </Link>
              <a href="#" className="text-sm text-gray-600 hover:text-emerald-600">
                Contact
              </a>
              <div className="flex flex-col gap-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white transition-colors bg-transparent"
                >
                  Connect Wallet
                </Button>
                <Button
                  size="sm"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white transition-colors"
                  onClick={() => setShowWelcomeModal(true)}
                >
                  Get Started
                </Button>
              </div>
            </nav>
          )}
        </div>
      </header>

      <WelcomeModal open={showWelcomeModal} onOpenChange={setShowWelcomeModal} />
    </>
  )
}
