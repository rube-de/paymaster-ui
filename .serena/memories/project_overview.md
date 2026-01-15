# Project Overview: paymaster-ui

## Purpose
Oasis Bridge - A cross-chain payment interface powered by ROFL Paymaster. Enables users to bridge USDC/USDT on Base to ROSE on Sapphire for seamless cross-chain transactions.

**Production**: https://bridge.oasis.io/

## Tech Stack

### Smart Contracts
- **Language**: Solidity 0.8.24 (Paris EVM)
- **Framework**: Hardhat with viem toolbox
- **Platform**: Oasis Sapphire (confidential EVM)
- **Key deps**: `@oasisprotocol/sapphire-contracts`

### Frontend
- **Framework**: React 18/19 + Vite
- **Styling**: Tailwind CSS v4 + shadcn/ui (Radix primitives)
- **Web3**: wagmi v2 + viem + RainbowKit
- **State**: React Query + wagmi hooks
- **Forms**: react-hook-form + zod validation
- **Testing**: Vitest + Playwright + Storybook

## Project Structure

```
paymaster-ui/
├── contracts/           # Solidity contracts
│   ├── Roffle.sol       # Main raffle contract
│   └── interfaces/      # Contract interfaces
├── tasks/               # Hardhat tasks
│   └── deploy.ts        # Deployment script
├── frontend/            # React application
│   └── src/
│       ├── components/  # shadcn/ui components
│       ├── hooks/       # Custom hooks (usePaymaster, etc.)
│       ├── constants/   # Config (rofl-paymaster-config.ts)
│       ├── contracts/   # ABI imports
│       ├── lib/         # Utilities
│       └── stories/     # Storybook stories
├── hardhat.config.ts    # Hardhat configuration
└── package.json         # Root package (contracts)
```

## Networks

| Network | Chain ID | RPC |
|---------|----------|-----|
| Sapphire Mainnet | 23294 (0x5afe) | https://sapphire.oasis.io |
| Sapphire Testnet | 23295 (0x5aff) | https://testnet.sapphire.oasis.io |
| Sapphire Localnet | 23293 (0x5afd) | http://localhost:8545 |
| Base | 8453 | (default) |

## Cross-Chain Payment Flow (ROFL Paymaster)
1. User on Base: USDC/USDT → PaymasterVault
2. ROFL relayer detects deposit
3. CrossChainPaymaster on Sapphire mints equivalent ROSE
4. User can now buy raffle tickets on Sapphire

## Key Files
- `frontend/src/App.tsx` - Main UI with raffle logic
- `frontend/src/wagmi.ts` - Wallet configuration
- `frontend/src/hooks/usePaymaster.ts` - Cross-chain payment flow
- `frontend/src/constants/rofl-paymaster-config.ts` - Paymaster addresses
