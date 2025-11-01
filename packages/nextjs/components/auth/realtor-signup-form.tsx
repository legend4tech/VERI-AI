"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Eye, EyeOff, Upload } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "~~/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~~/components/ui/form"
import { Input } from "~~/components/ui/input"
import { toast } from "sonner"
import { registerUser } from "~~/app/actions/auth"
import { signOut } from "next-auth/react"
import { GoogleSignInButton } from "./google-signin-button"


const MAX_FILE_SIZE = 5 * 1024 * 1024
const ACCEPTED_FILE_TYPES = ["image/png", "image/jpeg", "image/jpg", "application/pdf"]

const realtorSignupSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  phone: z.string().optional(),
  businessName: z.string().min(2, "Business name must be at least 2 characters"),
  governmentId: z
    .instanceof(FileList)
    .refine((files) => files.length > 0, "Government ID is required")
    .refine((files) => files[0]?.size <= MAX_FILE_SIZE, "File size must be less than 5MB")
    .refine((files) => ACCEPTED_FILE_TYPES.includes(files[0]?.type), "Only PNG, JPG, or PDF files are accepted"),
  companyDocument: z
    .instanceof(FileList)
    .refine((files) => files.length > 0, "Company document is required")
    .refine((files) => files[0]?.size <= MAX_FILE_SIZE, "File size must be less than 5MB")
    .refine((files) => ACCEPTED_FILE_TYPES.includes(files[0]?.type), "Only PNG, JPG, or PDF files are accepted"),
})

type RealtorSignupFormValues = z.infer<typeof realtorSignupSchema>

export function RealtorSignupForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const form = useForm<RealtorSignupFormValues>({
    resolver: zodResolver(realtorSignupSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      phone: "",
      businessName: "",
    },
  })

  async function onSubmit(data: RealtorSignupFormValues) {
    setIsLoading(true)

    await signOut({ redirect: false })

    const result = await registerUser({
      name: data.fullName,
      email: data.email,
      password: data.password,
      role: "realtor",
      phone: data.phone,
      businessName: data.businessName,
    })

    if (result.error) {
      toast.error(result.error)
      setIsLoading(false)
      return
    }

    toast.success("Registration successful! Please login.", {
      description: "Redirecting to login page...",
    })

    setTimeout(() => {
      router.push("/login")
    }, 1000)
    setIsLoading(false)
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
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm sm:text-base font-normal text-gray-900">
                  Full Name <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Enter your full name" className="h-11 sm:h-12" {...field} />
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
                <FormLabel className="text-sm sm:text-base font-normal text-gray-900">
                  Email Address <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" type="email" className="h-11 sm:h-12" {...field} />
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
                <FormLabel className="text-sm sm:text-base font-normal text-gray-900">
                  Password <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="Enter your password"
                      type={showPassword ? "text" : "password"}
                      className="h-11 sm:h-12 pr-10"
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
                <FormLabel className="text-sm sm:text-base font-normal text-gray-900">Phone Number</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your phone number (optional)"
                    type="tel"
                    className="h-11 sm:h-12"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="businessName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm sm:text-base font-normal text-gray-900">
                  Business Name or Company
                </FormLabel>
                <FormControl>
                  <Input placeholder="Your company name" className="h-11 sm:h-12" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="governmentId"
            render={({ field: { value, onChange, ...fieldProps } }) => (
              <FormItem>
                <FormLabel className="text-sm sm:text-base font-normal text-gray-900">
                  Upload Government-issued ID <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 sm:p-8 text-center hover:border-emerald-500 transition-colors cursor-pointer">
                    <input
                      type="file"
                      accept=".png,.jpg,.jpeg,.pdf"
                      className="hidden"
                      id="governmentId"
                      onChange={(e) => onChange(e.target.files)}
                      {...fieldProps}
                    />
                    <label htmlFor="governmentId" className="cursor-pointer flex flex-col items-center gap-2">
                      <Upload className="h-8 w-8 sm:h-10 sm:w-10 text-gray-400" />
                      <p className="text-sm sm:text-base text-gray-600 font-medium">Click to upload ID document</p>
                      <p className="text-xs sm:text-sm text-gray-500">PNG, JPG or PDF (MAX. 5MB)</p>
                      {value && value.length > 0 && (
                        <p className="text-xs sm:text-sm text-emerald-600 font-medium mt-2 break-all px-2">
                          {value[0].name}
                        </p>
                      )}
                    </label>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="companyDocument"
            render={({ field: { value, onChange, ...fieldProps } }) => (
              <FormItem>
                <FormLabel className="text-sm sm:text-base font-normal text-gray-900">
                  Upload Company Document (CAC or License) <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 sm:p-8 text-center hover:border-emerald-500 transition-colors cursor-pointer">
                    <input
                      type="file"
                      accept=".png,.jpg,.jpeg,.pdf"
                      className="hidden"
                      id="companyDocument"
                      onChange={(e) => onChange(e.target.files)}
                      {...fieldProps}
                    />
                    <label htmlFor="companyDocument" className="cursor-pointer flex flex-col items-center gap-2">
                      <Upload className="h-8 w-8 sm:h-10 sm:w-10 text-gray-400" />
                      <p className="text-sm sm:text-base text-gray-600 font-medium">Click to upload company document</p>
                      <p className="text-xs sm:text-sm text-gray-500">PNG, JPG or PDF (MAX. 5MB)</p>
                      {value && value.length > 0 && (
                        <p className="text-xs sm:text-sm text-emerald-600 font-medium mt-2 break-all px-2">
                          {value[0].name}
                        </p>
                      )}
                    </label>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
            <Button
              type="button"
              onClick={() => router.back()}
              variant="outline"
              className="h-11 sm:h-12 px-6 sm:px-8 font-medium text-sm sm:text-base order-2 sm:order-1"
            >
              Back
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="flex-1 h-11 sm:h-12 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm sm:text-base transition-colors order-1 sm:order-2"
            >
              {isLoading ? "Registering..." : "Complete Registration"}
            </Button>
          </div>

          <p className="text-center text-xs sm:text-sm text-gray-600 pt-2">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-emerald-600 hover:text-emerald-700 transition-colors">
              Login
            </Link>
          </p>
        </form>
      </Form>
    </div>
  )
}