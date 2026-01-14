import { useState } from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import svgPaths from './imports/svg-tho7mppomn'
import { useAccount, useBalance, useConfig } from 'wagmi'
import { formatEther, parseEther } from 'viem'
import { base, sapphire } from 'wagmi/chains'
import { ROFL_PAYMASTER_TOKEN_CONFIG } from './constants/rofl-paymaster-config.ts'
import { DropdownSelect } from './components/DropdownSelect'
import { ROSEIcon } from './components/icons/RoseIcon.tsx'
import { IconCenter } from './components/icons/IconCenter.tsx'
import { USDTIcon } from './components/icons/USDTIcon.tsx'
import { USDCIcon } from './components/icons/USDCIcon.tsx'
import { CustomConnectButton } from './CustomConnectButton.tsx'
import { TopUpButton } from './components/TopUpButton'

type PayInOption = 'USDT_BASE' | 'USDC_BASE'

const ROSE_AMOUNT_OPTIONS = [
  { value: '10', label: '10 ROSE', roseAmount: parseEther('10') },
  { value: '50', label: '50 ROSE', roseAmount: parseEther('50') },
  { value: '100', label: '100 ROSE', roseAmount: parseEther('100') },
  { value: '250', label: '250 ROSE', roseAmount: parseEther('250') },
  { value: '500', label: '500 ROSE', roseAmount: parseEther('500') },
  { value: '1000', label: '1,000 ROSE', roseAmount: parseEther('1000') },
]

