# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Package Manager

**IMPORTANT**: This project uses **yarn** as the package manager. Do NOT use npm or npx.

- Use `yarn` for installing dependencies
- Use `yarn <script>` for running scripts (e.g., `yarn checkTs`, `yarn lint`)

## Project Overview

Oasis Bridge - A cross-chain bridge dApp that enables users to bridge stablecoins from Base, Arbitrum, and Ethereum to receive ROSE on Oasis Sapphire. Powered by ROFL Paymaster for secure cross-chain payments.

Production: https://roffle.oasis.io/

## Commands

### Development
```bash
yarn dev      # Start frontend dev server
yarn build    # Production build
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

### Worktree Setup
For each new git worktree, run:
```bash
yarn                     # Install dependencies
npx husky install        # Enable pre-commit hooks
```

## Architecture

### Project Structure
- **Root**: Workspace config, husky hooks
- **frontend/**: React + Vite + Tailwind + shadcn/ui component library

### Frontend Architecture
- **Wallet**: RainbowKit + wagmi + viem (Sapphire mainnet + Base + Arbitrum + Ethereum)
- **State**: React hooks with wagmi contract reads
- **UI**: shadcn/ui components (Radix primitives + Tailwind)

Key flow:
- **Cross-chain bridge**: USDC/USDT on source chain → ROFL Paymaster → ROSE on Sapphire

### ROFL Paymaster Integration
Cross-chain payment system enabling stablecoin purchases:

- **Source chains**: Base, Arbitrum, Ethereum (USDC/USDT) → PaymasterVault contract
- **Destination**: Sapphire (ROSE) via CrossChainPaymaster

Config in `frontend/src/constants/rofl-paymaster-config.ts`

Flow (`usePaymaster` hook):
1. Switch to source chain
2. Approve ERC20 spend
3. Deposit to PaymasterVault
4. Poll for payment confirmation (~60s)
5. Switch to Sapphire
6. Execute final action

### Networks
| Network | Chain ID | RPC |
|---------|----------|-----|
| Sapphire Mainnet | 0x5afe (23294) | https://sapphire.oasis.io |
| Base | 8453 | (default) |
| Arbitrum | 42161 | (default) |
| Ethereum | 1 | (default) |

## Key Files

- `frontend/src/App.tsx` - Main UI
- `frontend/src/wagmi.ts` - Wallet config (MetaMask, WalletConnect, Rabby)
- `frontend/src/hooks/usePaymaster.ts` - Cross-chain payment flow
- `frontend/src/constants/rofl-paymaster-config.ts` - Paymaster addresses

## Git Commit Messages

Uses `gitlint` - keep all lines under **80 characters** (subject under 50).

## GitHub PR Comments

Reply to PR review comments using the gh CLI:
```bash
gh api repos/{owner}/{repo}/pulls/{pr}/comments/{comment_id}/replies -X POST -f body="Your reply"
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
