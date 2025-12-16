import { ConnectButton } from '@rainbow-me/rainbowkit'
import { ChevronDown, Wallet } from 'lucide-react'
import { AccountAvatar } from './components/AccountAvatar/index.tsx'

export const CustomConnectButton = () => {
  return (
    <ConnectButton.Custom>
      {({ account, chain, openAccountModal, openChainModal, mounted }) => {
        const connected = mounted && account && chain
        return (
          <div
            {...(!mounted && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return <ConnectButton />
              }
              if (chain.unsupported) {
                return <ConnectButton />
              }
              return (
                <div className="inline-flex items-center rounded-xl shadow-sm">
                  {/* Chain Selector */}
                  <button
                    onClick={openChainModal}
                    className="h-12 px-3 rounded-xl flex items-center gap-2 text-white hover:bg-white/10 active:bg-white/15 transition-colors duration-200"
                    type="button"
                  >
                    {chain.hasIcon && chain.iconUrl && (
                      <img
                        alt={chain.name ?? 'Chain icon'}
                        src={chain.iconUrl}
                        className="w-[24px] h-[24px] rounded-full"
                      />
                    )}
                    <span className="text-[16px] font-medium leading-5 hidden sm:inline">{chain.name}</span>
                    <ChevronDown className="w-4 h-4 text-white/60" strokeWidth={2} />
                  </button>

                  {/* Separator */}
                  <div className="w-px h-6 bg-gray-600 mx-2" />

                  {/* Wallet Balance */}
                  <div className="hidden md:flex h-12 px-3 items-center gap-2 text-white">
                    <Wallet className="w-5 h-5 text-white" strokeWidth={2} />
                    <span className="text-[16px] font-normal leading-5">{account.displayBalance}</span>
                  </div>

                  {/* Separator */}
                  <div className="hidden md:block w-px h-6 bg-gray-600 mx-2" />

                  {/* Account Button */}
                  <button
                    onClick={openAccountModal}
                    className="h-12 px-3 rounded-xl flex items-center gap-2 text-white hover:bg-white/10 active:bg-white/15 transition-colors duration-200"
                    type="button"
                  >
                    <AccountAvatar
                      diameter={24}
                      account={{ address_eth: account.address as `0x${string}` }}
                    />
                    <span className="text-[16px] font-medium leading-5 hidden sm:inline">
                      {account.displayName}
                    </span>
                    <ChevronDown className="w-4 h-4 text-white/60" strokeWidth={2} />
                  </button>
                </div>
              )
            })()}
          </div>
        )
      }}
    </ConnectButton.Custom>
  )
}
