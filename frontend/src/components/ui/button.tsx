import type React from "react"
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export function Button({ children, className = "", ...props }: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center px-8 py-3 text-lg 
      bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300 
      rounded-lg transition-colors duration-200 ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}


