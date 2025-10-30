import type { Metadata } from "next"
import Link from "next/link"
import { X } from "lucide-react"
import { RealtorSignupForm } from "~~/components/auth/realtor-signup-form"
import { InvestorSignupForm } from "~~/components/auth/investor-signup-form"


export const metadata: Metadata = {
  title: "Sign Up | BrickChain",
  description: "Create your BrickChain account",
}

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export default async function SignupPage(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams
  const type = searchParams.type as string | undefined
  const isRealtor = type === "realtor"

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="relative bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
         

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {isRealtor ? "Register as realtor" : "Create Account"}
            </h1>
            <p className="text-gray-600">
              {isRealtor ? "Fill in your details to get started" : "Join BrickChain and start investing"}
            </p>
          </div>

          {/* Form */}
          {isRealtor ? <RealtorSignupForm /> : <InvestorSignupForm />}
        </div>
      </div>
    </div>
  )
}
