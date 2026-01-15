# Suggested Commands

## Development

### Start Frontend Dev Server
```bash
yarn dev  # Compiles contracts first, then starts Vite dev server
```

### Start Localnet (for local testing)
```bash
docker run -it -p8544-8548:8544-8548 ghcr.io/oasisprotocol/sapphire-localnet
```

## Building

### Build Everything
```bash
yarn build
```

### Build Separately
```bash
yarn build:contracts      # Hardhat compile
yarn build:frontend       # Vite production build
```

## Frontend Commands (run from `frontend/` directory)

### Code Quality
```bash
yarn lint                 # ESLint
yarn prettier-check       # Prettier check
yarn prettier             # Auto-format with Prettier
yarn checkTs              # TypeScript type check
```

### Testing & Storybook
```bash
yarn storybook            # Start Storybook dev server
yarn build-storybook      # Build static Storybook
yarn test-storybook       # Run Storybook tests
```

## Smart Contract Commands

### Testing
```bash
npx hardhat test                        # Run all tests
npx hardhat test test/Roffle.ts         # Run specific test
```

### Compilation
```bash
npx hardhat compile
```

### Deployment
```bash
# Testnet
npx hardhat deploy --network sapphire-testnet

# Mainnet with verification
npx hardhat deploy --network sapphire --verify
```

## Git & Utilities (Darwin/macOS)
```bash
git status
git diff
git log --oneline -10
rg "pattern"              # ripgrep (prefer over grep)
fd "pattern"              # fd-find (prefer over find)
bat file.ts               # cat with syntax highlighting
eza -la                   # ls with better formatting
```

## Package Manager
Project uses **yarn** (v1.22.22) as specified in frontend/package.json.
