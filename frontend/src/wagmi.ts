import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { defineChain } from 'viem'

export const sapphire = defineChain({
  id: 0x5afe,
  name: 'Sapphire',
  nativeCurrency: {
    decimals: 18,
    name: 'Sapphire',
    symbol: 'ROSE',
  },
  rpcUrls: {
    default: {
      http: ['https://sapphire.oasis.io'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Oasis Explorer',
      url: 'https://explorer.oasis.io/mainnet/sapphire',
    },
  },
});

export const sapphireTestnet = defineChain({
  id: 0x5aff,
  name: 'Sapphire Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Sapphire Testnet',
    symbol: 'TEST',
  },
  rpcUrls: {
    default: {
      http: ['https://testnet.sapphire.oasis.io'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Oasis Explorer',
      url: 'https://explorer.oasis.io/testnet/sapphire',
    },
  },
});

export const sapphireLocalnet = defineChain({
	id: 0x5afd,
	name: 'Sapphire Localnet',
	nativeCurrency: {
		decimals: 18,
		name: 'TEST',
		symbol: 'TEST'
	},
	rpcUrls: {
		default: {
			http: ['http://localhost:8545']
		},
		public: {
			http: ['http://localhost:8545']
		}
	}
});

export const config = getDefaultConfig({
  appName: 'Xmas Raffle',
  projectId: '5c76ff8764ea097205fffc221f056c98',
  // TODO: mainnet
  chains: [sapphireLocalnet],
  ssr: false,
  batch: {
    multicall: false,
  },
});

