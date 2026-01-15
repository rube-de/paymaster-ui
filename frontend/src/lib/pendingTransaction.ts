import { Address } from 'viem'

const STORAGE_KEY = 'oasis-bridge-pending-tx'

export type PendingTransaction = {
  paymentId: string
  timestamp: number
  amount: string // bigint serialized as string
  tokenSymbol: string
  tokenAddress: Address
  userAddress: Address
  roseAmount: string // bigint serialized as string
}

/**
 * Save a pending transaction to localStorage.
 * Only one pending transaction is tracked at a time per user.
 */
export function savePendingTransaction(tx: PendingTransaction): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tx))
  } catch (e) {
    console.warn('Failed to save pending transaction to localStorage:', e)
  }
}

/**
 * Retrieve any pending transaction from localStorage.
 * Returns null if none exists or if data is invalid.
 */
export function getPendingTransaction(): PendingTransaction | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return null

    const parsed = JSON.parse(stored) as PendingTransaction

    // Validate all required fields to ensure data integrity
    if (
      !parsed ||
      typeof parsed.paymentId !== 'string' ||
      typeof parsed.timestamp !== 'number' ||
      typeof parsed.userAddress !== 'string' ||
      typeof parsed.amount !== 'string' ||
      typeof parsed.tokenSymbol !== 'string' ||
      typeof parsed.tokenAddress !== 'string' ||
      typeof parsed.roseAmount !== 'string'
    ) {
      clearPendingTransaction()
      return null
    }

    return parsed
  } catch (e) {
    console.warn('Failed to read pending transaction from localStorage:', e)
    return null
  }
}

/**
 * Clear any pending transaction from localStorage.
 * Call this on successful completion or when user dismisses recovery.
 */
export function clearPendingTransaction(): void {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch (e) {
    console.warn('Failed to clear pending transaction from localStorage:', e)
  }
}

/**
 * Check if a pending transaction has expired.
 * Transactions older than maxAgeMs are considered expired.
 */
export function isPendingTransactionExpired(
  tx: PendingTransaction,
  maxAgeMs: number = 10 * 60 * 1000 // 10 minutes default
): boolean {
  return Date.now() - tx.timestamp > maxAgeMs
}
