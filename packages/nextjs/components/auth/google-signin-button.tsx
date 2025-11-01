"use client"

import { signIn } from "next-auth/react"
import { Button } from "~~/components/ui/button"
import { useState } from "react"
import Image from "next/image"

export function GoogleSignInButton() {
  const [isLoading, setIsLoading] = useState(false)

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true)
      await signIn("google", { callbackUrl: "/dashboard/investor" })
    } catch (error) {
      console.error("Google sign-in error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      type="button"
      variant="outline"
      className="w-full h-12 bg-transparent"
      onClick={handleGoogleSignIn}
      disabled={isLoading}
    >
      <div className="w-5 h-5 mr-2 relative">
        <Image
          src="/google-img.png"
          alt="Google"
          width={20}
          height={20}
          className="w-full h-full"
        />
      </div>
      {isLoading ? "Signing in..." : "Continue with Google"}
    </Button>
  )
}