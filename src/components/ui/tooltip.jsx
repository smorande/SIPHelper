import React from 'react'

const TooltipProvider = ({ children }) => <div>{children}</div>

const Tooltip = ({ children }) => <div>{children}</div>

const TooltipTrigger = React.forwardRef(({ className, ...props }, ref) => (
  <button ref={ref} className={className} {...props} />
))

const TooltipContent = ({ className, ...props }) => (
  <div className={`z-50 rounded-md border bg-white px-3 py-1.5 text-sm text-slate-950 shadow-md ${className}`} {...props} />
)

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
