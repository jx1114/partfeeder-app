"use client"
import Image from "next/image"
import { useState, type ChangeEvent, type KeyboardEvent } from "react"
import { Input } from "@/components/ui/input"

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

  // Define positions as percentages for responsive positioning
  const dimensionPositions: Record<string, { x: number; y: number }> = {
    A: { x: 12, y: 27 },
    B: { x: 10, y: 40 },
    C: { x: 18, y: 56 },
    D: { x: 32, y: 44 },
    E: { x: 36, y: 49 },
    F: { x: 15, y: 85 },
    G: { x: 42, y: 79 },
    H: { x: 14, y: 98 },
    I: { x: 48, y: 100 },
    J: { x: 44, y: 62 },
    K: { x: 32, y: 60 },
    L: { x: 60, y: 46 },
    M: { x: 32, y: -4 },
    N: { x: 44, y: 4 },
    O: { x: 42, y: 40 },
    P: { x: 50, y: 33 },
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
    <div className="w-full flex justify-center">
      {/* Force horizontal aspect ratio container */}
      <div className="relative w-full" style={{ aspectRatio: "16/9", maxHeight: "500px" }}>
        <Image
          src="/images/dimension-drawing.jpg"
          alt="Feeder Technical Drawing"
          fill
          className="object-contain"
          priority
        />

        {/* Dimension overlays */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          {dimensions.map((dimension) => {
            const position = dimensionPositions[dimension.id as keyof typeof dimensionPositions]
            if (!position) return null

            const isEditing = editingDimension === dimension.id
            const isEmpty = !dimension.value

            const style = {
              left: `${position.x}%`,
              top: `${position.y}%`,
              minWidth: "40px", // Smaller minimum width
              padding: "2px 4px", // Reduced padding
              fontSize: "10px", // Smaller font size
              pointerEvents: "auto" as const,
            }

            return (
              <div
                key={`dim-value-${dimension.id}`}
                className={`absolute bg-white/90 dark:bg-gray-800/90 rounded border transform -translate-x-1/2 -translate-y-1/2 cursor-pointer ${
                  activeDimension === dimension.id
                    ? "border-primary ring-1 ring-primary/50"
                    : isEmpty
                      ? "border-red-500 dark:border-red-400"
                      : "border-gray-300 dark:border-gray-600"
                }`}
                style={style}
                onClick={() => !isEditing && handleDimensionClick(dimension.id)}
              >
                <div className="flex items-center gap-1">
                  <span className="font-medium">{dimension.id}:</span>
                  {isEditing ? (
                    <Input
                      type="number"
                      value={editValue}
                      onChange={handleInputChange}
                      onBlur={handleInputBlur}
                      onKeyDown={handleInputKeyDown}
                      className="w-12 h-6 text-xs p-1"
                      style={{ minWidth: "40px", fontSize: "10px" }}
                      autoFocus
                    />
                  ) : (
                    <span className={isEmpty ? "text-red-500 dark:text-red-400" : ""}>
                      {isEmpty ? " " : `${dimension.value} mm`}
                    </span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
