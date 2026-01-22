import { ReactNode } from 'react'
import { cn } from '../../lib/utils'

interface BridgeCardProps {
  children: ReactNode
  className?: string
  title?: string
  description?: string
}

export function BridgeCard({ children, className, title, description }: BridgeCardProps) {
  return (
    <div
      data-slot="bridge-card"
      className={cn(
        'w-full max-w-[400px] mx-auto',
        'bg-card',
        'border border-white/10',
        'rounded-xl shadow-2xl',
        'p-6',
        className
      )}
    >
      {(title || description) && (
        <div className="mb-4">
          {title && <h2 className="text-lg font-semibold text-white">{title}</h2>}
          {description && <p className="text-xs text-white/50 mt-0.5">{description}</p>}
        </div>
      )}
      {children}
    </div>
  )
}

interface BridgeCardSectionProps {
  children: ReactNode
  className?: string
  label?: string
}

export function BridgeCardSection({ children, className, label }: BridgeCardSectionProps) {
  return (
    <div data-slot="bridge-card-section" className={cn('space-y-2', className)}>
      {label && <span className="text-sm font-medium text-white/70">{label}</span>}
      {children}
    </div>
  )
}

interface BridgeCardDividerProps {
  className?: string
}

export function BridgeCardDivider({ className }: BridgeCardDividerProps) {
  return (
    <div
      data-slot="bridge-card-divider"
      className={cn('relative flex items-center justify-center py-2', className)}
    >
      <div className="absolute inset-x-0 h-px bg-white/10" />
      <div className="relative z-10 flex items-center justify-center size-8 rounded-full bg-black/60 border border-white/10">
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-white/50"
          aria-hidden="true"
        >
          <path
            d="M7 1V13M7 13L12 8M7 13L2 8"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  )
}
