"use client"

import { useState } from "react"
import { Building2, ArrowLeft, ArrowRight } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "~~/components/ui/dialog"
import { Button } from "~~/components/ui/button"
import { Input } from "~~/components/ui/input"
import { Label } from "~~/components/ui/label"
import { Textarea } from "~~/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~~/components/ui/select"
import { toast } from "sonner"

interface AddPropertyModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddPropertyModal({ open, onOpenChange }: AddPropertyModalProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Step 1: Basic Info
    propertyName: "",
    propertyType: "",
    description: "",
    constructionStatus: "",
    address: "",
    city: "",
    state: "",
    // Step 2: Property Details
    size: "",
    bedrooms: "",
    bathrooms: "",
    amenities: "",
    // Step 3: Financial Info
    totalValue: "",
    minInvestment: "",
    apy: "",
    rentalYield: "",
    // Step 4: Geolocation
    latitude: "",
    longitude: "",
    // Step 5: Documents
    documents: "",
  })

  const steps = [
    { number: 1, title: "Basic Info" },
    { number: 2, title: "Property Details" },
    { number: 3, title: "Financial Info" },
    { number: 4, title: "Geolocation" },
    { number: 5, title: "Documents" },
  ]

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    toast.success("Property added successfully!", {
      description: "Your property has been listed for tokenization.",
    })
    onOpenChange(false)
    setCurrentStep(1)
    setFormData({
      propertyName: "",
      propertyType: "",
      description: "",
      constructionStatus: "",
      address: "",
      city: "",
      state: "",
      size: "",
      bedrooms: "",
      bathrooms: "",
      amenities: "",
      totalValue: "",
      minInvestment: "",
      apy: "",
      rentalYield: "",
      latitude: "",
      longitude: "",
      documents: "",
    })
  }

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-2xl">
            <Building2 className="h-6 w-6" />
            Add New Property
          </DialogTitle>
        </DialogHeader>

        {/* Step Indicator */}
        <div className="flex items-center justify-between mb-8 px-4">
          {steps.map((step, index) => (
            <div key={step.number} className="flex flex-col items-center flex-1">
              <div className="flex items-center w-full">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                    currentStep === step.number
                      ? "bg-emerald-600 text-white"
                      : currentStep > step.number
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {step.number}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-1 mx-2 transition-colors ${
                      currentStep > step.number ? "bg-emerald-600" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
              <p
                className={`text-sm mt-2 font-medium ${
                  currentStep === step.number ? "text-emerald-600" : "text-gray-600"
                }`}
              >
                {step.title}
              </p>
            </div>
          ))}
        </div>

        {/* Step 1: Basic Info */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="propertyName">Property Name *</Label>
                <Input
                  id="propertyName"
                  placeholder="e.g., Lagos Luxury Apartments"
                  value={formData.propertyName}
                  onChange={(e) => updateFormData("propertyName", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="propertyType">Property Type *</Label>
                <Select value={formData.propertyType} onValueChange={(value) => updateFormData("propertyType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select property type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="residential">Residential</SelectItem>
                    <SelectItem value="commercial">Commercial</SelectItem>
                    <SelectItem value="mixed">Mixed Use</SelectItem>
                    <SelectItem value="land">Land</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe the property..."
                rows={5}
                value={formData.description}
                onChange={(e) => updateFormData("description", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="constructionStatus">Construction Status *</Label>
              <Select
                value={formData.constructionStatus}
                onValueChange={(value) => updateFormData("constructionStatus", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="under-construction">Under Construction</SelectItem>
                  <SelectItem value="planned">Planned</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address *</Label>
              <Input
                id="address"
                placeholder="Street address"
                value={formData.address}
                onChange={(e) => updateFormData("address", e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  placeholder="e.g., Lagos"
                  value={formData.city}
                  onChange={(e) => updateFormData("city", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State *</Label>
                <Input
                  id="state"
                  placeholder="e.g., Lagos State"
                  value={formData.state}
                  onChange={(e) => updateFormData("state", e.target.value)}
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Property Details */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="size">Property Size (sq ft) *</Label>
                <Input
                  id="size"
                  type="number"
                  placeholder="e.g., 2500"
                  value={formData.size}
                  onChange={(e) => updateFormData("size", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bedrooms">Bedrooms</Label>
                <Input
                  id="bedrooms"
                  type="number"
                  placeholder="e.g., 3"
                  value={formData.bedrooms}
                  onChange={(e) => updateFormData("bedrooms", e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="bathrooms">Bathrooms</Label>
                <Input
                  id="bathrooms"
                  type="number"
                  placeholder="e.g., 2"
                  value={formData.bathrooms}
                  onChange={(e) => updateFormData("bathrooms", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="amenities">Amenities</Label>
              <Textarea
                id="amenities"
                placeholder="List property amenities (e.g., Swimming pool, Gym, Parking, Security...)"
                rows={5}
                value={formData.amenities}
                onChange={(e) => updateFormData("amenities", e.target.value)}
              />
            </div>
          </div>
        )}

        {/* Step 3: Financial Info */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="totalValue">Total Property Value (STRK) *</Label>
                <Input
                  id="totalValue"
                  type="number"
                  placeholder="e.g., 5000"
                  value={formData.totalValue}
                  onChange={(e) => updateFormData("totalValue", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="minInvestment">Minimum Investment (STRK) *</Label>
                <Input
                  id="minInvestment"
                  type="number"
                  placeholder="e.g., 50"
                  value={formData.minInvestment}
                  onChange={(e) => updateFormData("minInvestment", e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="apy">Annual Percentage Yield (APY) *</Label>
                <Input
                  id="apy"
                  placeholder="e.g., 8.5%"
                  value={formData.apy}
                  onChange={(e) => updateFormData("apy", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rentalYield">Expected Rental Yield</Label>
                <Input
                  id="rentalYield"
                  placeholder="e.g., 6.2%"
                  value={formData.rentalYield}
                  onChange={(e) => updateFormData("rentalYield", e.target.value)}
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Geolocation */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="latitude">Latitude</Label>
                <Input
                  id="latitude"
                  placeholder="e.g., 6.5244"
                  value={formData.latitude}
                  onChange={(e) => updateFormData("latitude", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="longitude">Longitude</Label>
                <Input
                  id="longitude"
                  placeholder="e.g., 3.3792"
                  value={formData.longitude}
                  onChange={(e) => updateFormData("longitude", e.target.value)}
                />
              </div>
            </div>
            <p className="text-sm text-gray-600">
              Enter the geographic coordinates of the property for map display. You can find these using Google Maps or
              similar services.
            </p>
          </div>
        )}

        {/* Step 5: Documents */}
        {currentStep === 5 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="documents">Property Documents</Label>
              <Textarea
                id="documents"
                placeholder="List or upload property documents (e.g., Title deed, Survey plan, Building permit...)"
                rows={8}
                value={formData.documents}
                onChange={(e) => updateFormData("documents", e.target.value)}
              />
            </div>
            <p className="text-sm text-gray-600">
              Upload or list all relevant property documents. These will be available to potential investors for
              verification.
            </p>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between pt-6 border-t">
          <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 1} className="bg-transparent">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          {currentStep < 5 ? (
            <Button onClick={handleNext} className="bg-emerald-600 hover:bg-emerald-700 text-white">
              Next
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} className="bg-emerald-600 hover:bg-emerald-700 text-white">
              Submit Property
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
