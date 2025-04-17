import Image from "next/image"

type Dimension = {
  id: string
  label: string
  value: string
  description: string
}

type PdfVersionProps = {
  dimensions: Dimension[]
  machineNo: string
  rotation: string
  uph: string
}

export default function PdfVersion({ dimensions, machineNo, rotation, uph }: PdfVersionProps) {
  return (
    <div className="pdf-container p-4" style={{ fontFamily: "Arial, sans-serif" }}>
      <h1 className="text-2xl font-bold mb-6 text-center">Feeder Configuration Report</h1>

      {/* Machine Information */}
      <div className="mb-6 border rounded-md p-4">
        <h2 className="text-xl font-bold mb-4">Machine Information</h2>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="font-semibold">Machine no.</p>
            <p>{machineNo || "Not specified"}</p>
          </div>
          <div>
            <p className="font-semibold">Rotation</p>
            <p>{rotation}</p>
          </div>
          <div>
            <p className="font-semibold">UPH</p>
            <p>{uph || "Not specified"}</p>
          </div>
        </div>
      </div>

      {/* Feeder Design */}
      <div className="mb-6 border rounded-md p-4">
        <h2 className="text-xl font-bold mb-4">Feeder Design</h2>
        <div className="relative">
          <Image
            src="/images/dimension-drawing.jpg"
            alt="Feeder Technical Drawing"
            width={800}
            height={450}
            className="w-full h-auto"
          />
        </div>
      </div>

      {/* Dimensions Summary */}
      <div className="border rounded-md p-4">
        <h2 className="text-xl font-bold mb-4">Dimensions Summary</h2>
        <div className="grid grid-cols-4 gap-3">
          {dimensions.map((dimension) => (
            <div key={dimension.id} className={`border rounded-md p-2 ${!dimension.value ? "border-red-500" : ""}`}>
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold">{dimension.id}:</span>
                <span className="text-sm text-gray-500">{dimension.description}</span>
              </div>
              <div className={`text-base font-bold ${!dimension.value ? "text-red-500" : ""}`}>
                {dimension.value ? `${dimension.value} mm` : "Not set"}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 text-center text-sm text-gray-500">
        <p>
          Generated on {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
        </p>
      </div>
    </div>
  )
}