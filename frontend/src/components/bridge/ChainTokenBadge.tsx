import { ReactNode } from 'react'
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
 * Combined chain+token selector badge for compact display.
 * Designed to fit inline with AmountInput via the `trailing` prop.
 *
 * Visual: [TokenIcon][ChainIcon] USDC ▼
 *         on Base    Bal: 0.05
 *
 * Features:
 * - Overlapping chain/token icons
 * - 44px min height for WCAG touch targets
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
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={`Select chain and token. Current: ${token.symbol} on ${chain.name}${balance ? `. Balance: ${balance}` : ''}`}
      className={cn(
        'flex items-center gap-2',
        'px-2 py-1 min-h-[44px]',
        'rounded-lg',
        'bg-white/[0.06] hover:bg-white/[0.10]',
        'border border-white/10 hover:border-white/20',
        'transition-colors',
        'disabled:opacity-50 disabled:pointer-events-none',
        className
      )}
    >
      {/* Stacked icons: token in front, chain behind */}
      <div className="relative flex items-center">
        {/* Token icon (front) */}
        <span className="relative z-10 shrink-0">{token.icon}</span>
        {/* Chain icon (behind, offset) */}
        <span className="relative -ml-2 z-0 shrink-0 opacity-80">{chain.icon}</span>
      </div>

      {/* Token symbol and chain name */}
      <div className="flex flex-col items-start min-w-0">
        <span className="text-sm font-medium text-white leading-tight">{token.symbol}</span>
        <span className="text-[11px] text-white/60 leading-tight">on {chain.name}</span>
      </div>

      {/* Chevron */}
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 text-white/50 ml-0.5"
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
