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
import { Checkbox } from "~~/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "~~/components/ui/radio-group"
import { toast } from "sonner"

// Fixed schema - remove required_error from z.enum
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  userType: z.enum(["investor", "realtor"], {
    required_error: "Please select your account type", // This is the correct way
  }),
  rememberMe: z.boolean().optional(),
})
type LoginFormValues = z.infer<typeof loginSchema>

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

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
    console.log("[v0] Login form submitted:", data)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)

    toast.success("Login successful! Welcome back", {
      description: "Redirecting to your dashboard...",
    })

    setTimeout(() => {
      if (data.userType === "investor") {
        router.push("/dashboard/investor")
      } else {
        router.push("/dashboard/realtor")
      }
    }, 1000)
  }

  return (
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

        <FormField
          control={form.control}
          name="userType"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="text-base font-normal text-gray-900">
                I am signing in as <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-4">
                  <div className="flex items-center space-x-2 flex-1">
                    <RadioGroupItem value="investor" id="investor" />
                    <label
                      htmlFor="investor"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      Investor
                    </label>
                  </div>
                  <div className="flex items-center space-x-2 flex-1">
                    <RadioGroupItem value="realtor" id="realtor" />
                    <label
                      htmlFor="realtor"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      Realtor
                    </label>
                  </div>
                </RadioGroup>
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
  )
}
