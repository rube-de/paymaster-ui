import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { darkTheme, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { config } from './wagmi.ts'
import { App } from './App.tsx'
import { Toaster } from './components/ui/sonner.tsx'
import './index.css'
import '@rainbow-me/rainbowkit/styles.css'
import { AccountAvatar } from './components/AccountAvatar/index.tsx'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <WagmiProvider config={config}>
    <QueryClientProvider client={queryClient}>
      <RainbowKitProvider
        theme={darkTheme({
          borderRadius: 'medium',
        })}
        modalSize="compact"
        avatar={({ address, size }) => (
          <AccountAvatar diameter={size} account={{ address_eth: address as `0x${string}` }} />
        )}
      >
        <App />
        <Toaster />
      </RainbowKitProvider>
    </QueryClientProvider>
  </WagmiProvider>
)
