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

  // Fine-tuned positions as percentages for responsive positioning
  const dimensionPositions: Record<string, { x: number; y: number }> = {
    A: { x: 20, y: 29.5 },
    B: { x: 24, y: 42 },
    C: { x: 23, y: 51.5 },
    D: { x: 31.7, y: 49.5 },
    E: { x: 36, y: 52 },
    F: { x: 23.8, y: 85 },
    G: { x: 42.5, y: 83.5 },
    H: { x: 23, y: 98.5 },
    I: { x: 43.5, y: 99 },
    J: { x: 44.5, y: 67.5 },
    K: { x: 34.3, y: 55.8 },
    L: { x: 58, y: 51.5 },
    M: { x: 32.5, y: 1 },
    N: { x: 34.5, y: 4 },
    O: { x: 43, y: 34 },
    P: { x: 46, y: 29.5 },
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
    <div className="w-full h-full flex justify-center">
      {/* Force horizontal aspect ratio container */}
      <div className="relative w-full h-full">
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

            // Make filled buttons much smaller, showing only the number
            if (!isEmpty && !isEditing) {
              return (
                <div
                  key={`dim-value-${dimension.id}`}
                  className={`absolute bg-white dark:bg-gray-800 rounded-sm border cursor-pointer text-center ${
                    activeDimension === dimension.id
                      ? "border-primary ring-1 ring-primary/50"
                      : "border-gray-300 dark:border-gray-600"
                  }`}
                  style={{
                    ...style,
                    minWidth: "16px",
                    height: "16px",
                    padding: "0px",
                    fontSize: "9px",
                    lineHeight: "16px",
                  }}
                  onClick={() => handleDimensionClick(dimension.id)}
                >
                  {dimension.value}
                </div>
              )
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
                      className="w-10 h-5 text-xs p-1"
                      autoFocus
                    />
                  </div>
                ) : (
                  <div className="px-1 py-0.5 text-[9px]">
                    <span className="font-medium">{dimension.id}</span>
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
