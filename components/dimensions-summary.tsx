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
    <Card className="dark:border-gray-700 shadow-sm">
      <CardHeader className="py-1 px-3">
        <CardTitle className="text-sm">Dimensions Summary</CardTitle>
      </CardHeader>
      <CardContent className="p-2">
        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-8 gap-1 print:grid-cols-8">
          {dimensions.map((dimension) => {
            const isEmpty = !dimension.value

            return (
              <div
                key={dimension.id}
                className={`border rounded-sm p-1 bg-gray-50 dark:bg-gray-800 ${
                  isEmpty ? "border-red-500 dark:border-red-400" : "border-gray-200 dark:border-gray-700"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-[9px]">{dimension.id}</span>
                  <span
                    className="text-[8px] text-gray-500 dark:text-gray-400 truncate ml-1"
                    title={dimension.description}
                  >
                    {dimension.description.length > 10
                      ? dimension.description.substring(0, 10) + "..."
                      : dimension.description}
                  </span>
                </div>
                <div className={`text-xs font-semibold ${isEmpty ? "text-red-500 dark:text-red-400" : ""}`}>
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
