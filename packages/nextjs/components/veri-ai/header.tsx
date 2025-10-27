"use client"

import Link from "next/link"
import { Button } from "../ui/button"

export function Header() {
  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-linear-to-br from-primary to-accent rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">VERI</span>
          </div>
          <span className="font-bold text-lg text-foreground">VERI AI</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition">
            Home
          </Link>
          <Link href="/analyze" className="text-sm text-muted-foreground hover:text-foreground transition">
            Analyze
          </Link>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition">
            Docs
          </a>
        </nav>

        <Link href="/analyze">
          <Button className="bg-primary hover:bg-primary/90">Start Analysis</Button>
        </Link>
      </div>
    </header>
  )
}
