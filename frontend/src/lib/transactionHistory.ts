import { Address } from 'viem'

const STORAGE_KEY = 'oasis-bridge-tx-history'

export type TransactionStatus = 'pending' | 'processing' | 'completed' | 'failed'

export type TransactionRecord = {
  paymentId: string
  timestamp: number
  amount: string
  decimals: number
  tokenSymbol: string
  tokenAddress: Address
  userAddress: Address
  status: TransactionStatus
  txHash?: string
}

export function getTransactions(userAddress: Address): TransactionRecord[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return []

    const allTransactions = JSON.parse(stored) as TransactionRecord[]
    return allTransactions
      .filter(tx => tx.userAddress.toLowerCase() === userAddress.toLowerCase())
      .sort((a, b) => b.timestamp - a.timestamp)
  } catch (e) {
    console.warn('Failed to read transaction history:', e)
    return []
  }
}

export function saveTransaction(record: TransactionRecord): void {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    let transactions: TransactionRecord[] = stored ? JSON.parse(stored) : []

    // Remove existing if any (upsert)
    transactions = transactions.filter(t => t.paymentId !== record.paymentId)
    transactions.push(record)

    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions))
  } catch (e) {
    console.warn('Failed to save transaction to history:', e)
  }
}

export function updateTransactionStatus(paymentId: string, status: TransactionStatus): void {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return

    const transactions = JSON.parse(stored) as TransactionRecord[]
    const index = transactions.findIndex(t => t.paymentId === paymentId)

    if (index !== -1) {
      transactions[index].status = status
      localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions))
    }
  } catch (e) {
    console.warn('Failed to update transaction status:', e)
  }
}

export function clearHistory(userAddress: Address): void {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return

    const transactions = JSON.parse(stored) as TransactionRecord[]
    const otherTransactions = transactions.filter(
      tx => tx.userAddress.toLowerCase() !== userAddress.toLowerCase()
    )

    localStorage.setItem(STORAGE_KEY, JSON.stringify(otherTransactions))
  } catch (e) {
    console.warn('Failed to clear transaction history:', e)
  }
}
