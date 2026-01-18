# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Oasis Xmas Roffle - A raffle dApp where users buy tickets with ROSE to win a share of the prize pool. Integrates ROFL Paymaster for cross-chain payments (USDC/USDT on Base → ROSE on Sapphire).

Production: https://roffle.oasis.io/

## Commands

### Development
```bash
# Start frontend dev server (compiles contracts first)
yarn dev

# Build everything
yarn build

# Build separately
yarn build:contracts      # Hardhat compile
yarn build:frontend       # Vite build
```

### Frontend (in frontend/)
```bash
yarn dev                  # Dev server
yarn build               # Production build
yarn checkTs             # TypeScript check
yarn lint                # ESLint
yarn prettier-check      # Prettier check
yarn prettier            # Auto-format
yarn storybook           # Component storybook
```

### Contracts
```bash
npx hardhat test                           # Run tests
npx hardhat test test/Roffle.ts            # Single test file
npx hardhat compile                        # Compile contracts

# Deploy (uses tasks/deploy.ts)
npx hardhat deploy:roffle --network sapphire-testnet
npx hardhat deploy:roffle --network sapphire --verify
```

### Local Development
```bash
# Run Sapphire localnet
docker run -it -p8544-8548:8544-8548 ghcr.io/oasisprotocol/sapphire-localnet
```

### Worktree Setup
For each new git worktree, run:
```bash
npx husky install        # Enable pre-commit hooks
```

## Architecture

### Monorepo Structure
- **Root**: Hardhat config, contract compilation, deployment tasks
- **contracts/**: Solidity contracts (Roffle.sol)
- **frontend/**: React + Vite + Tailwind + shadcn/ui component library

### Smart Contract (contracts/Roffle.sol)
Sapphire-native raffle using hardware-backed randomness:
- Fixed ticket price (250 ROSE), max 10 per wallet, 3600 total
- 10 winners with tiered prize distribution (50%, 20%, 10%, etc.)
- Owner can add OPF contribution to prize pool
- `selectWinnersAndDistribute()` uses `Sapphire.randomBytes()` for fair selection

### Frontend Architecture
- **Wallet**: RainbowKit + wagmi + viem (Sapphire mainnet + Base)
- **State**: React hooks with wagmi contract reads (auto-refresh 60s)
- **UI**: shadcn/ui components (Radix primitives + Tailwind)

Key flows:
1. **Direct ROSE purchase**: Buy tickets directly on Sapphire
2. **Cross-chain purchase**: USDC/USDT on Base → ROFL Paymaster → ROSE on Sapphire → buy tickets

### ROFL Paymaster Integration
Cross-chain payment system enabling stablecoin purchases:

- **Source**: Base (USDC/USDT) → PaymasterVault contract
- **Destination**: Sapphire (ROSE) via CrossChainPaymaster

Config in `frontend/src/constants/rofl-paymaster-config.ts`:
- PaymasterVault on Base: `0x7D3B4dd07bd523E519e0A91afD8e3B325586fb5b`
- CrossChainPaymaster on Sapphire: `0x6997953a4458F019506370110e84eefF52d375ad`

Flow (`usePaymaster` hook):
1. Switch to Base
2. Approve ERC20 spend
3. Deposit to PaymasterVault
4. Poll for payment confirmation (~60s)
5. Switch to Sapphire
6. Execute final action (buy tickets)

### Contract Interaction Patterns
Contract reads use wagmi hooks with typed ABIs:
```typescript
import RoffleJson from '../../artifacts/contracts/Roffle.sol/Roffle.json'
import { Roffle$Type } from '../../artifacts/contracts/Roffle.sol/Roffle.ts'

const typedRoffleJson = RoffleJson as Roffle$Type
// Use typedRoffleJson.abi for type-safe contract calls
```

### Networks
| Network | Chain ID | RPC |
|---------|----------|-----|
| Sapphire Mainnet | 0x5afe (23294) | https://sapphire.oasis.io |
| Sapphire Testnet | 0x5aff (23295) | https://testnet.sapphire.oasis.io |
| Sapphire Localnet | 0x5afd (23293) | http://localhost:8545 |
| Base | 8453 | (default) |

## Key Files

- `hardhat.config.ts` - Network configs, Solidity 0.8.24, Paris EVM
- `tasks/deploy.ts` - Deployment task with OPF contribution
- `frontend/src/App.tsx` - Main UI with all raffle logic
- `frontend/src/wagmi.ts` - Wallet config (MetaMask, WalletConnect, Rabby)
- `frontend/src/hooks/usePaymaster.ts` - Cross-chain payment flow
- `frontend/src/constants/rofl-paymaster-config.ts` - Paymaster addresses

## Environment Variables

```bash
PRIVATE_KEY=0x...  # Deployer private key (or uses test mnemonic)
```

## Task Tracking (Beads)

Use `bd` for persistent task tracking across sessions.

### Essential Commands
```bash
bd ready                  # Show tasks ready to work on (no blockers)
bd create --title="..."   # Create new task
bd list --status=open     # List open issues
bd show <id>              # View task details
bd close <id>             # Mark complete
bd sync                   # Sync beads changes with git
```

### Workflow
- Check `bd ready` at session start for available work
- Use `bd create` for multi-session work, TodoWrite for single-session tasks
- Run `bd sync` before committing code changes
