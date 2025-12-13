import { FC, ReactNode, useEffect, useState } from 'react'
import { usePaymaster } from '../../hooks/usePaymaster.ts'
import { formatUnits } from 'viem'
import {
  ROFL_PAYMASTER_DESTINATION_CHAIN_TOKEN,
  RoflPaymasterTokenConfig,
} from '../../constants/rofl-paymaster-config.ts'
import { LucideLoader } from 'lucide-react'
import { useAccount, useBalance } from 'wagmi'
import { base } from 'wagmi/chains'

interface Props {
  roseAmountInBaseUnits: bigint
  targetToken: RoflPaymasterTokenConfig
  children: ({ amountLabel }: { amountLabel: string }) => ReactNode
  onSuccess?: () => void
}

export const TopUpButton: FC<Props> = ({
  roseAmountInBaseUnits = 100n * 10n ** BigInt(ROFL_PAYMASTER_DESTINATION_CHAIN_TOKEN.decimals),
  targetToken,
  children,
  onSuccess,
}) => {
  const { address } = useAccount()

  const { data: tokenBalance } = useBalance({
    address,
    token: targetToken.contractAddress,
    chainId: base.id
  })

  const [quote, setQuote] = useState<bigint | null>(null)
  const { isLoading, initialLoading, error, currentStep, getQuote, startTopUp } = usePaymaster(targetToken)

  useEffect(() => {
    const _init = async () => {
      setQuote(
        await getQuote({
          amount: roseAmountInBaseUnits!,
        })
      )
    }

    if (!initialLoading) {
      _init()
    }
  }, [roseAmountInBaseUnits, initialLoading])

  if (initialLoading || !quote || !tokenBalance)
    return (
      <div className="flex justify-center">
        <LucideLoader className="animate-spin" />
      </div>
    )

  const insufficientBalance = tokenBalance.value < quote

  return (
    <>
      {!!quote && (
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
        <div className="text-teal-300 text-center break-words">
          ({currentStep?.id}/5) {currentStep?.label}
        </div>
      )}

      {((!isLoading && error) || insufficientBalance) && (
        <p className="text-warning text-center break-words">
          {insufficientBalance && `Insufficient $${targetToken.symbol} balance`}
          {error && error.length > 150 ? `${error.slice(0, 150)}...` : error}
        </p>
      )}
    </>
  )
}
