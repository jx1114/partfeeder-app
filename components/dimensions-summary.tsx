import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"

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
    <Card>
      <CardHeader>
        <CardTitle>Dimensions Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {dimensions.map((dimension) => (
            <div key={dimension.id} className="border rounded-md p-3 bg-gray-50">
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium">{dimension.id}:</span>
                <span className="text-sm text-gray-500">{dimension.description}</span>
              </div>
              <div className={`text-lg font-semibold ${!dimension.value ? "text-red-500" : ""}`}>
                {dimension.value ? `${dimension.value} mm` : "Not set"}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
