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

  const dimensionPositions: Record<string, { x: number; y: number }> = {
    A: { x: 3, y: 27 },
    B: { x: 5, y: 38 },
    C: { x: 6, y: 52 },
    D: { x: 24, y: 47 },
    E: { x: 33, y: 49 },
    F: { x: 7, y: 88 },
    G: { x: 40, y: 88 },
    H: { x: 11, y: 102 },
    I: { x: 43, y: 102 },
    J: { x: 43, y: 62 },
    K: { x: 27, y: 59 },
    L: { x: 62, y: 48 },
    M: { x: 22, y: -3 },
    N: { x: 38, y: 7 },
    O: { x: 40, y: 40 },
    P: { x: 46, y: 20 },
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
    <div className="w-full flex justify-center px-2">
      <div className="relative w-full max-w-[1000px]">
        {/* Image and overlays */}
        <div className="relative w-full">
          <Image
            src="/images/dimension-drawing.jpg"
            alt="Feeder Technical Drawing"
            width={1000}
            height={1000}
            className="w-full h-auto object-contain"
            priority
          />

          {/* Overlays */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            {dimensions.map((dimension) => {
              const position = dimensionPositions[dimension.id as keyof typeof dimensionPositions]
              if (!position) return null

              const isEditing = editingDimension === dimension.id

              const style = {
                left: `${position.x}%`,
                top: `${position.y}%`,
                transform: "translate(-50%, -50%)",
                pointerEvents: "auto" as const,
              }

              return (
                <div
                  key={`dim-value-${dimension.id}`}
                  className={`absolute bg-white dark:bg-gray-800 text-black dark:text-white px-1 py-0.5 sm:px-2 sm:py-1 rounded border text-[10px] sm:text-xs cursor-pointer ${
                    activeDimension === dimension.id ? "border-blue-500" : "border-gray-300"
                  }`}
                  style={style}
                  onClick={() => !isEditing && handleDimensionClick(dimension.id)}
                >
                  <div className="flex items-center gap-1">
                    <span className="font-semibold">{dimension.id}:</span>
                    {isEditing ? (
                      <Input
                        type="number"
                        value={editValue}
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                        onKeyDown={handleInputKeyDown}
                        className="w-14 h-6 text-[10px] sm:text-xs p-1"
                        autoFocus
                      />
                    ) : (
                      <span>{dimension.value ? `${dimension.value} mm` : "Click to edit"}</span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
