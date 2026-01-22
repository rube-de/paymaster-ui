import { useCallback, useMemo, useId, ChangeEvent, ReactNode } from 'react'
import { cn } from '../../lib/utils'
import { formatUnits } from 'viem'

interface AmountInputProps {
  value: string
  onChange: (value: string) => void
  decimals?: number
  maxValue?: bigint
  placeholder?: string
  disabled?: boolean
  className?: string
  label?: string
  trailing?: ReactNode
  onMaxClick?: () => void
  showMaxButton?: boolean
  balance?: bigint
  balanceLabel?: string
  /** When true, styles the input text and balance number red */
  insufficientBalance?: boolean
  /** Set true for native tokens (ETH, ROSE) to reserve gas when clicking MAX */
  isNativeToken?: boolean
  /**
   * Gas buffer to subtract from max for native tokens when clicking MAX.
   *
   * NOTE: This value is network-dependent. The default (0.01 native tokens)
   * may be too low on high-gas chains or too high on L2s. Callers should
   * set this based on the target network's typical gas costs.
   */
  gasBuffer?: bigint
}

/**
 * Default gas buffer: 0.01 native tokens (10^16 wei).
 * This is a generic fallback - prefer passing explicit gasBuffer for production.
 */
const DEFAULT_GAS_BUFFER = 10_000_000_000_000_000n

export function AmountInput({
  value,
  onChange,
  decimals = 18,
  maxValue,
  placeholder = '0.00',
  disabled = false,
  className,
  label,
  trailing,
  onMaxClick,
  showMaxButton = true,
  balance,
  balanceLabel = 'Balance',
  insufficientBalance = false,
  isNativeToken = false,
  gasBuffer = DEFAULT_GAS_BUFFER,
}: AmountInputProps) {
  const inputId = useId()

  // Memoize regex to avoid recreating on each keystroke
  const decimalRegex = useMemo(() => new RegExp(`^\\d*\\.?\\d{0,${decimals}}$`), [decimals])

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value

      // Allow empty string
      if (raw === '') {
        onChange('')
        return
      }

      // Validate decimal format
      if (!decimalRegex.test(raw)) {
        return
      }

      onChange(raw)
    },
    [onChange, decimalRegex]
  )

  const handleMaxClick = useCallback(() => {
    if (onMaxClick) {
      onMaxClick()
      return
    }

    if (maxValue !== undefined) {
      // For native tokens, subtract gas buffer to leave room for transaction fees
      const effectiveMax =
        isNativeToken && gasBuffer > 0n ? (maxValue > gasBuffer ? maxValue - gasBuffer : 0n) : maxValue
      const formatted = formatUnits(effectiveMax, decimals)
      onChange(formatted)
    }
  }, [maxValue, decimals, onChange, onMaxClick, isNativeToken, gasBuffer])

  const handlePercentClick = useCallback(
    (percent: number) => {
      if (maxValue !== undefined) {
        const effectiveMax =
          isNativeToken && gasBuffer > 0n ? (maxValue > gasBuffer ? maxValue - gasBuffer : 0n) : maxValue
        const percentValue = (effectiveMax * BigInt(percent)) / 100n
        const formatted = formatUnits(percentValue, decimals)
        onChange(formatted)
      }
    },
    [maxValue, decimals, onChange, isNativeToken, gasBuffer]
  )

  const formattedBalance = useMemo(() => {
    if (balance === undefined) return null
    return formatUnits(balance, decimals)
  }, [balance, decimals])

  return (
    <div data-slot="amount-input" className={cn('space-y-1.5', className)}>
      {/* Label row (if provided) */}
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-white/70">
          {label}
        </label>
      )}

      {/* Main input row: Amount input + Token selector */}
      <div
        className={cn(
          'relative flex items-center gap-3',
          'bg-black/20 border rounded-xl px-4 py-3',
          'transition-colors',
          'border-white/10 focus-within:border-white/30',
          disabled && 'opacity-50 pointer-events-none'
        )}
      >
        <input
          id={inputId}
          type="text"
          inputMode="decimal"
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          aria-invalid={insufficientBalance}
          className={cn(
            'flex-1 bg-transparent text-2xl font-medium',
            'placeholder:text-white/40',
            'outline-none border-none',
            'min-w-0',
            insufficientBalance ? 'text-red-400' : 'text-white'
          )}
        />

        {/* Token selector (trailing) */}
        <div className="shrink-0">{trailing}</div>
      </div>

      {/* Balance + Percentage buttons row (below input, like Bungee/Across) */}
      {(formattedBalance !== null || showMaxButton) && (
        <div className="flex items-center justify-between px-1">
          {/* Left: Balance info */}
          {formattedBalance !== null ? (
            <span className="text-xs text-white/50">
              {balanceLabel}:{' '}
              <span className={insufficientBalance ? 'text-red-400' : undefined}>{formattedBalance}</span>
            </span>
          ) : (
            <span />
          )}

          {/* Right: Percentage + MAX buttons */}
          {showMaxButton && (maxValue !== undefined || onMaxClick) && (
            <div className="flex items-center gap-1">
              {[25, 50, 75].map(percent => (
                <button
                  key={percent}
                  type="button"
                  onClick={() => handlePercentClick(percent)}
                  disabled={disabled}
                  aria-label={`Set amount to ${percent}% of balance`}
                  className={cn(
                    'px-1.5 py-0.5 text-xs font-medium rounded',
                    'text-white/40 hover:text-white/70',
                    'hover:bg-white/10',
                    'transition-colors',
                    'disabled:opacity-50 disabled:pointer-events-none'
                  )}
                >
                  {percent}%
                </button>
              ))}
              <button
                type="button"
                onClick={handleMaxClick}
                disabled={disabled}
                aria-label="Set amount to maximum balance"
                className={cn(
                  'px-1.5 py-0.5 text-xs font-medium rounded',
                  'text-white/60 hover:text-white',
                  'hover:bg-white/10',
                  'transition-colors',
                  'disabled:opacity-50 disabled:pointer-events-none'
                )}
              >
                MAX
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
