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
  return (
    <Card className="dark:border-gray-700">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Dimensions Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {dimensions.map((dimension) => {
            const isEmpty = !dimension.value

            return (
              <div
                key={dimension.id}
                className={`border rounded-md p-2 bg-gray-50 dark:bg-gray-800 ${
                  isEmpty ? "border-red-500 dark:border-red-400" : "border-gray-200 dark:border-gray-700"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-sm">{dimension.id}:</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{dimension.description}</span>
                </div>
                <div className={`text-base font-semibold ${isEmpty ? "text-red-500 dark:text-red-400" : ""}`}>
                  {isEmpty ? "Not set" : `${dimension.value} mm`}
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
