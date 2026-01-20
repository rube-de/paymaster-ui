import { ReactNode, useState } from 'react'
import { cn } from '../../lib/utils'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible'

export interface FeeItem {
  label: string
  value: string
  subValue?: string
  highlight?: boolean
  loading?: boolean
}

interface FeeBreakdownProps {
  items: FeeItem[]
  className?: string
  title?: string
  /** @deprecated Use variant instead. Will be removed in future version. */
  expanded?: boolean
  estimatedTime?: string
  slippage?: string
  /**
   * Display variant:
   * - 'expanded': Full breakdown with all details (default, backwards compatible)
   * - 'summary': Compact single-line with expand trigger (~32px height)
   */
  variant?: 'expanded' | 'summary'
}

export function FeeBreakdown({
  items,
  className,
  title = 'Transaction Details',
  expanded = true,
  estimatedTime,
  slippage,
  variant = 'expanded',
}: FeeBreakdownProps) {
  const [isOpen, setIsOpen] = useState(false)

  if (items.length === 0 && !estimatedTime && !slippage) {
    return null
  }

  // Summary variant: compact single-line with expand
  if (variant === 'summary') {
    const summaryParts: string[] = []
    if (estimatedTime) summaryParts.push(estimatedTime)
    if (slippage) summaryParts.push(`${slippage} slippage`)
    const summaryText = summaryParts.join(' • ') || 'Details'

    return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <div
          data-slot="fee-breakdown"
          className={cn('rounded-xl border border-white/10', 'bg-black/15', 'overflow-hidden', className)}
        >
          <CollapsibleTrigger asChild>
            <button
              type="button"
              className={cn(
                'w-full flex items-center justify-between gap-2',
                'px-4 py-2.5 min-h-[44px]',
                'hover:bg-white/[0.02] transition-colors',
                'text-left'
              )}
              aria-expanded={isOpen}
            >
              <span className="text-sm text-white/60">{summaryText}</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={cn('text-white/40 transition-transform shrink-0', isOpen && 'rotate-180')}
                aria-hidden="true"
              >
                <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </CollapsibleTrigger>

          <CollapsibleContent>
            <div className="px-4 pb-3 pt-1 space-y-2 border-t border-white/5">
              {items.map(item => (
                <FeeRow key={item.label} {...item} />
              ))}

              {items.length > 0 && (estimatedTime || slippage) && (
                <div className="h-px bg-white/5 my-1" aria-hidden="true" />
              )}

              {estimatedTime && <FeeRow label="Estimated time" value={estimatedTime} icon={<ClockIcon />} />}
              {slippage && <FeeRow label="Max slippage" value={slippage} icon={<SlippageIcon />} />}
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>
    )
  }

  // Expanded variant: original behavior
  return (
    <div
      data-slot="fee-breakdown"
      className={cn('rounded-xl border border-white/10', 'bg-black/15', 'overflow-hidden', className)}
    >
      {title && (
        <div className="px-4 py-3 border-b border-white/5">
          <span className="text-sm font-medium text-white/70">{title}</span>
        </div>
      )}

      {expanded && (
        <div className="p-4 space-y-3">
          {items.map(item => (
            <FeeRow key={item.label} {...item} />
          ))}

          {(estimatedTime || slippage) && items.length > 0 && (
            <div className="h-px bg-white/5 my-2" aria-hidden="true" />
          )}

          {estimatedTime && <FeeRow label="Estimated time" value={estimatedTime} icon={<ClockIcon />} />}
          {slippage && <FeeRow label="Max slippage" value={slippage} icon={<SlippageIcon />} />}
        </div>
      )}
    </div>
  )
}

function ClockIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-white/50"
      aria-hidden="true"
    >
      <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7 4V7L9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function SlippageIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-white/50"
      aria-hidden="true"
    >
      <path d="M7 1V13M1 7H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

interface FeeRowProps extends FeeItem {
  icon?: ReactNode
}

function FeeRow({ label, value, subValue, highlight, loading, icon }: FeeRowProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="flex items-center gap-2 text-sm text-white/50">
        {icon}
        {label}
      </span>

      <div className="flex items-center gap-2">
        {loading ? (
          <LoadingDots />
        ) : (
          <>
            <span className={cn('text-sm font-medium', highlight ? 'text-green-400' : 'text-white')}>
              {value}
            </span>
            {subValue && <span className="text-xs text-white/50">{subValue}</span>}
          </>
        )}
      </div>
    </div>
  )
}

function LoadingDots() {
  return (
    <div className="flex items-center gap-1" aria-label="Loading">
      <span className="size-1.5 rounded-full bg-white/30 animate-pulse" />
      <span className="size-1.5 rounded-full bg-white/30 animate-pulse [animation-delay:150ms]" />
      <span className="size-1.5 rounded-full bg-white/30 animate-pulse [animation-delay:300ms]" />
    </div>
  )
}

interface FeeEstimateProps {
  sourceAmount: string
  sourceToken: string
  destinationAmount: string
  destinationToken: string
  rate?: string
  loading?: boolean
  className?: string
}

export function FeeEstimate({
  sourceAmount,
  sourceToken,
  destinationAmount,
  destinationToken,
  rate,
  loading = false,
  className,
}: FeeEstimateProps) {
  return (
    <div data-slot="fee-estimate" className={cn('space-y-2', className)}>
      <div
        className={cn(
          'flex flex-col sm:flex-row items-center justify-between gap-3',
          'px-4 py-3',
          'bg-black/15 border border-white/10',
          'rounded-xl'
        )}
      >
        <div className="flex flex-col items-center sm:items-start w-full sm:w-auto">
          <span className="text-xs text-white/50">You pay</span>
          {loading ? (
            <LoadingDots />
          ) : (
            <span className="text-sm font-medium text-white">
              {sourceAmount} {sourceToken}
            </span>
          )}
        </div>

        {/* Horizontal arrow - hidden on mobile */}
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="hidden sm:block text-white/50 shrink-0"
          aria-hidden="true"
        >
          <path
            d="M3 8H13M13 8L9 4M13 8L9 12"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {/* Vertical arrow - shown on mobile only */}
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="sm:hidden text-white/50"
          aria-hidden="true"
        >
          <path
            d="M8 3V13M8 13L4 9M8 13L12 9"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <div className="flex flex-col items-center sm:items-end w-full sm:w-auto">
          <span className="text-xs text-white/50">You receive</span>
          {loading ? (
            <LoadingDots />
          ) : (
            <span className="text-sm font-medium text-green-400">
              ~{destinationAmount} {destinationToken}
            </span>
          )}
        </div>
      </div>

      {rate && !loading && (
        <div className="text-center">
          <span className="text-xs text-white/50">{rate}</span>
        </div>
      )}
    </div>
  )
}
