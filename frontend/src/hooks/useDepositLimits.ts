import { useMemo } from 'react'
import { useReadContract } from 'wagmi'
import { type Address, formatUnits } from 'viem'
import PaymasterVault_ABI from '../contracts/PaymasterVault_ABI.json'
import { PAYMASTER_VAULT_ADDRESS } from '../constants/rofl-paymaster-config'

export interface DepositLimits {
  /** Minimum deposit amount in token's smallest units */
  minDeposit: bigint
  /** Maximum deposit amount in token's smallest units */
  maxDeposit: bigint
  /** Whether this token is enabled for deposits */
  isEnabled: boolean
  /** Pre-formatted minimum for display (e.g., "10") */
  formattedMin: string
  /** Pre-formatted maximum for display (e.g., "1,000") */
  formattedMax: string
  /** Loading state while fetching from contract */
  isLoading: boolean
  /** Error state if contract read fails */
  isError: boolean
}

const DEFAULT_LIMITS: DepositLimits = {
  minDeposit: 0n,
  maxDeposit: 0n,
  isEnabled: false,
  formattedMin: '0',
  formattedMax: '0',
  isLoading: true,
  isError: false,
}

/**
 * Fetches deposit limits from PaymasterVault's getTokenConfig function.
 *
 * Uses wagmi's useReadContract which internally uses TanStack Query
 * for automatic caching and deduplication by (chainId, tokenAddress).
 *
 * @param tokenAddress - ERC20 token address to check limits for
 * @param chainId - Source chain ID where the vault contract lives
 * @param decimals - Token decimals for formatting display values
 */
export function useDepositLimits(
  tokenAddress: Address | undefined,
  chainId: number | undefined,
  decimals: number = 6
): DepositLimits {
  const { data, isLoading, isError } = useReadContract({
    address: PAYMASTER_VAULT_ADDRESS,
    abi: PaymasterVault_ABI,
    functionName: 'getTokenConfig',
    args: tokenAddress ? [tokenAddress] : undefined,
    chainId,
    query: {
      enabled: !!tokenAddress && !!chainId,
      staleTime: 60_000, // Cache for 1 minute
      refetchOnWindowFocus: false,
    },
  })

  return useMemo(() => {
    if (isLoading || !data) {
      return { ...DEFAULT_LIMITS, isLoading, isError }
    }

    // Result is tuple: [minDeposit, maxDeposit, enabled]
    const [minDeposit, maxDeposit, enabled] = data as [bigint, bigint, boolean]

    // Format with locale separators for display (BigInt-safe, no parseFloat precision loss)
    const formatWithSeparators = (value: bigint): string => {
      const formatted = formatUnits(value, decimals)
      const [integer, fraction] = formatted.split('.')

      const formattedInteger = BigInt(integer).toLocaleString('en-US')

      if (fraction && Number(fraction) > 0) {
        return `${formattedInteger}.${fraction.replace(/0+$/, '')}`
      }

      return formattedInteger
    }

    return {
      minDeposit,
      maxDeposit,
      isEnabled: enabled,
      formattedMin: formatWithSeparators(minDeposit),
      formattedMax: formatWithSeparators(maxDeposit),
      isLoading: false,
      isError,
    }
  }, [data, isLoading, isError, decimals])
}
