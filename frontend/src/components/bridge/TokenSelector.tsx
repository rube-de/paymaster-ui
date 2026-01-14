import { ReactNode, useMemo, useId } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { cn } from '../../lib/utils'

export interface TokenOption {
  symbol: string
  name: string
  icon?: ReactNode
  address?: string
  decimals?: number
  chainId?: number
  chainName?: string
  balance?: string
}

/** Creates a unique composite key for token identity: "chainId:address" or "0:symbol" as fallback */
export const getTokenKey = (token: TokenOption): string =>
  `${token.chainId ?? 0}:${token.address ?? token.symbol}`

interface TokenSelectorProps {
  /** Token key in "chainId:address" format, or null if none selected */
  value: string | null
  options: TokenOption[]
  /** Called with both the composite key and the full token object */
  onChange: (key: string, token: TokenOption) => void
  disabled?: boolean
  className?: string
  placeholder?: string
  showChainName?: boolean
  showBalance?: boolean
  label?: string
  singleToken?: boolean
}

export function TokenSelector({
  value,
  options,
  onChange,
  disabled = false,
  className,
  placeholder = 'Select token',
  showChainName = false,
  showBalance = false,
  label,
  singleToken = false,
}: TokenSelectorProps) {
  const labelId = useId()
  const buttonId = useId()

  const selected = useMemo(
    () => options.find(o => getTokenKey(o) === value),
    [options, value]
  )

  // If single token mode, just display it without dropdown
  if (singleToken && selected) {
    return (
      <div data-slot="token-selector" className={cn('space-y-2', className)}>
        {label && (
          <span id={labelId} className="text-sm font-medium text-[rgba(255,255,255,0.7)]">
            {label}
          </span>
        )}
        <div
          role="status"
          aria-labelledby={label ? labelId : undefined}
          className={cn(
            'flex items-center gap-3 px-4 py-3',
            'bg-[rgba(0,0,0,0.2)] border border-[rgba(255,255,255,0.1)]',
            'rounded-xl'
          )}
        >
          {selected.icon && <span className="shrink-0">{selected.icon}</span>}
          <div className="flex flex-col min-w-0">
            <span className="font-medium text-white">{selected.symbol}</span>
            {showChainName && selected.chainName && (
              <span className="text-xs text-[rgba(255,255,255,0.5)]">on {selected.chainName}</span>
            )}
          </div>
          {showBalance && selected.balance && (
            <span className="ml-auto text-sm text-[rgba(255,255,255,0.5)]">{selected.balance}</span>
          )}
        </div>
      </div>
    )
  }

  const triggerContent = selected ? (
    <>
      {selected.icon && <span className="shrink-0">{selected.icon}</span>}
      <div className="flex flex-col items-start min-w-0">
        <span className="font-medium text-white leading-tight">{selected.symbol}</span>
        {showChainName && selected.chainName && (
          <span className="text-xs text-[rgba(255,255,255,0.5)] leading-tight">on {selected.chainName}</span>
        )}
      </div>
    </>
  ) : (
    <span className="text-[rgba(255,255,255,0.5)]">{placeholder}</span>
  )

  return (
    <div data-slot="token-selector" className={cn('space-y-2', className)}>
      {label && (
        <label htmlFor={buttonId} className="text-sm font-medium text-[rgba(255,255,255,0.7)]">
          {label}
        </label>
      )}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            id={buttonId}
            type="button"
            disabled={disabled}
            aria-label={selected ? `Selected: ${selected.symbol}` : placeholder}
            className={cn(
              'w-full flex items-center justify-between gap-3',
              'bg-[rgba(0,0,0,0.2)] border border-[rgba(255,255,255,0.1)]',
              'rounded-xl px-4 py-3',
              'hover:bg-[rgba(0,0,0,0.3)] hover:border-[rgba(255,255,255,0.2)]',
              'transition-colors',
              'disabled:opacity-50 disabled:pointer-events-none'
            )}
          >
            <span className="flex items-center gap-3 min-w-0">{triggerContent}</span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              className="shrink-0 text-[rgba(255,255,255,0.5)]"
              aria-hidden="true"
            >
              <path d="M8 10L12 14L16 10" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="start"
          sideOffset={8}
          className={cn(
            'w-[var(--radix-dropdown-menu-trigger-width)]',
            'bg-[rgba(20,20,20,0.95)] backdrop-blur-xl',
            'border border-[rgba(255,255,255,0.1)]',
            'rounded-xl overflow-hidden p-0'
          )}
        >
          {options.map((option, idx) => {
            const isLast = idx === options.length - 1
            const key = getTokenKey(option)

            return (
              <DropdownMenuItem
                key={key}
                disabled={disabled}
                onSelect={() => onChange(key, option)}
                className={cn(
                  'flex items-center gap-3 px-4 py-3',
                  'cursor-pointer outline-none',
                  'hover:bg-[rgba(255,255,255,0.06)]',
                  'data-[highlighted]:bg-[rgba(255,255,255,0.06)]',
                  !isLast && 'border-b border-[rgba(255,255,255,0.05)]'
                )}
              >
                {option.icon && <span className="shrink-0">{option.icon}</span>}
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="font-medium text-white">{option.symbol}</span>
                  {option.name !== option.symbol && (
                    <span className="text-xs text-[rgba(255,255,255,0.5)]">{option.name}</span>
                  )}
                </div>
                {showBalance && option.balance && (
                  <span className="text-sm text-[rgba(255,255,255,0.5)]">{option.balance}</span>
                )}
              </DropdownMenuItem>
            )
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
