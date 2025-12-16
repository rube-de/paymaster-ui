import { connectorsForWallets } from '@rainbow-me/rainbowkit'
import { defineChain, http } from 'viem'
import { sapphire, base } from 'wagmi/chains'
import { Config, createConfig } from 'wagmi'
import { metaMaskWallet, rabbyWallet, walletConnectWallet } from '@rainbow-me/rainbowkit/wallets'

export const sapphireLocalnet = defineChain({
  id: 0x5afd,
  name: 'Sapphire Localnet',
  nativeCurrency: {
    decimals: 18,
    name: 'TEST',
    symbol: 'TEST',
  },
  rpcUrls: {
    default: {
      http: ['http://localhost:8545'],
    },
    public: {
      http: ['http://localhost:8545'],
    },
  },
})

const connectors = connectorsForWallets(
  [
    {
      groupName: 'Recommended',
      wallets: [metaMaskWallet, walletConnectWallet, rabbyWallet],
    },
  ],
  {
    appName: 'Xmas Roffle',
    projectId: '5c76ff8764ea097205fffc221f056c98',
  }
)

export const config: Config = createConfig({
  chains: [
    {
      ...sapphire,
      name: 'Sapphire',
      iconUrl: 'https://assets.oasis.io/logotypes/metamask-oasis-sapphire.png',
    },
    base,
  ],
  connectors,
  transports: {
    [sapphire.id]: http(),
    [base.id]: http(),
  },
  multiInjectedProviderDiscovery: false, // Disable auto-discovery of injected providers
  ssr: false,
  batch: {
    multicall: false,
  },
})
