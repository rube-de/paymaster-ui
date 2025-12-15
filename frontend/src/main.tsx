import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { darkTheme, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { config } from './wagmi.ts'
import { App } from './App.tsx'
import './index.css'
import '@rainbow-me/rainbowkit/styles.css'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <WagmiProvider config={config}>
    <QueryClientProvider client={queryClient}>
      <RainbowKitProvider
        theme={darkTheme({
          borderRadius: 'medium',
        })}
        modalSize="compact"
      >
        <App />
      </RainbowKitProvider>
    </QueryClientProvider>
  </WagmiProvider>
)
