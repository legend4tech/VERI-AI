"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "~~/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~~/components/ui/form"
import { Input } from "~~/components/ui/input"
import { Checkbox } from "~~/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "~~/components/ui/radio-group"
import { toast } from "sonner"
import { signIn } from "next-auth/react"
import { verifyCredentials } from "~~/app/actions/verify-credentials"
import { GoogleSignInButton } from "./google-signin-button"


const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  rememberMe: z.boolean().optional(),
})

type LoginFormValues = z.infer<typeof loginSchema>

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl")

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  })

  async function onSubmit(data: LoginFormValues) {
    setIsLoading(true)

    try {
      const verificationResult = await verifyCredentials(data.email, data.password)

      if (!verificationResult.success || !verificationResult.user) {
        toast.error("Invalid email or password")
        setIsLoading(false)
        return
      }

      const result = await signIn("credentials", {
        email: verificationResult.user.email,
        id: verificationResult.user.id,
        name: verificationResult.user.name,
        role: verificationResult.user.role,
        redirect: false,
      })

      if (result?.error) {
        toast.error("Authentication failed")
        setIsLoading(false)
        return
      }

      toast.success("Login successful! Welcome back", {
        description: "Redirecting to your dashboard...",
      })

      setTimeout(() => {
        const dashboardUrl = verificationResult.user.role === "realtor" ? "/dashboard/realtor" : "/dashboard/investor"
        router.push(callbackUrl || dashboardUrl)
        router.refresh()
      }, 1000)
    } catch (error) {
      console.error("[v0] Login error:", error)
      toast.error("An error occurred during login")
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <GoogleSignInButton />

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-muted-foreground">Or continue with email</span>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-normal text-gray-900">Email Address</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" type="email" className="h-12" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-normal text-gray-900">Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="Enter your password"
                      type={showPassword ? "text" : "password"}
                      className="h-12 pr-10"
                      {...field}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center justify-between flex-wrap gap-2">
            <FormField
              control={form.control}
              name="rememberMe"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2 space-y-0">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <FormLabel className="text-sm font-normal text-gray-700 cursor-pointer">Remember me</FormLabel>
                </FormItem>
              )}
            />
            <Link
              href="/forgot-password"
              className="text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
            >
              Forgot password?
            </Link>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-base transition-colors"
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>
      </Form>
    </div>
  )
}
