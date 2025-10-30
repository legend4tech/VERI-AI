"use client"

import { Dialog, DialogContent, DialogTitle } from "~~/components/ui/dialog"
import { ArrowRight, UserPlus } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface WelcomeModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function WelcomeModal({ open, onOpenChange }: WelcomeModalProps) {
  const router = useRouter()

  const handleSignIn = () => {
    onOpenChange(false)
    router.push("/login")
  }

  const handleSignUp = () => {
    onOpenChange(false)
    router.push("/onboarding")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] p-6 sm:p-8">
        <div className="flex flex-col items-center text-center space-y-4 sm:space-y-5">
          {/* Title */}
          <div className="space-y-1">
            <DialogTitle className="text-2xl sm:text-3xl font-bold text-gray-900">Welcome to reAI</DialogTitle>
            <p className="text-sm sm:text-base text-gray-600">Choose how you'd like to continue</p>
          </div>

          {/* Options */}
          <div className="w-full space-y-3 pt-2">
            {/* I have an account */}
            <button
              onClick={handleSignIn}
              className="w-full p-4 sm:p-5 border-2 border-gray-200 rounded-lg hover:border-emerald-500 hover:bg-emerald-50 transition-all group"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-emerald-500 flex items-center justify-center group-hover:bg-emerald-600 transition-colors shrink-0">
                  <ArrowRight className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                <div className="text-left">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900">I have an account</h3>
                  <p className="text-xs sm:text-sm text-gray-600">Sign in to access your dashboard</p>
                </div>
              </div>
            </button>

            {/* I'm new here */}
            <button
              onClick={handleSignUp}
              className="w-full p-4 sm:p-5 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all group"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-blue-500 flex items-center justify-center group-hover:bg-blue-600 transition-colors shrink-0">
                  <UserPlus className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                <div className="text-left">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900">I'm new here</h3>
                  <p className="text-xs sm:text-sm text-gray-600">Create an account to get started</p>
                </div>
              </div>
            </button>
          </div>

          {/* Footer */}
          <p className="text-xs text-gray-500 pt-2">
            By continuing, you agree to our{" "}
            <Link href="#" className="text-emerald-600 hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="#" className="text-emerald-600 hover:underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