export function App() {
  const acc = useAccount()
  const { chains: wagmiChains } = useConfig()
  // Treat wrong chain as unconnected otherwise user might send tokens to malicious contract on another chain
  const isConnected =
    acc.isConnected && acc.chainId !== undefined && wagmiChains.some(chain => chain.id === acc.chainId)

  const [roseAmount, setRoseAmount] = useState<string>('100')
  const [payIn, setPayIn] = useState<PayInOption>('USDC_BASE')
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const roseBalance = useBalance({
    address: acc.address,
    chainId: sapphire.id,
    query: {
      refetchInterval: 60_000,
    },
  })

  const selectedRoseOption = ROSE_AMOUNT_OPTIONS.find(o => o.value === roseAmount)
  const roseAmountInBaseUnits = selectedRoseOption?.roseAmount ?? parseEther('100')

  const handleSuccess = () => {
    setShowSuccess(true)
    setIsLoading(false)
    roseBalance.refetch()
  }

  const handleBridgeMore = () => {
    setShowSuccess(false)
  }

  return (
    <div
      className="relative w-full min-h-screen flex flex-col font-['Geist',Helvetica]"
      style={{
        background: 'radial-gradient(50% 50% at 50% 50%, #19323C 0%, #0A1D24 100%)',
      }}
    >
      {/* Header */}
      <header className="relative z-20 flex items-start justify-between px-4 md:px-10 py-6 gap-4">
        <div className="flex items-center gap-3 md:gap-[24px] shrink-0 h-[48px]">
          {/* Logo */}
          <div className="h-[40px] w-[110px] md:h-[48px] md:w-[131px] shrink-0">
            <a href="/" className="block">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 131 48">
                <g id="Union">
                  <path clipRule="evenodd" d={svgPaths.p1f562c00} fill="white" fillRule="evenodd" />
                  <path clipRule="evenodd" d={svgPaths.p2b736500} fill="white" fillRule="evenodd" />
                  <path d={svgPaths.p1bd1ab00} fill="white" />
                  <path d={svgPaths.p2a757eb0} fill="white" />
                  <path clipRule="evenodd" d={svgPaths.p3d36a900} fill="white" fillRule="evenodd" />
                  <path d={svgPaths.p19eb9c00} fill="white" />
                </g>
              </svg>
            </a>
          </div>

          {/* Separator */}
          <div className="hidden sm:block h-6 w-px bg-[rgba(255,255,255,0.1)]" />

          {/* Sapphire Balance */}
          {isConnected && roseBalance.data && (
            <div className="hidden sm:flex items-center gap-2">
              <IconCenter>
                <ROSEIcon />
              </IconCenter>
              <span className="text-[16px] font-normal leading-5">
                <span className="text-white">
                  {parseFloat(formatEther(roseBalance.data.value)).toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })}{' '}
                  ROSE
                </span>
                <span className="text-[rgba(255,255,255,0.5)]"> on Sapphire</span>
              </span>
            </div>
          )}
        </div>

        {/* Wallet */}
        <div className="styledConnect shrink-0">
          <CustomConnectButton />
        </div>
      </header>

      {/* Mobile Balance */}
      {isConnected && roseBalance.data && (
        <div className="sm:hidden relative z-20 flex items-center justify-center gap-2 px-4 -mt-2 mb-4">
          <IconCenter>
            <ROSEIcon />
          </IconCenter>
          <span className="text-[16px] font-normal leading-5">
            <span className="text-white">
              {parseFloat(formatEther(roseBalance.data.value)).toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })}{' '}
              ROSE
            </span>
            <span className="text-[rgba(255,255,255,0.5)]"> on Sapphire</span>
          </span>
        </div>
      )}

      {/* Main Content Area */}
      <main className="relative flex-1 flex flex-col items-center justify-center px-4 py-20 md:py-0">
        <div className="w-full max-w-[400px] mx-auto">
          {showSuccess ? (
            <div className="flex flex-col gap-10 p-6 md:p-8 animate-in fade-in zoom-in-95 duration-300">
              <div className="flex flex-col gap-8 items-center">
                <div className="flex flex-col gap-4 items-center text-center">
                  <p className="font-['Geist',sans-serif] leading-[normal] text-[36px] md:text-[48px] text-white font-semibold">
                    Bridge Successful!
                  </p>
                  <p className="font-normal leading-[20px] text-[16px] text-[rgba(255,255,255,0.6)]">
                    Your ROSE has been bridged to Sapphire. Check your balance above.
                  </p>
                </div>
                <button
                  onClick={handleBridgeMore}
                  className="bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.15)] transition-colors flex h-[64px] items-center justify-center px-4 py-2 rounded-[12px] w-full"
                >
                  <p className="font-medium leading-[20px] text-[16px] text-white">Bridge more</p>
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-4 items-center">
              <div className="flex flex-col gap-4 items-center text-center">
                <p className="font-['Geist',sans-serif] text-[40px] leading-[48px] md:text-[56px] md:leading-[64px] text-white font-semibold">
                  Oasis Bridge
                </p>
                <p className="font-normal leading-[20px] text-[16px] text-[rgba(255,255,255,0.6)]">
                  Bridge stablecoins from Base to ROSE on Sapphire.
                  <br />
                  Powered by ROFL Paymaster.
                </p>
              </div>

              {!isConnected ? (
                <div className="styledConnect bigButton [&_button]:w-full w-full max-w-[400px] mt-4">
                  <ConnectButton />
                </div>
              ) : (
                <div className="flex flex-col gap-6 mt-4 w-full">
                  <div className="flex flex-col gap-4">
                    {/* ROSE Amount Selector */}
                    <div className="flex flex-col gap-1">
                      <p className="font-medium leading-[20px] text-[14px] text-white">Amount to receive</p>
                      <DropdownSelect
                        ariaLabel="Select ROSE amount"
                        value={roseAmount}
                        onChange={setRoseAmount}
                        disabled={isLoading}
                        options={ROSE_AMOUNT_OPTIONS.map(o => ({
                          value: o.value,
                          label: o.label,
                        }))}
                      />
                    </div>

                    {/* Payment Token */}
                    <div className="flex flex-col gap-1">
                      <p className="font-medium leading-[20px] text-[14px] text-white">Pay with</p>
                      <DropdownSelect
                        ariaLabel="Select payment token"
                        value={payIn}
                        onChange={setPayIn}
                        disabled={isLoading}
                        options={[
                          {
                            value: 'USDC_BASE',
                            label: 'USDC',
                            subLabel: 'on Base',
                            leading: (
                              <IconCenter>
                                <USDCIcon />
                              </IconCenter>
                            ),
                          },
                          {
                            value: 'USDT_BASE',
                            label: 'USDT',
                            subLabel: 'on Base',
                            leading: (
                              <IconCenter>
                                <USDTIcon />
                              </IconCenter>
                            ),
                          },
                        ]}
                      />
                    </div>
                  </div>

                  <TopUpButton
                    roseAmountInBaseUnits={roseAmountInBaseUnits}
                    targetToken={
                      ROFL_PAYMASTER_TOKEN_CONFIG[base.id].TOKENS.find(
                        t => t.symbol === (payIn === 'USDC_BASE' ? 'USDC' : 'USDT')
                      )!
                    }
                    onSuccess={handleSuccess}
                    additionalSteps={[]}
                    onLoadingChange={setIsLoading}
                  >
                    {({ amountLabel }) => `Bridge for ${amountLabel}`}
                  </TopUpButton>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Footer Links */}
      <footer className="relative z-10 px-4 lg:px-10 pb-4 lg:pb-6">
        <div className="flex flex-col font-normal gap-4 items-center lg:grid lg:grid-cols-3 leading-[20px] text-[14px] text-center text-white">
          <div className="flex flex-row justify-between w-full gap-4 order-2 lg:order-1 lg:justify-start lg:w-auto">
            <span className="[text-underline-position:from-font] decoration-none text-muted-foreground">
              <span className="lg:hidden">Copyright © OPF 2025</span>
              <span className="hidden lg:inline">Copyright © Oasis Protocol Foundation 2025</span>
            </span>
            <span>
              <a
                href="https://github.com/oasisprotocol/oasis-bridge"
                target="_blank"
                rel="noopener noreferrer"
                className="lg:hidden cursor-pointer [text-underline-position:from-font] text-muted-foreground decoration-solid underline hover:opacity-80 transition-opacity"
              >
                GitHub
              </a>
              <span className="lg:hidden text-muted-foreground">&nbsp;|&nbsp;</span>
              <a
                href="https://oasis.io/"
                target="_blank"
                rel="noopener noreferrer"
                className="lg:hidden cursor-pointer [text-underline-position:from-font] text-muted-foreground decoration-solid underline hover:opacity-80 transition-opacity"
              >
                Oasis
              </a>
            </span>
          </div>
          <a
            href="https://docs.oasis.io/build/rofl/"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer [text-underline-position:from-font] decoration-solid underline hover:opacity-80 transition-opacity order-1 lg:order-2"
          >
            Learn about ROFL
          </a>
          <div className="hidden lg:flex lg:order-3 justify-end">
            <a
              href="https://github.com/oasisprotocol/oasis-bridge"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:block cursor-pointer [text-underline-position:from-font] text-muted-foreground decoration-solid underline hover:opacity-80 transition-opacity lg:text-right"
            >
              GitHub
            </a>
            <span className="hidden lg:inline text-muted-foreground">&nbsp;|&nbsp;</span>
            <a
              href="https://oasis.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:block cursor-pointer [text-underline-position:from-font] text-muted-foreground decoration-solid underline hover:opacity-80 transition-opacity lg:text-right"
            >
              Oasis
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
