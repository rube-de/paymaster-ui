import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { parseEther } from "viem";

const ONE_WEEK_IN_SECONDS = 7 * 24 * 60 * 60;
const OPF_CONTRIBUTION = parseEther("100000");

const RoffleModule = buildModule("RoffleModule", (m) => {
  const duration = m.getParameter("duration", ONE_WEEK_IN_SECONDS);
  const opfContribution = m.getParameter("opfContribution", OPF_CONTRIBUTION);

  const roffle = m.contract("Roffle", [duration]);

  m.call(roffle, "addOPFContribution", [], {
    value: opfContribution,
  });

  return { roffle };
});

export default RoffleModule;
