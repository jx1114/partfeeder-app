"use client"

import { useRef } from "react"
import PrintButton from "@/components/print-button"

export default function Page() {
  // Specify the correct type for the ref
  const contentRef = useRef<HTMLDivElement>(null)

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-center">Feeder Configuration Tool</h1>
        <PrintButton contentRef={contentRef} />
      </div>

      {/* Make sure to attach the ref to a div */}
      <div ref={contentRef}>{/* Your content here */}</div>
    </div>
  )
}
