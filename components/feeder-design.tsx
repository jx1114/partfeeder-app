"use client"
import Image from "next/image"
import { useState, useEffect, useRef, type ChangeEvent, type KeyboardEvent } from "react"
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
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 })

  // Original positions based on 1000x1000 image
  const originalPositions: Record<string, { x: number; y: number }> = {
    A: { x: 110, y: 290 },
    B: { x: 150, y: 420 },
    C: { x: 140, y: 513 },
    D: { x: 255, y: 498 },
    E: { x: 315, y: 525 },
    F: { x: 150, y: 850 },
    G: { x: 400, y: 835 },
    H: { x: 140, y: 990 },
    I: { x: 420, y: 985 },
    J: { x: 425, y: 675 },
    K: { x: 290, y: 550 },
    L: { x: 610, y: 515 },
    M: { x: 270, y: 15 },
    N: { x: 290, y: 40 },
    O: { x: 410, y: 330 },
    P: { x: 450, y: 287 },
  }

  // Update image size when it loads or window resizes
  useEffect(() => {
    const updateImageSize = () => {
      if (imageRef.current && containerRef.current) {
        const imgRect = imageRef.current.getBoundingClientRect()

        setImageSize({
          width: imgRect.width,
          height: imgRect.height,
        })
      }
    }

    // Initial update
    const timer = setTimeout(updateImageSize, 100)

    // Update on resize
    window.addEventListener("resize", updateImageSize)

    // Cleanup
    return () => {
      clearTimeout(timer)
      window.removeEventListener("resize", updateImageSize)
    }
  }, [])

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

  // Calculate scaled font size based on image width
  const getScaledFontSize = () => {
    if (imageSize.width === 0) return 9
    const scaleFactor = imageSize.width / 1000
    return Math.max(8, Math.min(12, Math.round(9 * scaleFactor)))
  }

  return (
    <div className="w-full h-full" ref={containerRef}>
      <div className="relative w-full h-full">
        <Image
          ref={imageRef}
          src="/images/dimension-drawing.jpg"
          alt="Feeder Technical Drawing"
          fill
          className="object-contain"
          priority
          onLoad={() => {
            // Force update image size after load
            if (imageRef.current) {
              const imgRect = imageRef.current.getBoundingClientRect()
              setImageSize({
                width: imgRect.width,
                height: imgRect.height,
              })
            }
          }}
        />

        {/* Dimension overlays that scale with the image */}
        {imageSize.width > 0 && (
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            {dimensions.map((dimension) => {
              const position = originalPositions[dimension.id as keyof typeof originalPositions]
              if (!position) return null

              const isEditing = editingDimension === dimension.id
              const isEmpty = !dimension.value
              const isActive = activeDimension === dimension.id

              // Scale position based on actual image size
              const scaleX = imageSize.width / 1000
              const scaleY = imageSize.height / 1000

              const scaledX = position.x * scaleX
              const scaledY = position.y * scaleY

              const fontSize = getScaledFontSize()

              const style = {
                left: `${scaledX}px`,
                top: `${scaledY}px`,
                transform: "translate(-50%, -50%)",
                fontSize: `${fontSize}px`,
                pointerEvents: "auto" as const,
              }

              // Make filled buttons much smaller, showing only the number (borderless)
              if (!isEmpty && !isEditing) {
                return (
                  <div
                    key={`dim-value-${dimension.id}`}
                    className={`absolute bg-white dark:bg-gray-800 rounded-sm cursor-pointer text-center ${
                      isActive ? "ring-primary/50" : ""
                    }`}
                    style={{
                      ...style,
                      minWidth: `${Math.max(12, 12 * scaleX)}px`,
                      height: `${Math.max(10, 10 * scaleY)}px`,
                      padding: "0px",
                      lineHeight: `${Math.max(12, 12 * scaleY)}px`,
                      // No border for filled dimensions
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
                  className={`absolute rounded-sm cursor-pointer ${
                    isEmpty
                      ? "bg-red-50 dark:bg-red-900/20 border border-red-500 dark:border-red-400"
                      : "bg-white dark:bg-gray-800"
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
                        style={{ fontSize: `${fontSize}px` }}
                        autoFocus
                      />
                    </div>
                  ) : (
                    <div className="px-0.5 py-0">
                      <span className="font-medium ">{dimension.id}</span>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
