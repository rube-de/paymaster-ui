import { FC, ReactNode, useEffect, useState } from 'react'
import { PROGRESS_STEP_COUNT, ProgressStepWithAction, usePaymaster } from '../../hooks/usePaymaster.ts'
import { formatUnits } from 'viem'
import {
  RoflPaymasterTokenConfig,
  ROFL_PAYMASTER_SLIPPAGE_PERCENTAGE,
} from '../../constants/rofl-paymaster-config.ts'
import { LucideLoader } from 'lucide-react'
import { useAccount, useBalance } from 'wagmi'
import { base } from 'wagmi/chains'
import { useCountdownTimer } from '../../hooks/useCountdownTimer.ts'

interface Props {
  roseAmountInBaseUnits: bigint
  targetToken: RoflPaymasterTokenConfig
  children: ({ amountLabel }: { amountLabel: string }) => ReactNode
  additionalSteps: ProgressStepWithAction[]
  onSuccess?: () => void
  onLoadingChange?: (isLoading: boolean) => void
}

export const TopUpButton: FC<Props> = ({
  roseAmountInBaseUnits,
  targetToken,
  children,
  additionalSteps = [],
  onSuccess,
  onLoadingChange,
}) => {
  const { address } = useAccount()

  const { data: tokenBalance } = useBalance({
    address,
    token: targetToken.contractAddress,
    chainId: base.id,
  })

  const [quote, setQuote] = useState<bigint | null>(null)
  const [showFullError, setShowFullError] = useState(false)
  const {
    isLoading,
    initialLoading,
    error,
    currentStep,
    getQuote,
    startTopUp,
    pendingRecovery,
    resumeRecovery,
    dismissRecovery,
  } = usePaymaster(targetToken, additionalSteps)

  const countdown = useCountdownTimer({
    initialTimeInSeconds: currentStep?.expectedTimeInSeconds || 0,
  })

  useEffect(() => {
    const _init = async () => {
      setQuote(
        await getQuote({
          amount: roseAmountInBaseUnits!,
        })
      )
    }

    if (!initialLoading && targetToken) {
      _init()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Ignore getQuote
  }, [roseAmountInBaseUnits, initialLoading, targetToken])

  useEffect(() => {
    onLoadingChange?.(isLoading)
  }, [onLoadingChange, isLoading])

  // Reset error expansion when error changes
  useEffect(() => {
    setShowFullError(false)
  }, [error])

  useEffect(() => {
    const expected = currentStep?.expectedTimeInSeconds ?? 0

    if (isLoading && currentStep && expected > 0) {
      countdown.reset()
      countdown.start()
      return
    }

    countdown.stop()
    // eslint-disable-next-line react-hooks/exhaustive-deps -- ignore countdown methods
  }, [isLoading, currentStep?.id, currentStep?.expectedTimeInSeconds])

  if (initialLoading || !quote || !tokenBalance)
    return (
      <div className="flex justify-center">
        <LucideLoader className="animate-spin" />
      </div>
    )

  const insufficientBalance = tokenBalance.value < quote

  // Calculate exchange rate: how much token per 1 ROSE
  // quote is in token units (e.g. 6 decimals for USDC)
  // roseAmountInBaseUnits is in wei (18 decimals)
  // Rate = quote / roseAmount, scaled to show per 1 ROSE
  const ratePerRose =
    roseAmountInBaseUnits > 0n
      ? Number(formatUnits(quote, targetToken.decimals)) /
        Number(formatUnits(roseAmountInBaseUnits, 18))
      : 0

  return (
    <>
      {/* Recovery UI for interrupted transactions */}
      {pendingRecovery && !isLoading && (
        <div className="bg-[rgba(255,200,100,0.15)] border border-[rgba(255,200,100,0.3)] rounded-[12px] p-4 mb-4">
          <p className="text-[rgba(255,200,100,1)] text-sm font-medium mb-2">
            Pending transaction found
          </p>
          <p className="text-[rgba(255,255,255,0.7)] text-xs mb-3">
            A deposit of {formatUnits(BigInt(pendingRecovery.amount), targetToken.decimals)} {pendingRecovery.tokenSymbol} is waiting for confirmation.
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              className="flex-1 bg-[rgba(255,200,100,0.2)] hover:bg-[rgba(255,200,100,0.3)] text-[rgba(255,200,100,1)] px-3 py-2 rounded-[8px] text-sm font-medium transition-colors"
              onClick={async () => {
                await resumeRecovery()
                onSuccess?.()
              }}
            >
              Resume
            </button>
            <button
              type="button"
              className="flex-1 bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.15)] text-[rgba(255,255,255,0.7)] px-3 py-2 rounded-[8px] text-sm transition-colors"
              onClick={dismissRecovery}
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {!!quote && !isLoading && !pendingRecovery && (
        <div className="text-center text-sm text-[rgba(255,255,255,0.6)] mb-2">
          <span>1 ROSE ≈ {ratePerRose.toFixed(4)} {targetToken.symbol}</span>
          <span className="text-[rgba(255,255,255,0.4)]"> ({ROFL_PAYMASTER_SLIPPAGE_PERCENTAGE.toString()}% slippage included)</span>
        </div>
      )}

      {!!quote && !pendingRecovery && (
        <button
          className="bg-white hover:bg-gray-100 disabled:bg-gray-500 transition-colors flex h-[64px] items-center justify-center px-4 py-2 rounded-[12px] w-full"
          disabled={isLoading || insufficientBalance}
          onClick={async () => {
            await startTopUp({
              amount: quote,
            })

            onSuccess?.()
          }}
        >
          <p className="font-medium leading-[20px] text-[16px] text-black text-center">
            {isLoading && !error ? (
              <LucideLoader className="animate-spin" />
            ) : (
              children({ amountLabel: `${formatUnits(quote, targetToken.decimals)} $${targetToken.symbol}` })
            )}
          </p>
        </button>
      )}

      {isLoading && !!quote && currentStep && (
        <div className="text-center break-words">
          <p className="text-teal-300">
            ({currentStep?.id}/{PROGRESS_STEP_COUNT + additionalSteps.length}) {currentStep?.label}
          </p>

          {!!currentStep.expectedTimeInSeconds && currentStep.expectedTimeInSeconds > 0 && (
            <div className={`text-xs mt-1 ${countdown.isNegative ? 'text-warning' : 'text-teal-200/80'}`}>
              {countdown.isNegative
                ? `Est. time reached. Overdue by ${countdown.formattedTime.replace('-', '')}`
                : `Est. time left: ${countdown.formattedTime}`}
            </div>
          )}
        </div>
      )}

      {((!isLoading && error) || insufficientBalance) && (
        <div className="text-warning text-center break-words">
          {insufficientBalance && <p>Insufficient ${targetToken.symbol} balance</p>}
          {error && (
            <p>
              {error.length > 150 && !showFullError ? (
                <>
                  {error.slice(0, 150)}...{' '}
                  <button
                    type="button"
                    className="text-teal-300 underline hover:text-teal-200"
                    onClick={() => setShowFullError(true)}
                  >
                    Show more
                  </button>
                </>
              ) : (
                <>
                  {error}
                  {error.length > 150 && (
                    <>
                      {' '}
                      <button
                        type="button"
                        className="text-teal-300 underline hover:text-teal-200"
                        onClick={() => setShowFullError(false)}
                      >
                        Show less
                      </button>
                    </>
                  )}
                </>
              )}
            </p>
          )}
        </div>
      )}
    </>
  )
}
