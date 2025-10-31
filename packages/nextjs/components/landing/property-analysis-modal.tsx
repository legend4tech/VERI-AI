"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "~~/components/ui/dialog"
import { Button } from "~~/components/ui/button"
import { Badge } from "~~/components/ui/badge"
import { Progress } from "~~/components/ui/progress"
import {
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Loader2,
  MapPin,
  TrendingUp,
  Sparkles,
  Shield,
  FileText,
  ArrowRight,
} from "lucide-react"
import type { Property } from "~~/data/properties-data"
import { generateAnalysisData, loadingMessages, type AnalysisResult } from "~~/data/property-analysis-data"

interface PropertyAnalysisModalProps {
  property: Property | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function PropertyAnalysisModal({ property, open, onOpenChange }: PropertyAnalysisModalProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [currentMessage, setCurrentMessage] = useState(0)
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null)

  const startAnalysis = async () => {
    if (!property) return

    setIsAnalyzing(true)
    setAnalysisResult(null)
    setCurrentMessage(0)

    // Simulate AI analysis with realistic timing
    for (let i = 0; i < loadingMessages.length; i++) {
      setCurrentMessage(i)
      await new Promise((resolve) => setTimeout(resolve, 800 + Math.random() * 400))
    }

    // Generate and show results
    const result = generateAnalysisData(property)
    setAnalysisResult(result)
    setIsAnalyzing(false)
  }

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      setIsAnalyzing(false)
      setAnalysisResult(null)
      setCurrentMessage(0)
    }
    onOpenChange(newOpen)
  }

  const getRiskColor = (score: number) => {
    if (score >= 85) return "text-emerald-600"
    if (score >= 70) return "text-amber-600"
    return "text-red-600"
  }

  const getRiskGradient = (score: number) => {
    if (score >= 85) return "from-emerald-500 to-teal-600"
    if (score >= 70) return "from-amber-500 to-orange-600"
    return "from-red-500 to-rose-600"
  }

  const getRiskBg = (score: number) => {
    if (score >= 85) return "bg-linear-to-br from-emerald-50 to-teal-50"
    if (score >= 70) return "bg-linear-to-br from-amber-50 to-orange-50"
    return "bg-linear-to-br from-red-50 to-rose-50"
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-5xl max-h-[95vh] overflow-y-auto bg-linear-to-br from-slate-50 to-white border-slate-200 p-4 sm:p-6">
        <DialogHeader className="border-b border-slate-200 pb-4 sm:pb-6">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="p-1.5 sm:p-2 bg-linear-to-br from-emerald-500 to-teal-600 rounded-lg">
              <Sparkles className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
            </div>
            <DialogTitle className="text-xl sm:text-2xl lg:text-3xl font-bold bg-linear-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              {isAnalyzing ? "AI Analysis" : analysisResult ? "Analysis Complete" : "Property Intelligence"}
            </DialogTitle>
          </div>
        </DialogHeader>

        {!isAnalyzing && !analysisResult && property && (
          <div className="space-y-6 sm:space-y-8 py-2 sm:py-4">
            <div className="relative overflow-hidden border-2 border-slate-200 rounded-xl sm:rounded-2xl bg-white shadow-lg">
              <div className="absolute top-0 right-0 w-32 h-32 sm:w-64 sm:h-64 bg-linear-to-br from-emerald-100 to-teal-100 rounded-full blur-3xl opacity-30 -mr-16 sm:-mr-32 -mt-16 sm:-mt-32"></div>

              <div className="relative p-4 sm:p-6 lg:p-8">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
                  <div>
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-900 mb-2">{property.name}</h3>
                    <div className="flex items-center text-slate-600 gap-2">
                      <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 shrink-0" />
                      <span className="text-sm sm:text-base font-medium">{property.location}</span>
                    </div>
                  </div>
                  <Badge className="bg-linear-to-r from-emerald-500 to-teal-600 text-white border-0 px-3 py-1 sm:px-4 sm:py-2 text-sm sm:text-base w-fit">
                    ★ {property.rating}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
                  <div className="bg-linear-to-br from-slate-50 to-slate-100 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-slate-200">
                    <p className="text-[10px] sm:text-xs font-semibold text-slate-600 mb-1 sm:mb-2 uppercase tracking-wide">Total Value</p>
                    <p className="text-base sm:text-lg lg:text-xl font-bold text-slate-900">{property.totalValue}</p>
                  </div>
                  <div className="bg-linear-to-br from-emerald-50 to-teal-50 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-emerald-200">
                    <p className="text-[10px] sm:text-xs font-semibold text-emerald-700 mb-1 sm:mb-2 uppercase tracking-wide">APY</p>
                    <div className="flex items-center gap-1 sm:gap-2">
                      <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
                      <p className="text-base sm:text-lg lg:text-xl font-bold text-emerald-700">{property.apy}</p>
                    </div>
                  </div>
                  <div className="bg-linear-to-br from-slate-50 to-slate-100 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-slate-200">
                    <p className="text-[10px] sm:text-xs font-semibold text-slate-600 mb-1 sm:mb-2 uppercase tracking-wide">Min. Investment</p>
                    <p className="text-base sm:text-lg lg:text-xl font-bold text-slate-900">{property.minimumInvestment}</p>
                  </div>
                  <div className="bg-linear-to-br from-purple-50 to-indigo-50 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-purple-200">
                    <p className="text-[10px] sm:text-xs font-semibold text-purple-700 mb-1 sm:mb-2 uppercase tracking-wide">Status</p>
                    <p className="text-base sm:text-lg lg:text-xl font-bold text-purple-700">{property.status}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center py-8 sm:py-12 bg-linear-to-br from-white to-slate-50 rounded-xl sm:rounded-2xl border-2 border-dashed border-slate-300">
              <div className="mb-6 sm:mb-8">
                <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-linear-to-br from-emerald-500 to-teal-600 rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-xl shadow-emerald-200 animate-pulse">
                  <Shield className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2 sm:mb-3 px-4">AI-Powered Due Diligence</h3>
                <p className="text-slate-600 max-w-2xl mx-auto text-sm sm:text-base lg:text-lg leading-relaxed px-4">
                  Our advanced AI system will perform comprehensive analysis including blockchain verification, legal
                  document validation, market assessment, and risk evaluation in seconds.
                </p>
              </div>

              <div className="flex flex-col items-center gap-3 sm:gap-4 px-4">
                <Button
                  onClick={startAnalysis}
                  className="bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold px-8 sm:px-12 py-5 sm:py-6 lg:py-7 text-base sm:text-lg rounded-xl shadow-xl shadow-emerald-200 hover:shadow-2xl hover:shadow-emerald-300 transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
                >
                  <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
                  Start AI Analysis
                  <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 ml-2" />
                </Button>
                <p className="text-xs sm:text-sm text-slate-500">Analysis typically completes in 5-8 seconds</p>
              </div>
            </div>
          </div>
        )}

        {isAnalyzing && (
          <div className="py-12 sm:py-16 text-center space-y-6 sm:space-y-8">
            <div className="relative flex justify-center">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 sm:w-32 sm:h-32 bg-linear-to-br from-emerald-400 to-teal-500 rounded-full blur-2xl opacity-30 animate-pulse"></div>
              </div>
              <Loader2 className="w-16 h-16 sm:w-20 sm:h-20 text-emerald-600 animate-spin relative z-10" />
            </div>

            <div className="space-y-4 max-w-md mx-auto px-4">
              <div className="bg-white rounded-xl p-4 sm:p-6 border border-slate-200 shadow-lg">
                <p className="text-base sm:text-lg lg:text-xl font-bold text-slate-900 mb-2">{loadingMessages[currentMessage]}</p>
                <Progress value={((currentMessage + 1) / loadingMessages.length) * 100} className="h-2 sm:h-3 bg-slate-200" />
              </div>
              <p className="text-sm sm:text-base text-slate-600 font-medium">
                Step {currentMessage + 1} of {loadingMessages.length}
              </p>
            </div>
          </div>
        )}

        {analysisResult && property && (
          <div className="space-y-4 sm:space-y-6 py-2 sm:py-4">
            <div
              className={`relative overflow-hidden rounded-xl sm:rounded-2xl border-2 shadow-xl ${getRiskBg(analysisResult.riskScore)}`}
            >
              <div
                className={`absolute top-0 right-0 w-48 h-48 sm:w-96 sm:h-96 bg-linear-to-br ${getRiskGradient(analysisResult.riskScore)} rounded-full blur-3xl opacity-20 -mr-24 sm:-mr-48 -mt-24 sm:-mt-48`}
              ></div>

              <div className="relative p-4 sm:p-6 lg:p-8">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-0 mb-4 sm:mb-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                      <Shield className={`w-6 h-6 sm:w-8 sm:h-8 ${getRiskColor(analysisResult.riskScore)}`} />
                      <h3 className="text-xl sm:text-2xl font-bold text-slate-900">Risk Assessment</h3>
                    </div>
                    <Badge
                      className={`${getRiskColor(analysisResult.riskScore)} bg-white/50 border-0 px-3 py-1 sm:px-4 sm:py-1.5 text-sm sm:text-base font-bold`}
                    >
                      {analysisResult.riskCategory}
                    </Badge>
                  </div>
                  <div className="text-left sm:text-right">
                    <div className={`text-4xl sm:text-5xl lg:text-6xl font-black ${getRiskColor(analysisResult.riskScore)} mb-1`}>
                      {analysisResult.riskScore}
                    </div>
                    <p className="text-xs sm:text-sm font-semibold text-slate-600 uppercase tracking-wide">Risk Score</p>
                  </div>
                </div>
                <p className="text-slate-700 leading-relaxed text-sm sm:text-base lg:text-lg">{analysisResult.summary}</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 sm:mb-5 flex items-center gap-2">
                <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />
                Verification Results
              </h3>
              <div className="grid gap-3 sm:gap-4">
                {analysisResult.evidenceSummary.map((evidence, index) => (
                  <div
                    key={index}
                    className="group border-2 border-slate-200 rounded-lg sm:rounded-xl p-4 sm:p-6 bg-white hover:shadow-xl hover:border-emerald-300 transition-all duration-300"
                  >
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="mt-0.5 sm:mt-1 p-1.5 sm:p-2 rounded-lg bg-slate-50 group-hover:scale-110 transition-transform shrink-0">
                        {evidence.result === "Success" && <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />}
                        {evidence.result === "Failure" && <XCircle className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />}
                        {evidence.result === "Warning" && <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                          <h4 className="font-bold text-slate-900 text-base sm:text-lg">{evidence.source}</h4>
                          <Badge
                            className={`w-fit text-xs sm:text-sm ${
                              evidence.result === "Success"
                                ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-emerald-300"
                                : evidence.result === "Warning"
                                  ? "bg-amber-100 text-amber-700 hover:bg-amber-100 border-amber-300"
                                  : "bg-red-100 text-red-700 hover:bg-red-100 border-red-300"
                            }`}
                          >
                            {evidence.result}
                          </Badge>
                        </div>
                        <p className="text-slate-600 leading-relaxed text-sm sm:text-base">{evidence.detail}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative overflow-hidden border-2 border-emerald-200 rounded-xl sm:rounded-2xl bg-linear-to-br from-emerald-50 via-white to-teal-50 shadow-lg">
              <div className="absolute top-0 left-0 w-32 h-32 sm:w-64 sm:h-64 bg-linear-to-br from-emerald-300 to-teal-300 rounded-full blur-3xl opacity-20 -ml-16 sm:-ml-32 -mt-16 sm:-mt-32"></div>

              <div className="relative p-4 sm:p-6 lg:p-8">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600 animate-pulse" />
                    <span className="bg-linear-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                      reAI Intelligence Summary
                    </span>
                  </div>
                </h3>
                <p className="text-slate-700 leading-relaxed text-sm sm:text-base lg:text-lg mb-4 sm:mb-6">{analysisResult.aiSummary}</p>
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm">
                  <Badge className="border-2 border-emerald-600 text-emerald-700 bg-emerald-50 hover:bg-emerald-50 px-3 py-1 sm:px-4 sm:py-1.5 text-sm sm:text-base font-semibold">
                    {analysisResult.potentialRiskType}
                  </Badge>
                  <span className="text-slate-400">•</span>
                  <span className="text-slate-600 font-medium">
                    Analyzed {analysisResult.evidenceSummary.length} independent data sources
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4">
              <Button
                onClick={() => handleOpenChange(false)}
                variant="outline"
                className="w-full sm:flex-1 border-2 border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold py-5 sm:py-6 text-sm sm:text-base rounded-xl"
              >
                Close Analysis
              </Button>
              <Button className="w-full sm:flex-1 bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold py-5 sm:py-6 text-sm sm:text-base rounded-xl shadow-lg shadow-emerald-200 hover:shadow-xl hover:shadow-emerald-300 transition-all duration-300">
                Proceed to Investment
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}