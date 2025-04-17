"use client"

import { useState, type ChangeEvent, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import FeederDesign from "@/components/feeder-design"
import DimensionsSummary from "@/components/dimensions-summary"

// Define the dimension type
type Dimension = {
  id: string
  label: string
  value: string
  description: string
}

export default function FeederConfigPage() {
  // Initial dimensions with empty values
  const [dimensions, setDimensions] = useState<Dimension[]>([
    { id: "A", label: "A", value: "", description: "Height" },
    { id: "B", label: "B", value: "", description: "Linear track length" },
    { id: "C", label: "C", value: "", description: "Base height" },
    { id: "D", label: "D", value: "", description: "Track width" },
    { id: "E", label: "E", value: "", description: "Base width" },
    { id: "F", label: "F", value: "", description: "Actuator height" },
    { id: "G", label: "G", value: "", description: "Total height" },
    { id: "H", label: "H", value: "", description: "Floor clearance" },
    { id: "I", label: "I", value: "", description: "Base depth" },
    { id: "J", label: "J", value: "", description: "Hopper height" },
    { id: "K", label: "K", value: "", description: "Hopper width" },
    { id: "L", label: "L", value: "", description: "Total width" },
    { id: "M", label: "M", value: "", description: "Top width" },
    { id: "N", label: "N", value: "", description: "Inner width" },
    { id: "O", label: "O", value: "", description: "Bowl height" },
    { id: "P", label: "P", value: "", description: "Total height with bowl" },
  ])

  const [activeDimension, setActiveDimension] = useState<string | null>(null)
  const [machineNo, setMachineNo] = useState("")
  const [rotation, setRotation] = useState("Clockwise")
  const [uph, setUph] = useState("")
  const [isPrinting, setIsPrinting] = useState(false)
  const a4ContainerRef = useRef<HTMLDivElement>(null)

  // Update dimension value
  const updateDimension = (id: string, value: string) => {
    setDimensions(dimensions.map((dim) => (dim.id === id ? { ...dim, value } : dim)))
  }

  // Handle click on feeder part
  const handlePartClick = (id: string) => {
    setActiveDimension(id)
  }

  // Handle input changes with proper type annotations
  const handleMachineNoChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMachineNo(e.target.value)
  }

  const handleRotationChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setRotation(e.target.value)
  }

  const handleUphChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUph(e.target.value)
  }

  // Print function
  const handlePrint = () => {
    if (isPrinting) return

    setIsPrinting(true)

    try {
      // Set filename as title
      const originalTitle = document.title
      document.title = `Feeder_Configuration_${machineNo || "Report"}`

      // Print
      window.print()

      // Cleanup
      document.title = originalTitle
    } catch (error) {
      console.error("Error printing:", error)
    } finally {
      setIsPrinting(false)
    }
  }

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-100 dark:bg-gray-900 p-4 print:p-0 print:bg-white">
      {/* Controls outside the A4 container - only visible on screen */}
      <div className="fixed top-4 right-4 z-10 no-print">
        <Button onClick={handlePrint} disabled={isPrinting} className="flex items-center gap-2 h-8 px-3 text-xs">
          <Download size={14} />
          {isPrinting ? "Preparing..." : "Save as PDF"}
        </Button>
      </div>

      {/* A4 Container */}
      <div
        ref={a4ContainerRef}
        className="a4-container bg-white dark:bg-gray-800 shadow-lg print:shadow-none overflow-hidden"
      >
        <div className="a4-content p-[10mm]">
          {/* Page Title */}
          <h1 className="text-xl font-bold text-center mb-4">Feeder Configuration Report</h1>

          <div className="grid gap-4 print:gap-4">
            {/* Machine Information */}
            <Card className="shadow-sm">
              <CardHeader className="py-1 px-3">
                <CardTitle className="text-sm">Machine Information</CardTitle>
              </CardHeader>
              <CardContent className="py-2 px-3">
                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-0">
                    <Label htmlFor="machine-no" className="text-xs">
                      Machine no.
                    </Label>
                    <Input id="machine-no" value={machineNo} onChange={handleMachineNoChange} className="h-7 text-xs" />
                  </div>
                  <div className="space-y-0">
                    <Label htmlFor="rotation" className="text-xs">
                      Rotation
                    </Label>
                    <select
                      id="rotation"
                      className="flex h-7 w-full rounded-md border border-input bg-background px-2 py-0 text-xs"
                      value={rotation}
                      onChange={handleRotationChange}
                    >
                      <option value="Clockwise">Clockwise</option>
                      <option value="Anti-clockwise">Anti-clockwise</option>
                    </select>
                  </div>
                  <div className="space-y-0">
                    <Label htmlFor="uph" className="text-xs">
                      UPH
                    </Label>
                    <Input id="uph" value={uph} onChange={handleUphChange} className="h-7 text-xs" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Feeder Design */}
            <Card className="shadow-sm">
              <CardHeader className="py-1 px-3">
                <CardTitle className="text-sm">Feeder Design</CardTitle>
              </CardHeader>
              <CardContent className="p-2">
                <div className="h-[350px] print:h-[350px]">
                  <FeederDesign
                    dimensions={dimensions}
                    activeDimension={activeDimension}
                    onPartClick={handlePartClick}
                    onDimensionChange={updateDimension}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Dimensions Summary */}
            <DimensionsSummary dimensions={dimensions} />
          </div>

          {/* Footer with timestamp */}
          <div className="mt-4 text-center text-xs text-gray-500">
            <p>
              Generated on {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
