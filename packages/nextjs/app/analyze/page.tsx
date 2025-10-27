"use client"

import { useState } from "react"
import { AnalysisInput } from "~~/components/veri-ai/analysis-input"
import { AnalysisResults } from "~~/components/veri-ai/analysis-results"
import { Footer } from "~~/components/veri-ai/footer"
import { Header } from "~~/components/veri-ai/header"
import { AnalysisData, mockAnalysisData } from "~~/data/mock-data"



export default function AnalyzePage() {
  const [tokenId, setTokenId] = useState<string>("")
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null)
  const [loading, setLoading] = useState(false)

  const handleAnalyze = async (id: string) => {
    setTokenId(id)
    setLoading(true)

    // Simulate API call delay
    setTimeout(() => {
      setAnalysisData(mockAnalysisData)
      setLoading(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {!analysisData ? (
            <AnalysisInput onAnalyze={handleAnalyze} loading={loading} />
          ) : (
            <AnalysisResults data={analysisData} onNewAnalysis={() => setAnalysisData(null)} />
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
