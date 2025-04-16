"use client"

import { useState, type ChangeEvent } from "react"
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

  // Simple print function
  const handlePrint = () => {
    if (isPrinting) return

    setIsPrinting(true)

    try {
      // Add print styles
      const style = document.createElement("style")
      style.innerHTML = `
        @media print {
          @page { size: portrait; margin: 0.5cm; }
          body { 
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .no-print { display: none !important; }
        }
      `
      document.head.appendChild(style)

      // Set filename as title
      const originalTitle = document.title
      document.title = `Feeder_Configuration_${machineNo || "Report"}`

      // Print
      window.print()

      // Cleanup
      document.title = originalTitle
      document.head.removeChild(style)
    } catch (error) {
      console.error("Error printing:", error)
    } finally {
      setIsPrinting(false)
    }
  }

  return (
    <div className="mx-auto py-4 px-3 max-w-4xl print:p-0 print:max-w-none">
      <div className="flex justify-between items-center mb-3 no-print">
        <h1 className="text-xl font-bold">Feeder Configuration Tool</h1>
        <Button onClick={handlePrint} disabled={isPrinting} className="flex items-center gap-2 h-8 px-3 text-xs">
          <Download size={14} />
          {isPrinting ? "Preparing..." : "Save as PDF"}
        </Button>
      </div>

      <div className="grid gap-3 print:gap-2">
        {/* Machine Information - Made smaller */}
        <Card className="mb-2 shadow-sm">
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
                  className="flex h-7 w-full rounded-md border border-input bg-background px-2 py-1 text-xs"
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

        {/* Feeder Design - Made bigger */}
        <Card className="shadow-sm">
          <CardHeader className="py-1 px-3">
            <CardTitle className="text-sm">Feeder Design</CardTitle>
          </CardHeader>
          <CardContent className="p-2">
            <div className="h-[400px] print:h-[450px]">
              <FeederDesign
                dimensions={dimensions}
                activeDimension={activeDimension}
                onPartClick={handlePartClick}
                onDimensionChange={updateDimension}
              />
            </div>
          </CardContent>
        </Card>

        {/* Dimensions Summary - Made more compact */}
        <DimensionsSummary dimensions={dimensions} />
      </div>
    </div>
  )
}
