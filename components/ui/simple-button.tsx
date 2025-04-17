import type React from "react"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
}

export function Button({ className = "", variant = "default", size = "default", children, ...props }: ButtonProps) {
  // Base styles
  let variantClasses = ""
  let sizeClasses = ""

  // Variant styles
  switch (variant) {
    case "default":
      variantClasses = "bg-blue-600 text-white hover:bg-blue-700"
      break
    case "destructive":
      variantClasses = "bg-red-600 text-white hover:bg-red-700"
      break
    case "outline":
      variantClasses = "border border-gray-300 bg-transparent hover:bg-gray-100"
      break
    case "secondary":
      variantClasses = "bg-gray-200 text-gray-900 hover:bg-gray-300"
      break
    case "ghost":
      variantClasses = "bg-transparent hover:bg-gray-100"
      break
    case "link":
      variantClasses = "text-blue-600 underline-offset-4 hover:underline bg-transparent"
      break
  }

  // Size styles
  switch (size) {
    case "default":
      sizeClasses = "h-10 px-4 py-2"
      break
    case "sm":
      sizeClasses = "h-9 px-3 py-1 text-sm"
      break
    case "lg":
      sizeClasses = "h-11 px-8 py-3"
      break
    case "icon":
      sizeClasses = "h-10 w-10"
      break
  }

  const allClasses = `inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:opacity-50 ${variantClasses} ${sizeClasses} ${className}`

  return (
    <button className={allClasses} {...props}>
      {children}
    </button>
  )
}

export default Button
