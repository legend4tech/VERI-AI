"use server"

import bcrypt from "bcryptjs"
import { z } from "zod"
import { getDb } from "~~/lib/mongodb"

export async function verifyCredentials(email: string, password: string) {
  try {
    const parsedCredentials = z
      .object({ email: z.string().email(), password: z.string().min(6) })
      .safeParse({ email, password })

    if (!parsedCredentials.success) {
      return { success: false, error: "Invalid credentials format" }
    }

    const db = await getDb()
    const user = await db.collection("users").findOne({ email })

    if (!user || !user.password) {
      return { success: false, error: "Invalid credentials" }
    }

    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
      return { success: false, error: "Invalid credentials" }
    }

    return {
      success: true,
      user: {
        id: user._id.toString(),
        email: user.email,
        name: user.name,
        role: user.role || "investor",
      },
    }
  } catch (error) {
    console.error("[v0] Credential verification error:", error)
    return { success: false, error: "Authentication failed" }
  }
}
