"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

export default function Page() {
  const [isPrinting, setIsPrinting] = useState(false)

  const handlePrint = () => {
    if (isPrinting) return

    setIsPrinting(true)

    try {
      // Set filename as document title
      const originalTitle = document.title
      document.title = "Feeder_Configuration"

      // Print
      window.print()

      // Restore title
      document.title = originalTitle
    } catch (error) {
      console.error("Error printing:", error)
    } finally {
      setIsPrinting(false)
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6 no-print">
        <h1 className="text-2xl font-bold text-center">Feeder Configuration Tool</h1>
        <Button onClick={handlePrint} disabled={isPrinting} className="flex items-center gap-2">
          <Download size={16} />
          {isPrinting ? "Preparing..." : "Save as PDF"}
        </Button>
      </div>

      <div className="content">{/* Your content here */}</div>
    </div>
  )
}
