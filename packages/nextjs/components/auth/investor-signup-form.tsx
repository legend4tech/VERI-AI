"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "~~/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~~/components/ui/form"
import { Input } from "~~/components/ui/input"
import { toast } from "sonner"

const investorSignupSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  nin: z.string().length(11, "NIN must be exactly 11 digits").regex(/^\d+$/, "NIN must contain only numbers"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  phone: z.string().optional(),
})

type InvestorSignupFormValues = z.infer<typeof investorSignupSchema>

export function InvestorSignupForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const form = useForm<InvestorSignupFormValues>({
    resolver: zodResolver(investorSignupSchema),
    defaultValues: {
      fullName: "",
      nin: "",
      email: "",
      password: "",
      phone: "",
    },
  })

  async function onSubmit(data: InvestorSignupFormValues) {
    setIsLoading(true)
    console.log("[v0] Investor signup form submitted:", data)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)

    toast.success("Registration successful! Welcome to reAI", {
      description: "Redirecting to your dashboard...",
    })

    setTimeout(() => {
      router.push("/dashboard/investor")
    }, 1000)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-normal text-gray-900">
                Full Name <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Enter your full name" className="h-12" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="nin"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-normal text-gray-900">
                NIN (National Identification Number) <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Enter your 11-digit NIN" className="h-12" maxLength={11} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-normal text-gray-900">
                Email Address <span className="text-red-500">*</span>
              </FormLabel>
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
              <FormLabel className="text-base font-normal text-gray-900">
                Password <span className="text-red-500">*</span>
              </FormLabel>
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

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-normal text-gray-900">Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="Enter your phone number (optional)" type="tel" className="h-12" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-4">
          <Button
            type="button"
            onClick={() => router.back()}
            variant="outline"
            className="h-12 px-8 font-medium text-base"
          >
            Back
          </Button>
          <Button
            type="submit"
            disabled={isLoading}
            className="flex-1 h-12 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-base transition-colors"
          >
            {isLoading ? "Registering..." : "Complete Registration"}
          </Button>
        </div>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-emerald-600 hover:text-emerald-700 transition-colors">
            Login
          </Link>
        </p>
      </form>
    </Form>
  )
}
