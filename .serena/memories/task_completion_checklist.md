# Task Completion Checklist

When completing a task in this project, verify the following:

## Code Quality Checks (Frontend)

Run from `frontend/` directory:

1. **TypeScript** - No type errors
   ```bash
   yarn checkTs
   ```

2. **ESLint** - No linting errors
   ```bash
   yarn lint
   ```

3. **Prettier** - Code is formatted
   ```bash
   yarn prettier-check
   # or auto-fix:
   yarn prettier
   ```

## Contract Changes

If you modified contracts:

1. **Compile** - Contracts compile successfully
   ```bash
   npx hardhat compile
   ```

2. **Tests** - All tests pass
   ```bash
   npx hardhat test
   ```

## Before Committing

1. Run the build to ensure everything works:
   ```bash
   yarn build
   ```

2. Check for any uncommitted changes:
   ```bash
   git status
   git diff
   ```

3. Use conventional commit messages

## Deployment Considerations

- Test on `sapphire-testnet` before mainnet
- Verify contracts after deployment with `--verify` flag
- Update `rofl-paymaster-config.ts` if addresses change
