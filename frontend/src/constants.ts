import { base } from "viem/chains";
import { sapphire } from "./wagmi";

export const CONTRACTS = {
  roffle: {
    address: "0x" as `0x${string}`,
    chainId: sapphire.id,
  },
  paymasterVault: {
    address: "0x" as `0x${string}`,
    chainId: base.id,
  },
} as const;
