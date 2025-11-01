import { auth } from "~~/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth
  const userRole = req.auth?.user?.role

  const isOnDashboard = nextUrl.pathname.startsWith("/dashboard")
  const isOnInvestorDashboard = nextUrl.pathname.startsWith("/dashboard/investor")
  const isOnRealtorDashboard = nextUrl.pathname.startsWith("/dashboard/realtor")
  const isOnLoginPage = nextUrl.pathname === "/login"
  const isOnSignupPage = nextUrl.pathname.startsWith("/signup")

  // Allow access to login and signup pages
  if (isOnLoginPage || isOnSignupPage) {
    if (isLoggedIn) {
      const dashboardUrl = userRole === "realtor" ? "/dashboard/realtor" : "/dashboard/investor"
      return NextResponse.redirect(new URL(dashboardUrl, nextUrl))
    }
    return NextResponse.next()
  }

  // Protect dashboard routes
  if (isOnDashboard) {
    if (!isLoggedIn) {
      const loginUrl = new URL("/login", nextUrl)
      loginUrl.searchParams.set("callbackUrl", nextUrl.pathname)
      return NextResponse.redirect(loginUrl)
    }

    if (isOnInvestorDashboard && userRole !== "investor") {
      return NextResponse.redirect(new URL("/dashboard/realtor", nextUrl))
    }

    if (isOnRealtorDashboard && userRole !== "realtor") {
      return NextResponse.redirect(new URL("/dashboard/investor", nextUrl))
    }
  }

  return NextResponse.next()
})

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/signup/:path*"],
}
