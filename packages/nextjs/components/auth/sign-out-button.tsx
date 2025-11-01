"use client"

import { LogOut } from "lucide-react"
import { signOut } from "next-auth/react"
import { Button } from "~~/components/ui/button"
import { toast } from "sonner"

export function SignOutButton() {
  const handleSignOut = async () => {
    try {
      await signOut({ callbackUrl: "/login" })
      toast.success("Signed out successfully")
    } catch (error) {
      console.error("[v0] Sign out error:", error)
      toast.error("Failed to sign out")
    }
  }

  return (
    <Button
      onClick={handleSignOut}
      variant="outline"
      className="flex items-center gap-2 border-gray-300 hover:bg-gray-100 hover:border-gray-400 transition-colors bg-transparent"
    >
      <LogOut className="h-4 w-4" />
      <span className="hidden sm:inline">Sign Out</span>
    </Button>
  )
}
