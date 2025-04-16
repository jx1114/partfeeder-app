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

  // Fine-tuned positions to match exact label locations
  const dimensionPositions: Record<string, { x: number; y: number }> = {
    A: { x: 15, y: 29 },
    B: { x: 20, y: 42 },
    C: { x: 19, y: 52 },
    D: { x: 29, y: 49.5 },
    E: { x: 34, y: 52 },
    F: { x: 19.5, y: 85 },
    G: { x: 41.5, y: 83 },
    H: { x: 18, y: 99 },
    I: { x: 43.5, y: 99 },
    J: { x: 43.5, y: 67 },
    K: { x: 31.5, y: 56 },
    L: { x: 59.5, y: 51 },
    M: { x: 30, y: 0 },
    N: { x: 32, y: 4 },
    O: { x: 42, y: 34 },
    P: { x: 45.5, y: 30 },
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
              transform: "translate(-50%, -50%)",
              pointerEvents: "auto" as const,
            }

            return (
              <div
                key={`dim-value-${dimension.id}`}
                className={`absolute bg-white dark:bg-gray-800 rounded-sm border cursor-pointer ${
                  activeDimension === dimension.id
                    ? "border-primary ring-1 ring-primary/50"
                    : isEmpty
                      ? "border-red-500 dark:border-red-400"
                      : "border-gray-300 dark:border-gray-600"
                }`}
                style={style}
                onClick={() => !isEditing && handleDimensionClick(dimension.id)}
              >
                {isEditing ? (
                  <div className="p-1">
                    <Input
                      type="number"
                      value={editValue}
                      onChange={handleInputChange}
                      onBlur={handleInputBlur}
                      onKeyDown={handleInputKeyDown}
                      className="w-12 h-6 text-xs p-1"
                      autoFocus
                    />
                  </div>
                ) : (
                  <div className="px-1.5 py-0.5 text-xs">
                    {isEmpty ? <span className="font-medium">{dimension.id}</span> : <span>{dimension.value} mm</span>}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
