import type { Metadata } from "next"
import Link from "next/link"
import { X } from "lucide-react"
import { LoginForm } from "~~/components/auth/login-form"

export const metadata: Metadata = {
  title: "Login | BrickChain",
  description: "Sign in to your BrickChain account",
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="relative bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
       

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
            <p className="text-gray-600">Sign in to your BrickChain account</p>
          </div>

          {/* Form */}
          <LoginForm />

          {/* Sign up link */}
          <p className="text-center text-sm text-gray-600 mt-6">
            Don't have an account?{" "}
            <Link href="/onboarding" className="text-emerald-600 hover:text-emerald-700 font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
