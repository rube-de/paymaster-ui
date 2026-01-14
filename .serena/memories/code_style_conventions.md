# Code Style & Conventions

## TypeScript/JavaScript

### Formatting (Prettier)
- **Print width**: 110 characters
- **Tab width**: 2 spaces (no tabs)
- **Semicolons**: None (no semicolons)
- **Quotes**: Single quotes
- **Trailing commas**: ES5 style
- **Arrow parens**: Avoid when possible (`x => x` not `(x) => x`)

### ESLint Rules
- TypeScript strict mode enabled
- React Hooks rules enforced
- React Refresh plugin for HMR

### TypeScript Config
- Target: ES2020
- Strict mode enabled
- `noUnusedParameters: true`
- `noFallthroughCasesInSwitch: true`

## React Patterns

### Components
- Functional components with hooks
- shadcn/ui primitives (Radix-based)
- Tailwind CSS for styling
- Use `class-variance-authority` for component variants

### State Management
- wagmi hooks for contract reads (auto-refresh)
- React Query for async state
- No Redux/Zustand - keep it simple

### Web3 Patterns
```typescript
// Typed contract imports
import RoffleJson from '../../artifacts/contracts/Roffle.sol/Roffle.json'
import { Roffle$Type } from '../../artifacts/contracts/Roffle.sol/Roffle.ts'
const typedRoffleJson = RoffleJson as Roffle$Type
// Use typedRoffleJson.abi for type-safe contract calls
```

## Solidity

- Version: 0.8.24
- EVM Version: Paris
- Use Sapphire-specific features for randomness (`Sapphire.randomBytes()`)

## Git Commits

Use conventional commits:
- `feat:` New features
- `fix:` Bug fixes
- `chore:` Maintenance
- `docs:` Documentation
- `test:` Tests
- `refactor:` Code refactoring

**Never mention AI/Claude in commit messages.**

## File Organization
- Components in `src/components/`
- Custom hooks in `src/hooks/`
- Constants/config in `src/constants/`
- Storybook stories in `src/stories/`
