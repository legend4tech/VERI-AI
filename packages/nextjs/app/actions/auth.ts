"use server"

import { signIn, signOut } from "~~/auth"
import { hash } from "bcryptjs"
import { AuthError } from "next-auth"
import { getDb } from "~~/lib/mongodb"

export async function registerUser(formData: {
  name: string
  email: string
  password: string
  role: "investor" | "realtor"
  phone?: string
  nin?: string
  businessName?: string
}) {
  try {
    const db = await getDb()

    const existingUser = await db.collection("users").findOne({
      email: formData.email,
    })

    if (existingUser) {
      return { error: "User with this email already exists" }
    }

    const hashedPassword = await hash(formData.password, 12)

    const result = await db.collection("users").insertOne({
      name: formData.name,
      email: formData.email,
      password: hashedPassword,
      role: formData.role,
      phone: formData.phone || null,
      nin: formData.nin || null,
      businessName: formData.businessName || null,
      createdAt: new Date(),
    })

    if (!result.insertedId) {
      return { error: "Failed to create user" }
    }

    return { success: true }
  } catch (error) {
    console.error("Registration error:", error)
    return { error: "An error occurred during registration" }
  }
}

export async function loginUser(email: string, password: string) {
  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    })

    return { success: true }
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid email or password" }
        default:
          return { error: "An error occurred during login" }
      }
    }
    throw error
  }
}

export async function logoutUser() {
  await signOut({ redirectTo: "/" })
}
