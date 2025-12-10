import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { parseEther } from "viem";

const ONE_WEEK_IN_SECONDS = 7 * 24 * 60 * 60;
const OPF_CONTRIBUTION = parseEther("100000");

const RoffleModule = buildModule("RoffleModule", (m) => {
  const endTime = m.getParameter("endTime", 0n);
  const opfContribution = m.getParameter("opfContribution", OPF_CONTRIBUTION);

  const roffle = m.contract("Roffle", [endTime]);

  m.call(roffle, "addOPFContribution", [], {
    value: opfContribution,
  });

  return { roffle };
});

export default RoffleModule;
