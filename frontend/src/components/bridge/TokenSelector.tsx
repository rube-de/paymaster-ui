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

/** Creates a unique composite key for token identity: "chainId:address" or "chainId:symbol:name" as fallback */
export const getTokenKey = (token: TokenOption): string =>
  `${token.chainId ?? 0}:${token.address ?? `${token.symbol}:${token.name}`}`

interface TokenSelectorProps {
  /** Token key in "chainId:address" format, or null if none selected */
  value: string | null
  options: TokenOption[]
  /** Called with both the composite key and the full token object. Optional when singleToken=true. */
  onChange?: (key: string, token: TokenOption) => void
  disabled?: boolean
  className?: string
  placeholder?: string
  showChainName?: boolean
  showBalance?: boolean
  label?: string
  /** When true, displays as read-only single token (no dropdown) */
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

  const selected = useMemo(() => options.find(o => getTokenKey(o) === value), [options, value])

  // If single token mode, just display it without dropdown
  if (singleToken && selected) {
    return (
      <div data-slot="token-selector" className={cn('space-y-2', className)}>
        {label && (
          <span id={labelId} className="text-sm font-medium text-white/70">
            {label}
          </span>
        )}
        <div
          role="status"
          aria-labelledby={label ? labelId : undefined}
          className={cn(
            'flex items-center gap-3 px-4 py-3',
            'bg-black/20 border border-white/10',
            'rounded-xl'
          )}
        >
          {selected.icon && <span className="shrink-0">{selected.icon}</span>}
          <div className="flex flex-col min-w-0">
            <span className="font-medium text-white">{selected.symbol}</span>
            {showChainName && selected.chainName && (
              <span className="text-xs text-white/50">on {selected.chainName}</span>
            )}
          </div>
          {showBalance && selected.balance && (
            <span className="ml-auto text-sm text-white/50">{selected.balance}</span>
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
          <span className="text-xs text-white/50 leading-tight">on {selected.chainName}</span>
        )}
      </div>
    </>
  ) : (
    <span className="text-white/50">{placeholder}</span>
  )

  return (
    <div data-slot="token-selector" className={cn('space-y-2', className)}>
      {label && (
        <label htmlFor={buttonId} className="text-sm font-medium text-white/70">
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
              'bg-black/20 border border-white/10',
              'rounded-xl px-4 py-3',
              'hover:bg-black/30 hover:border-white/20',
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
              className="shrink-0 text-white/50"
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
            'bg-neutral-900/95 backdrop-blur-xl',
            'border border-white/10',
            'rounded-xl overflow-hidden p-0'
          )}
        >
          {options.map((option, index) => {
            const isLast = index === options.length - 1
            const key = getTokenKey(option)

            return (
              <DropdownMenuItem
                key={key}
                disabled={disabled}
                onSelect={() => onChange?.(key, option)}
                className={cn(
                  'flex items-center gap-3 px-4 py-3',
                  'cursor-pointer outline-none',
                  'hover:bg-white/[0.06]',
                  'data-[highlighted]:bg-white/[0.06]',
                  !isLast && 'border-b border-white/5'
                )}
              >
                {option.icon && <span className="shrink-0">{option.icon}</span>}
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="font-medium text-white">{option.symbol}</span>
                  {option.name !== option.symbol && (
                    <span className="text-xs text-white/50">{option.name}</span>
                  )}
                </div>
                {showBalance && option.balance && (
                  <span className="text-sm text-white/50">{option.balance}</span>
                )}
              </DropdownMenuItem>
            )
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
