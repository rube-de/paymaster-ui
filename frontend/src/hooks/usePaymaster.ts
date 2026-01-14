import { useCallback, useRef, useState } from 'react'
import { BaseError, useAccount, useBalance } from 'wagmi'
import { checkAndSetErc20Allowance, switchToChain } from '../contracts/erc-20'
import { Address, Chain } from 'viem'
import { base } from 'wagmi/chains'
import { deposit } from '../contracts/paymasterVault.ts'
import {
  ROFL_PAYMASTER_DESTINATION_CHAIN,
  ROFL_PAYMASTER_DESTINATION_CHAIN_TOKEN,
  ROFL_PAYMASTER_EXPECTED_TIME,
  ROFL_PAYMASTER_SAPPHIRE_CONTRACT_CONFIG,
  ROFL_PAYMASTER_SLIPPAGE_PERCENTAGE,
  ROFL_PAYMASTER_TOKEN_CONFIG,
  RoflPaymasterTokenConfig,
} from '../constants/rofl-paymaster-config.ts'
import { isPaymentProcessed, useRosePriceFeed, useTokenPriceFeed } from '../contracts/crossChainPaymaster.ts'
import { aggregatorV3LatestRoundData, useAggregatorV3Decimals } from '../contracts/AggregatorV3.ts'

export type PaymasterStepStatus = 'pending' | 'processing' | 'completed' | 'error'

export type ProgressStep = {
  id: number
  label: string
  expectedTimeInSeconds?: number
}

export type ProgressStepWithAction = ProgressStep & {
  action: (signal?: AbortSignal) => Promise<void>
}

export type StartTopUpParams = {
  amount: bigint
}

export type UsePaymasterTopUpFlowReturn = {
  isLoading: boolean
  initialLoading: boolean
  error: string
  quote: bigint | null

  currentStep: ProgressStep | ProgressStepWithAction | null
  stepStatuses: Partial<Record<number, PaymasterStepStatus>>

  getQuote: (p: StartTopUpParams) => Promise<bigint | null>
  startTopUp: (p: StartTopUpParams) => Promise<{ paymentId: string | null }>
  reset: () => void
  cancel: () => void
}

function ceilDiv(n: bigint, d: bigint): bigint {
  if (d === 0n) throw new Error('Division by zero')
  return (n + d - 1n) / d
}

// Minimum balance increase threshold (0.001 ROSE = 1e15 wei)
// Prevents false positives from dust transfers or staking rewards
const MIN_BALANCE_INCREASE_THRESHOLD = 1_000_000_000_000_000n

const progressSteps = [
  {
    id: 1,
    label: 'Validating chain connection',
  },
  {
    id: 2,
    label: 'Approving token spend',
  },
  {
    id: 3,
    label: 'Executing deposit transaction',
  },
  {
    id: 4,
    label: 'Confirming completion',
    expectedTimeInSeconds: ROFL_PAYMASTER_EXPECTED_TIME,
  },
  {
    id: 5,
    label: 'Validating chain connection',
  },
]

