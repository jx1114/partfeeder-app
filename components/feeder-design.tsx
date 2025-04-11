"use client"
import Image from "next/image"
import { useState, type ChangeEvent, type KeyboardEvent } from "react"
import { Input } from "../components/ui/input"

type Dimension = {
  id: string
  label: string
  value: string
  description: string
}

type FeederDesignProps = {
  dimensions: Dimension[]
  activeDimension: string | null
  onPartClick: (id: string) => void
  onDimensionChange: (id: string, value: string) => void
}

export default function FeederDesign({
  dimensions,
  activeDimension,
  onPartClick,
  onDimensionChange,
}: FeederDesignProps) {
  const [editingDimension, setEditingDimension] = useState<string | null>(null)
  const [editValue, setEditValue] = useState("")

  // Define the positions for the editable dimension values
  // These are positioned more precisely beside the dimension lines
  const dimensionPositions = {
    A: { x: 30, y: 190 },
    B: { x: 20, y: 350 },
    C: { x: 60, y: 410 },
    D: { x: 220, y: 350 },
    E: { x: 300, y: 375 },
    F: { x: 40, y: 680 },
    G: { x: 350, y: 660 },
    H: { x: 60, y: 780 },
    I: { x: 400, y: 780 },
    J: { x: 400, y: 480 },
    K: { x: 370, y: 414 },
    L: { x: 650, y: 360 },
    M: { x: 220, y: -30 },
    N: { x: 380, y: 50 },
    O: { x: 400, y: 300 },
    P: { x: 500, y: 230 },
  }

  const handleDimensionClick = (id: string) => {
    const dimension = dimensions.find((d) => d.id === id)
    if (dimension) {
      setEditingDimension(id)
      setEditValue(dimension.value)
      onPartClick(id)
    }
  }

  const handleInputBlur = () => {
    if (editingDimension && editValue) {
      onDimensionChange(editingDimension, editValue)
    }
    setEditingDimension(null)
  }

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (editingDimension && editValue) {
        onDimensionChange(editingDimension, editValue)
      }
      setEditingDimension(null)
    }
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEditValue(e.target.value)
  }

  return (
    <div className="relative w-full h-full">
      <div className="relative w-full h-full">
        <Image
          src="/images/dimension-drawing.jpg"
          alt="Feeder Technical Drawing"
          width={1000}
          height={1000}
          className="w-full h-auto object-contain"
          priority
        />
      </div>

      {/* Dimension value overlays - positioned more accurately beside dimension lines */}
      <div className="absolute top-0 left-0 w-full h-full">
        {dimensions.map((dimension) => {
          const position = dimensionPositions[dimension.id as keyof typeof dimensionPositions]
          if (!position) return null

          const isEditing = editingDimension === dimension.id

          // Position the dimension value beside its corresponding dimension line
          const style = {
            left: `${position.x}px`,
            top: `${position.y}px`,
            pointerEvents: "auto" as const,
          }

          return (
            <div
              key={`dim-value-${dimension.id}`}
              className={`absolute bg-white/90 px-2 py-1 rounded border cursor-pointer ${
                activeDimension === dimension.id ? "border-primary" : "border-gray-300"
              }`}
              style={style}
              onClick={() => !isEditing && handleDimensionClick(dimension.id)}
            >
              <div className="flex items-center gap-1">
                <span className="font-medium text-xs">{dimension.id}:</span>
                {isEditing ? (
                  <Input
                    type="number"
                    value={editValue}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    onKeyDown={handleInputKeyDown}
                    className="w-16 h-6 text-xs p-1"
                    autoFocus
                  />
                ) : (
                  <span className="text-xs">{dimension.value ? `${dimension.value} mm` : "Click to edit"}</span>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
