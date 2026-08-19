import * as React from "react"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", ...props }, ref) => {
    const baseStyles = "px-4 py-2 rounded-lg font-medium transition-colors focus:outline-none"
    
    const variantStyles = {
      default: "bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-400",
      outline: "border border-gray-300 text-gray-900 hover:bg-gray-50 disabled:bg-gray-100"
    }

    return (
      <button
        className={`${baseStyles} ${variantStyles[variant]} ${className || ""}`}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
