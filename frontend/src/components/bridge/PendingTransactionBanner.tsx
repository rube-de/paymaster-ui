import { formatUnits } from 'viem'
import type { PendingTransaction } from '../../lib/pendingTransaction'

export type PendingTransactionBannerProps = {
  /** The pending transaction to display - must be non-null */
  pending: PendingTransaction
  /** Token decimals for formatting the amount */
  decimals: number
  /** Called when user clicks Resume */
  onResume: () => void
  /** Called when user clicks Dismiss */
  onDismiss: () => void
}

/**
 * Banner displayed when a pending bridge transaction is detected.
 * Allows users to resume or dismiss the transaction.
 */
export function PendingTransactionBanner({
  pending,
  decimals,
  onResume,
  onDismiss,
}: PendingTransactionBannerProps) {
  return (
    <div className="mt-4 p-4 rounded-xl bg-amber-500/15 border border-amber-500/30">
      <p className="text-amber-400 text-sm font-medium mb-2">Pending transaction found</p>
      <p className="text-white/70 text-xs mb-3">
        A deposit of {formatUnits(BigInt(pending.amount), decimals)} {pending.tokenSymbol} is waiting
        for confirmation.
      </p>
      <div className="flex gap-2">
        <button
          type="button"
          className="flex-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
          onClick={onResume}
        >
          Resume
        </button>
        <button
          type="button"
          className="flex-1 bg-white/10 hover:bg-white/15 text-white/70 px-3 py-2 rounded-lg text-sm transition-colors"
          onClick={onDismiss}
        >
          Dismiss
        </button>
      </div>
    </div>
  )
}
