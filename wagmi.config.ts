import { defineConfig } from "@wagmi/cli";
import { hardhat, react } from "@wagmi/cli/plugins";

export default defineConfig([
  {
    out: "frontend/src/hooks/generated/roffle.ts",
    plugins: [
      hardhat({
        project: ".",
        include: ["Roffle.sol/Roffle.json"],
      }),
      react(),
    ],
  },
  {
    out: "frontend/src/hooks/generated/paymasterVault.ts",
    plugins: [
      hardhat({
        project: "../rofl-paymaster/contracts",
        include: ["remote/PaymasterVault.sol/PaymasterVault.json"],
      }),
      react(),
    ],
  },
]);