export function usePaymaster(
  targetToken: RoflPaymasterTokenConfig,
  additionalSteps: ProgressStepWithAction[]
): UsePaymasterTopUpFlowReturn {
  const { address } = useAccount()
  const { refetch: refetchSapphireNativeBalance } = useBalance({
    address,
    chainId: ROFL_PAYMASTER_DESTINATION_CHAIN.id,
    query: { enabled: !!address },
  })

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [quote, setQuote] = useState<bigint | null>(null)

  const [currentStep, setCurrentStep] = useState<number | null>(null)
  const [stepStatuses, setStepStatuses] = useState<Partial<Record<number, PaymasterStepStatus>>>({})

  // P0-1 FIX: Use ref to track current step for error handling (avoids stale closure)
  const currentStepRef = useRef<number | null>(null)

  // P0-6 FIX: Use ref to guard against concurrent execution
  const isLoadingRef = useRef(false)

  // P0-3 FIX: AbortController for cancellation support
  const abortControllerRef = useRef<AbortController | null>(null)

  const updateStep = useCallback((step: number, status: PaymasterStepStatus) => {
    currentStepRef.current = step
    setCurrentStep(step)
    setStepStatuses(prev => ({ ...prev, [step]: status }))
  }, [])

  const reset = useCallback(() => {
    // Cancel any in-flight operations
    abortControllerRef.current?.abort()
    abortControllerRef.current = null

    isLoadingRef.current = false
    currentStepRef.current = null
    setIsLoading(false)
    setError('')
    setQuote(null)
    setCurrentStep(null)
    setStepStatuses({})
  }, [])

  // P0-3 FIX: Expose cancel function
  const cancel = useCallback(() => {
    abortControllerRef.current?.abort()
  }, [])

  const { data: roseFeed } = useRosePriceFeed(
    ROFL_PAYMASTER_SAPPHIRE_CONTRACT_CONFIG[ROFL_PAYMASTER_DESTINATION_CHAIN.id],
    ROFL_PAYMASTER_DESTINATION_CHAIN.id
  )
  const { data: tokenFeed } = useTokenPriceFeed(
    ROFL_PAYMASTER_SAPPHIRE_CONTRACT_CONFIG[ROFL_PAYMASTER_DESTINATION_CHAIN.id],
    targetToken.contractAddress,
    ROFL_PAYMASTER_DESTINATION_CHAIN.id
  )
  const { data: roseFeedDecimals } = useAggregatorV3Decimals(
    roseFeed as Address,
    ROFL_PAYMASTER_DESTINATION_CHAIN.id
  )
  const { data: tokenFeedDecimals } = useAggregatorV3Decimals(
    tokenFeed as Address,
    ROFL_PAYMASTER_DESTINATION_CHAIN.id
  )

  const _getQuote = useCallback(
    async (
      roseAmount: bigint,
      chain: Chain,
      roseDecimals = ROFL_PAYMASTER_DESTINATION_CHAIN_TOKEN.decimals,
      slippagePercentage = ROFL_PAYMASTER_SLIPPAGE_PERCENTAGE
    ): Promise<bigint | null> => {
      if (chain.id !== ROFL_PAYMASTER_DESTINATION_CHAIN.id) {
        throw new Error('Invalid chain!')
      }
      if (!roseFeed || !tokenFeed || roseFeedDecimals === undefined || tokenFeedDecimals === undefined) {
        // Silently fail if the required data is not refreshed yet
        return null
      }

      const [roseUsdPrice, tokenUsdPrice] = await Promise.all([
        aggregatorV3LatestRoundData(roseFeed as Address, chain.id),
        aggregatorV3LatestRoundData(tokenFeed as Address, chain.id),
      ])

      if (roseUsdPrice <= 0n) throw new Error('Invalid ROSE price')
      if (tokenUsdPrice <= 0n) throw new Error('Invalid token price')

      const tokenDecimals = BigInt(targetToken.decimals)
      const roseTokenDecimals = BigInt(roseDecimals)

      const numerator = roseAmount * roseUsdPrice * 10n ** ((tokenDecimals + tokenFeedDecimals) as bigint)
      const denominator = tokenUsdPrice * 10n ** ((roseTokenDecimals + roseFeedDecimals) as bigint)

      const tokenAmount = ceilDiv(numerator, denominator)

      return ceilDiv(tokenAmount * (100n + slippagePercentage), 100n)
    },
    [roseFeed, tokenFeed, tokenFeedDecimals, roseFeedDecimals, targetToken.decimals]
  )

  const createDeposit = useCallback(
    (tokenContractAddress: Address, amount: bigint, recipient: Address, chainId: number) => {
      const roflPaymasterVaultContractAddress = ROFL_PAYMASTER_TOKEN_CONFIG[chainId].paymasterContractAddress

      return deposit(roflPaymasterVaultContractAddress, tokenContractAddress, amount, recipient, chainId)
    },
    []
  )

  // P0-3 & P0-4 FIX: Add AbortSignal support and throw on timeout
  const pollPayment = useCallback(async (paymentId: string, chain: Chain, signal?: AbortSignal) => {
    if (chain.id !== ROFL_PAYMASTER_DESTINATION_CHAIN.id) {
      throw new Error('Invalid chain!')
    }
    if (!paymentId) {
      throw new Error('PaymentId is required!')
    }

    let attempts = 0
    const maxAttempts = 60

    while (attempts < maxAttempts) {
      // P0-3: Check for cancellation
      if (signal?.aborted) {
        throw new Error('Payment polling cancelled')
      }

      try {
        const isProcessed = await isPaymentProcessed(
          ROFL_PAYMASTER_SAPPHIRE_CONTRACT_CONFIG[chain.id],
          paymentId,
          chain.id
        )

        if (isProcessed) {
          return true
        }

        await new Promise((resolve, reject) => {
          const timeoutId = setTimeout(resolve, 4000)
          signal?.addEventListener('abort', () => {
            clearTimeout(timeoutId)
            reject(new Error('Payment polling cancelled'))
          })
        })
        attempts++
      } catch (error) {
        if (signal?.aborted) {
          throw new Error('Payment polling cancelled')
        }
        console.error('Error checking payment processed:', error)
        await new Promise(resolve => setTimeout(resolve, 4000))
        attempts++
      }
    }

    // P0-4 FIX: Throw on timeout instead of returning null
    throw new Error('Payment confirmation timed out. Your funds may still arrive - check your wallet.')
  }, [])

  const getQuote = useCallback(
    async ({ amount }: StartTopUpParams) => {
      setError('')
      setQuote(null)

      if (!address) throw new Error('Wallet not connected')

      setIsLoading(true)
      try {
        const q = await _getQuote(amount, ROFL_PAYMASTER_DESTINATION_CHAIN)
        setQuote(q)
        return q
      } catch (e) {
        const msg = e instanceof Error ? e.message : 'Failed to fetch quote'
        setError(msg)
        throw e
      } finally {
        setIsLoading(false)
      }
    },
    [address, _getQuote]
  )

  // P0-3 FIX: Add AbortSignal support
  const waitForSapphireNativeBalanceIncrease = useCallback(
    async ({
      baseline,
      timeoutMs,
      intervalMs,
      minIncrease,
      signal,
    }: {
      baseline: bigint
      timeoutMs: number
      intervalMs: number
      minIncrease: bigint
      signal?: AbortSignal
    }) => {
      const startedAt = Date.now()
      while (Date.now() - startedAt < timeoutMs) {
        // Check for cancellation
        if (signal?.aborted) {
          throw new Error('Balance check cancelled')
        }

        const res = await refetchSapphireNativeBalance()
        const current = res.data?.value

        if (typeof current === 'bigint' && current >= baseline + minIncrease) return current

        await new Promise((resolve, reject) => {
          const timeoutId = setTimeout(resolve, intervalMs)
          signal?.addEventListener('abort', () => {
            clearTimeout(timeoutId)
            reject(new Error('Balance check cancelled'))
          })
        })
      }

      throw new Error('Payment likely processed, but Sapphire native balance did not increase in time')
    },
    [refetchSapphireNativeBalance]
  )

  const startTopUp = useCallback(
    async ({ amount }: StartTopUpParams) => {
      // P0-6 FIX: Guard against concurrent execution
      if (isLoadingRef.current) {
        return { paymentId: null }
      }

      setError('')

      if (!address) throw new Error('Wallet not connected')

      const sourceChainConfig = ROFL_PAYMASTER_TOKEN_CONFIG[base.id]

      // P0-3 FIX: Create new AbortController for this operation
      abortControllerRef.current = new AbortController()
      const signal = abortControllerRef.current.signal

      isLoadingRef.current = true
      setIsLoading(true)
      currentStepRef.current = 1
      setCurrentStep(1)

      // Track whether deposit was committed (for error handling)
      let depositCommitted = false
      let paymentId: string | null = null

      try {
        // Snapshot baseline Sapphire native balance
        const baselineSapphireNative =
          (await refetchSapphireNativeBalance()).data?.value ??
          (() => {
            throw new Error('Failed to read Sapphire native balance')
          })()

        // Step 1: switch to source
        updateStep(1, 'processing')
        await switchToChain({ targetChainId: base.id, address })
        updateStep(1, 'completed')

        // Check for cancellation before user interaction
        if (signal.aborted) throw new Error('Operation cancelled')

        // Step 2: allowance
        updateStep(2, 'processing')
        await checkAndSetErc20Allowance(
          targetToken.contractAddress,
          sourceChainConfig.paymasterContractAddress,
          amount,
          address,
          base.id
        )
        updateStep(2, 'completed')

        if (signal.aborted) throw new Error('Operation cancelled')

        // Step 3: create a deposit
        updateStep(3, 'processing')
        const depositResult = await createDeposit(targetToken.contractAddress, amount, address, base.id)

        // P0-2 FIX: Validate paymentId before proceeding
        if (!depositResult.paymentId) {
          throw new Error('Deposit succeeded but no payment ID returned. Please contact support with your transaction hash.')
        }
        paymentId = depositResult.paymentId
        depositCommitted = true // Funds are now committed on-chain
        updateStep(3, 'completed')

        // Step 4: poll (with cancellation support)
        updateStep(4, 'processing')
        await pollPayment(paymentId, ROFL_PAYMASTER_DESTINATION_CHAIN, signal)

        // P1 FIX: Use meaningful minimum increase threshold
        await waitForSapphireNativeBalanceIncrease({
          baseline: baselineSapphireNative,
          timeoutMs: 3 * 60_000,
          intervalMs: 4_000,
          minIncrease: MIN_BALANCE_INCREASE_THRESHOLD,
          signal,
        })
        updateStep(4, 'completed')

        // Step 5: switch to destination
        updateStep(5, 'processing')
        await switchToChain({ targetChainId: ROFL_PAYMASTER_DESTINATION_CHAIN.id, address })
        updateStep(5, 'completed')

        // Additional steps (with cancellation support)
        for (let i = 0; i < additionalSteps.length; i++) {
          if (signal.aborted) throw new Error('Operation cancelled')
          updateStep(i + 6, 'processing')
          try {
            await additionalSteps[i].action(signal)
          } catch (e) {
            // Provide context about which step failed
            const stepLabel = additionalSteps[i].label
            throw new Error(`Step "${stepLabel}" failed: ${e instanceof Error ? e.message : 'Unknown error'}`)
          }
          updateStep(i + 6, 'completed')
        }

        return { paymentId }
      } catch (e) {
        const msg = e instanceof Error ? (e as BaseError).shortMessage || e.message : 'Top up failed'

        // If deposit was committed, provide different error messaging
        if (depositCommitted && paymentId) {
          setError(`${msg}. Your deposit (ID: ${paymentId}) was submitted - funds may still arrive.`)
        } else {
          setError(msg)
        }

        // P0-1 FIX: Use ref to get actual current step (not stale closure value)
        const failedStep = currentStepRef.current
        if (failedStep) {
          setStepStatuses(prev => ({ ...prev, [failedStep]: 'error' }))
        }

        throw e
      } finally {
        isLoadingRef.current = false
        currentStepRef.current = null
        setIsLoading(false)
        setCurrentStep(null)
        abortControllerRef.current = null

        // P0-5 FIX: Wrap chain switch in try-catch, never rethrow
        try {
          await switchToChain({ targetChainId: ROFL_PAYMASTER_DESTINATION_CHAIN.id, address })
        } catch {
          // Best-effort chain switch - don't mask the original error
          console.warn('Failed to switch back to destination chain')
        }
      }
    },
    [
      address,
      createDeposit,
      pollPayment,
      updateStep,
      targetToken.contractAddress,
      additionalSteps,
      refetchSapphireNativeBalance,
      waitForSapphireNativeBalanceIncrease,
    ] // P0-1 FIX: Removed currentStep from dependency array (using ref instead)
  )

  return {
    isLoading,
    error,
    quote,
    currentStep: currentStep
      ? currentStep <= progressSteps.length
        ? progressSteps[currentStep - 1]
        : additionalSteps[currentStep - 1 - progressSteps.length]
      : null,
    stepStatuses,
    getQuote,
    startTopUp,
    reset,
    cancel,
    initialLoading: !(!!roseFeed && !!tokenFeed && roseFeedDecimals !== undefined && tokenFeedDecimals !== undefined),
  }
}
