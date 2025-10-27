"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"

interface AnalysisInputProps {
  onAnalyze: (tokenId: string) => void
  loading: boolean
}

export function AnalysisInput({ onAnalyze, loading }: AnalysisInputProps) {
  const [tokenId, setTokenId] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (tokenId.trim()) {
      onAnalyze(tokenId)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-4">Analyze an Asset</h1>
        <p className="text-lg text-muted-foreground">Enter a token ID to get a comprehensive risk assessment</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="tokenId" className="block text-sm font-medium text-foreground">
            Token ID
          </label>
          <Input
            id="tokenId"
            placeholder="Enter token ID (e.g., 1, 2, 3...)"
            value={tokenId}
            onChange={(e) => setTokenId(e.target.value)}
            disabled={loading}
            className="text-base"
          />
          <p className="text-xs text-muted-foreground">Try: 1, 2, 3, 4, or 5 for demo data</p>
        </div>

        <Button
          type="submit"
          size="lg"
          className="w-full bg-primary hover:bg-primary/90"
          disabled={loading || !tokenId.trim()}
        >
          {loading ? "Analyzing..." : "Analyze Asset"}
        </Button>
      </form>

      <div className="mt-12 p-6 rounded-lg bg-card border border-border">
        <h3 className="font-semibold text-foreground mb-4">How it works:</h3>
        <ol className="space-y-3 text-sm text-muted-foreground">
          <li className="flex gap-3">
            <span className="font-bold text-primary">1.</span>
            <span>Enter a token ID from the Starknet blockchain</span>
          </li>
          <li className="flex gap-3">
            <span className="font-bold text-primary">2.</span>
            <span>Our system retrieves the asset metadata on-chain</span>
          </li>
          <li className="flex gap-3">
            <span className="font-bold text-primary">3.</span>
            <span>AI analyzes the asset data for potential risks</span>
          </li>
          <li className="flex gap-3">
            <span className="font-bold text-primary">4.</span>
            <span>You receive a detailed risk assessment report</span>
          </li>
        </ol>
      </div>
    </div>
  )
}
