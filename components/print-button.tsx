"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { useState } from "react"

// Update the interface to accept a more flexible ref type
interface PrintButtonProps {
  contentRef: React.RefObject<HTMLElement | null>
  filename?: string
}

export default function PrintButton({ contentRef, filename = "Feeder_Configuration" }: PrintButtonProps) {
  const [isPrinting, setIsPrinting] = useState(false)

  const handlePrint = () => {
    // Check if contentRef.current exists before proceeding
    if (!contentRef.current || isPrinting) return

    setIsPrinting(true)

    try {
      // Add a temporary style for printing
      const style = document.createElement("style")
      style.innerHTML = `
        @media print {
          @page { size: portrait; margin: 1cm; }
          body { 
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
      `
      document.head.appendChild(style)

      // Store the original page title
      const originalTitle = document.title
      // Set the document title to be used as the PDF filename
      document.title = filename

      // Print the document
      window.print()

      // Restore the original title
      document.title = originalTitle
      // Remove the temporary style
      document.head.removeChild(style)
    } catch (error) {
      console.error("Error printing:", error)
    } finally {
      setIsPrinting(false)
    }
  }

  return (
    <Button onClick={handlePrint} disabled={isPrinting} className="flex items-center gap-2">
      <Download size={16} />
      {isPrinting ? "Preparing..." : "Save as PDF"}
    </Button>
  )
}