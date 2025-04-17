import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type Dimension = {
  id: string
  label: string
  value: string
  description: string
}

type DimensionsSummaryProps = {
  dimensions: Dimension[]
}

export default function DimensionsSummary({ dimensions }: DimensionsSummaryProps) {
  // Organize dimensions into 4 rows of 4 dimensions each
  const firstRow = dimensions.slice(0, 4) // A-D
  const secondRow = dimensions.slice(4, 8) // E-H
  const thirdRow = dimensions.slice(8, 12) // I-L
  const fourthRow = dimensions.slice(12) // M-P

  return (
    <Card className="dark:border-gray-700 shadow-sm">
      <CardHeader className="py-1 px-3">
        <CardTitle className="text-sm">Dimensions Summary</CardTitle>
      </CardHeader>
      <CardContent className="p-2">
        {/* First Row */}
        <div className="grid grid-cols-4 gap-1 mb-1">{firstRow.map(renderDimension)}</div>

        {/* Second Row */}
        <div className="grid grid-cols-4 gap-1 mb-1">{secondRow.map(renderDimension)}</div>

        {/* Third Row */}
        <div className="grid grid-cols-4 gap-1 mb-1">{thirdRow.map(renderDimension)}</div>

        {/* Fourth Row */}
        <div className="grid grid-cols-4 gap-1">{fourthRow.map(renderDimension)}</div>
      </CardContent>
    </Card>
  )
}

// Helper function to render each dimension consistently
function renderDimension(dimension: Dimension) {
  const isEmpty = !dimension.value

  return (
    <div
      key={dimension.id}
      className={`rounded-sm p-1 ${
        isEmpty
          ? "bg-red-50 dark:bg-red-900/20 border border-red-500 dark:border-red-400"
          : "bg-gray-50 dark:bg-gray-800 border border-black-200 dark:border-gray-700"
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="font-medium text-[9px]">{dimension.id}</span>
        <span className="text-[8px] text-gray-500 dark:text-gray-400" title={dimension.description}>
          {dimension.description}
        </span>
      </div>
      <div className={`text-xs font-semibold ${isEmpty ? "text-red-500 dark:text-red-400" : ""}`}>
        {isEmpty ? "Not set" : `${dimension.value} mm`}
      </div>
    </div>
  )
}
