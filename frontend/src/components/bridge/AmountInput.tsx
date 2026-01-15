import { useCallback, useMemo, useId, ChangeEvent, ReactNode } from 'react'
import { cn } from '../../lib/utils'
import { formatUnits, parseUnits } from 'viem'

interface AmountInputProps {
  value: string
  onChange: (value: string) => void
  decimals?: number
  maxValue?: bigint
  placeholder?: string
  disabled?: boolean
  className?: string
  error?: string
  label?: string
  trailing?: ReactNode
  onMaxClick?: () => void
  showMaxButton?: boolean
  balance?: bigint
  balanceLabel?: string
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
  error,
  label,
  trailing,
  onMaxClick,
  showMaxButton = true,
  balance,
  balanceLabel = 'Balance',
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

  const parsedValue = useMemo(() => {
    if (!value || value === '.') return 0n
    try {
      return parseUnits(value, decimals)
    } catch {
      return 0n
    }
  }, [value, decimals])

  const isOverMax = maxValue !== undefined && parsedValue > maxValue

  const formattedBalance = useMemo(() => {
    if (balance === undefined) return null
    return formatUnits(balance, decimals)
  }, [balance, decimals])

  const hasError = !!error || isOverMax

  return (
    <div data-slot="amount-input" className={cn('space-y-2', className)}>
      {(label || formattedBalance !== null) && (
        <div className="flex items-center justify-between">
          {label && (
            <label htmlFor={inputId} className="text-sm font-medium text-white/70">
              {label}
            </label>
          )}
          {formattedBalance !== null && (
            <span className="text-xs text-white/50">
              {balanceLabel}: {formattedBalance}
            </span>
          )}
        </div>
      )}

      <div
        className={cn(
          'relative flex items-center',
          'bg-black/20 border rounded-xl h-14 px-4',
          'transition-colors',
          hasError
            ? 'border-red-500/50 focus-within:border-red-500'
            : 'border-white/10 focus-within:border-white/30',
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
          aria-invalid={hasError}
          aria-describedby={hasError ? `${inputId}-error` : undefined}
          className={cn(
            'flex-1 bg-transparent text-white text-lg font-medium',
            'placeholder:text-white/50',
            'outline-none border-none',
            'min-w-0'
          )}
        />

        <div className="flex items-center gap-2 shrink-0">
          {showMaxButton && (maxValue !== undefined || onMaxClick) && (
            <button
              type="button"
              onClick={handleMaxClick}
              disabled={disabled}
              className={cn(
                'px-2 py-1 text-xs font-medium rounded-md',
                'bg-white/10 text-white/70',
                'hover:bg-white/15 hover:text-white',
                'transition-colors',
                'disabled:opacity-50 disabled:pointer-events-none'
              )}
            >
              MAX
            </button>
          )}
          {trailing}
        </div>
      </div>

      {hasError && (
        <p id={`${inputId}-error`} className="text-xs text-red-400" role="alert">
          {error || (isOverMax && 'Amount exceeds maximum')}
        </p>
      )}
    </div>
  )
}
