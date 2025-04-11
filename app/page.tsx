"use client"

import { useState, type ChangeEvent } from "react"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import FeederDesign from "../components/feeder-design"
import DimensionsSummary from "../components/dimensions-summary"

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

  return (
    <div className="container mx-auto py-8 max-w-6xl">
      <h1 className="text-3xl font-bold mb-8 text-center">Feeder Configuration Tool</h1>

      <div className="grid md:grid-cols-1 gap-8">
        {/* Machine Information */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Machine Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="machine-no">Machine no.</Label>
                <Input id="machine-no" value={machineNo} onChange={handleMachineNoChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rotation">Rotation</Label>
                <select
                  id="rotation"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={rotation}
                  onChange={handleRotationChange}
                >
                  <option value="Clockwise">Clockwise</option>
                  <option value="Anti-clockwise">Anti-clockwise</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="uph">UPH</Label>
                <Input id="uph" value={uph} onChange={handleUphChange} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Feeder Design */}
        <Card>
          <CardHeader>
            <CardTitle>Feeder Design</CardTitle>
          </CardHeader>
          <CardContent className="h-[800px]">
            <FeederDesign
              dimensions={dimensions}
              activeDimension={activeDimension}
              onPartClick={handlePartClick}
              onDimensionChange={updateDimension}
            />
          </CardContent>
        </Card>

        {/* Dimensions Summary */}
        <DimensionsSummary dimensions={dimensions} />
      </div>
    </div>
  )
}
