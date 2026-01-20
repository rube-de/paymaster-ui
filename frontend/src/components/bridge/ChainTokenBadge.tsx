import { ReactNode, cloneElement, isValidElement } from 'react'
import { cn } from '../../lib/utils'

interface ChainTokenBadgeProps {
  /** Chain info for display */
  chain: {
    id: number
    name: string
    icon: ReactNode
  }
  /** Token info for display */
  token: {
    symbol: string
    icon: ReactNode
  }
  /** Optional balance to display */
  balance?: string
  /** Click handler to open selection modal */
  onClick?: () => void
  /** Disable interaction */
  disabled?: boolean
  /** Additional class names */
  className?: string
}

/**
 * Combined chain+token selector badge following Across/Bungee pattern.
 *
 * Visual: [TokenIcon with ChainBadge] USDC  ▼
 *                                     Base
 *
 * Features:
 * - Large token icon (32px) with small chain badge overlay (14px)
 * - Chain badge positioned at bottom-right of token icon
 * - 48px min height for excellent touch targets
 * - Accessible button with descriptive aria-label
 */
export function ChainTokenBadge({
  chain,
  token,
  balance,
  onClick,
  disabled = false,
  className,
}: ChainTokenBadgeProps) {
  // Clone chain icon with smaller size for badge overlay
  const chainBadge = isValidElement(chain.icon)
    ? cloneElement(chain.icon as React.ReactElement<{ className?: string }>, {
        className: 'size-3.5',
      })
    : chain.icon

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={`Select chain and token. Current: ${token.symbol} on ${chain.name}${balance ? `. Balance: ${balance}` : ''}`}
      className={cn(
        'flex items-center gap-2.5',
        'pl-2 pr-3 py-1.5 min-h-[48px]',
        'rounded-xl',
        'bg-white/[0.08] hover:bg-white/[0.12]',
        'border border-white/10 hover:border-white/25',
        'transition-colors',
        'disabled:opacity-50 disabled:pointer-events-none',
        className
      )}
    >
      {/* Token icon with chain badge overlay */}
      <div className="relative shrink-0">
        {/* Token icon (large, 32px) */}
        <span className="block [&>*]:size-8">{token.icon}</span>
        {/* Chain badge (small, bottom-right) */}
        <span className="absolute -bottom-0.5 -right-0.5 block rounded-full bg-[#0d1f2d] ring-2 ring-[#0d1f2d]">
          {chainBadge}
        </span>
      </div>

      {/* Token symbol and chain name */}
      <div className="flex flex-col items-start min-w-0">
        <span className="text-base font-semibold text-white leading-tight">{token.symbol}</span>
        <span className="text-xs text-white/50 leading-tight">{chain.name}</span>
      </div>

      {/* Chevron */}
      <svg
        width="14"
        height="14"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 text-white/40 ml-0.5"
        aria-hidden="true"
      >
        <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </button>
  )
}

interface ChainTokenBadgeWithBalanceProps extends ChainTokenBadgeProps {
  /** Balance label (default: "Bal") */
  balanceLabel?: string
}

/**
 * Extended badge variant that shows balance below the main badge.
 * Use this when balance needs to be prominently displayed.
 */
export function ChainTokenBadgeWithBalance({
  balance,
  balanceLabel = 'Bal',
  ...props
}: ChainTokenBadgeWithBalanceProps) {
  return (
    <div className="flex flex-col items-end gap-0.5">
      <ChainTokenBadge {...props} balance={balance} />
      {balance && (
        <span className="text-xs text-white/50 px-1">
          {balanceLabel}: {balance}
        </span>
      )}
    </div>
  )
}
