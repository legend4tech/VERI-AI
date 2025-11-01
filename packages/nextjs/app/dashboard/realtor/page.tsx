"use client"

import { redirect } from "next/navigation"
import { auth } from "~~/auth"
import { RealtorDashboardClient } from "~~/components/realtor-dashboard/realtor-dashboard-client"

export default async function RealtorDashboard() {
  const session = await auth()

  if (!session?.user) {
    redirect("/login")
  }

  if (session.user.role !== "realtor") {
    redirect("/dashboard/investor")
  }

  const userName = session.user.name || "Realtor"

  return <RealtorDashboardClient userName={userName} />
}
