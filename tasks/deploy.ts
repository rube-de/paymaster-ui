import { task } from "hardhat/config";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { parseEther } from "viem";

const DEFAULT_DURATION = 7 * 24 * 60 * 60;

export const deployRoffle = task("deploy:roffle", "Deploy the Roffle contract")
  .addOptionalParam("duration", "Raffle duration in seconds", DEFAULT_DURATION.toString())
  .addOptionalParam("opf", "OPF contribution in ROSE", "100000")
  .addFlag("verify", "Verify contract on explorer")
  .setAction(async (taskArgs: { duration: string; opf: string; verify: boolean }, hre: HardhatRuntimeEnvironment) => {
    const duration = BigInt(taskArgs.duration);
    const opfContribution = parseEther(taskArgs.opf);

    const [deployer] = await hre.viem.getWalletClients();
    const publicClient = await hre.viem.getPublicClient();

    const roffle = await hre.viem.deployContract("Roffle", [duration], {
      gas: 3_000_000n,
    });

    const hash = await roffle.write.addOPFContribution({ value: opfContribution });
    await publicClient.waitForTransactionReceipt({ hash });

    let verified = false;
    if (taskArgs.verify && hre.network.name !== "localhost" && hre.network.name !== "hardhat") {
      try {
        await hre.run("verify:verify", {
          address: roffle.address,
          constructorArguments: [duration],
        });
        verified = true;
      } catch (error: any) {
        if (error.message.includes("Already Verified")) {
          verified = true;
        }
      }
    }

    const durationDays = Number(duration) / 86400;

    console.log(`
========================================
           Roffle Deployment
========================================
  Network:         ${hre.network.name}
  Deployer:        ${deployer.account.address}
  Duration:        ${durationDays} days
  OPF Contribution: ${taskArgs.opf} ROSE
  Verified:        ${verified ? "Yes" : "No"}
----------------------------------------
  Contract:        ${roffle.address}
  Tx Hash:         ${hash}
========================================
`);

    return roffle.address;
  });
