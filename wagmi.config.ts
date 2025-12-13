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
]);
