// @ts-nocheck
import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
import { expect } from "chai";
import hre from "hardhat";
import { getAddress, parseEther } from "viem";

describe("Roffle", function () {
  const TICKET_PRICE = parseEther("250");
  const MAX_TICKETS_PER_WALLET = 10n;
  const MAX_TOTAL_TICKETS = 3600n;
  const WINNER_COUNT = 10n;
  const ONE_WEEK = 7n * 24n * 60n * 60n;
  const TEST_OPF_CONTRIBUTION = parseEther("100");

  async function deployRoffleFixture() {
    const [owner, buyer1, buyer2, buyer3, ...otherAccounts] = await hre.viem.getWalletClients();
    const publicClient = await hre.viem.getPublicClient();

    const roffle = await hre.viem.deployContract("Roffle", [0n]);

    return {
      roffle,
      owner,
      buyer1,
      buyer2,
      buyer3,
      otherAccounts,
      publicClient,
    };
  }

  async function deployRoffleWithCustomEndTime() {
    const [owner, buyer1, buyer2, buyer3, ...otherAccounts] = await hre.viem.getWalletClients();
    const publicClient = await hre.viem.getPublicClient();

    const endTime = BigInt(await time.latest()) + ONE_WEEK;
    const roffle = await hre.viem.deployContract("Roffle", [endTime]);

    return {
      roffle,
      endTime,
      owner,
      buyer1,
      buyer2,
      buyer3,
      otherAccounts,
      publicClient,
    };
  }

  async function deployRoffleWithTicketsSold() {
    const [owner, ...buyers] = await hre.viem.getWalletClients();
    const publicClient = await hre.viem.getPublicClient();

    const roffle = await hre.viem.deployContract("Roffle", [0n]);

    for (let i = 0; i < 15; i++) {
      const buyer = buyers[i % buyers.length];
      const roffleAsBuyer = await hre.viem.getContractAt("Roffle", roffle.address, {
        client: { wallet: buyer },
      });
      await roffleAsBuyer.write.buyTickets([1n], { value: TICKET_PRICE });
    }

    return {
      roffle,
      owner,
      buyers,
      publicClient,
    };
  }

  async function deployRoffleWithOPFContribution() {
    const { roffle, owner, buyer1, buyer2, buyer3, otherAccounts, publicClient } =
      await loadFixture(deployRoffleFixture);

    await roffle.write.addOPFContribution({ value: TEST_OPF_CONTRIBUTION });

    return {
      roffle,
      owner,
      buyer1,
      buyer2,
      buyer3,
      otherAccounts,
      publicClient,
    };
  }

  describe("Deployment", function () {
    it("Should set the correct owner", async function () {
      const { roffle, owner } = await loadFixture(deployRoffleFixture);
      expect(await roffle.read.owner()).to.equal(getAddress(owner.account.address));
    });

    it("Should set raffle end time to 1 week when passing 0", async function () {
      const { roffle } = await loadFixture(deployRoffleFixture);
      const currentTime = BigInt(await time.latest());
      const endTime = await roffle.read.raffleEndTime();
      expect(endTime >= currentTime + ONE_WEEK - 10n).to.be.true;
      expect(endTime <= currentTime + ONE_WEEK + 10n).to.be.true;
    });

    it("Should set custom end time when provided", async function () {
      const { roffle, endTime } = await loadFixture(deployRoffleWithCustomEndTime);
      expect(await roffle.read.raffleEndTime()).to.equal(endTime);
    });

    it("Should start in Active state", async function () {
      const { roffle } = await loadFixture(deployRoffleFixture);
      expect(await roffle.read.state()).to.equal(0);
    });

    it("Should start with zero tickets sold", async function () {
      const { roffle } = await loadFixture(deployRoffleFixture);
      expect(await roffle.read.ticketsSold()).to.equal(0n);
    });

    it("Should start with zero OPF contribution", async function () {
      const { roffle } = await loadFixture(deployRoffleFixture);
      expect(await roffle.read.opfContribution()).to.equal(0n);
    });

    it("Should have correct constants", async function () {
      const { roffle } = await loadFixture(deployRoffleFixture);
      expect(await roffle.read.TICKET_PRICE()).to.equal(TICKET_PRICE);
      expect(await roffle.read.MAX_TICKETS_PER_WALLET()).to.equal(MAX_TICKETS_PER_WALLET);
      expect(await roffle.read.MAX_TOTAL_TICKETS()).to.equal(MAX_TOTAL_TICKETS);
      expect(await roffle.read.WINNER_COUNT()).to.equal(WINNER_COUNT);
    });

    it("Should revert if end time is in the past", async function () {
      const pastTime = BigInt(await time.latest()) - 100n;
      await expect(
        hre.viem.deployContract("Roffle", [pastTime])
      ).to.be.rejectedWith("EndTimeInPast");
    });
  });

  describe("Buying Tickets", function () {
    it("Should allow buying a single ticket", async function () {
      const { roffle, buyer1 } = await loadFixture(deployRoffleFixture);

      const roffleAsBuyer = await hre.viem.getContractAt("Roffle", roffle.address, {
        client: { wallet: buyer1 },
      });

      await roffleAsBuyer.write.buyTickets([1n], { value: TICKET_PRICE });

      expect(await roffle.read.ticketsSold()).to.equal(1n);
      expect(await roffle.read.ticketsPurchased([buyer1.account.address])).to.equal(1n);
    });

    it("Should allow buying multiple tickets", async function () {
      const { roffle, buyer1 } = await loadFixture(deployRoffleFixture);

      const roffleAsBuyer = await hre.viem.getContractAt("Roffle", roffle.address, {
        client: { wallet: buyer1 },
      });

      await roffleAsBuyer.write.buyTickets([5n], { value: TICKET_PRICE * 5n });

      expect(await roffle.read.ticketsSold()).to.equal(5n);
      expect(await roffle.read.ticketsPurchased([buyer1.account.address])).to.equal(5n);
    });

    it("Should allow buying maximum tickets per wallet", async function () {
      const { roffle, buyer1 } = await loadFixture(deployRoffleFixture);

      const roffleAsBuyer = await hre.viem.getContractAt("Roffle", roffle.address, {
        client: { wallet: buyer1 },
      });

      await roffleAsBuyer.write.buyTickets([MAX_TICKETS_PER_WALLET], {
        value: TICKET_PRICE * MAX_TICKETS_PER_WALLET
      });

      expect(await roffle.read.ticketsPurchased([buyer1.account.address])).to.equal(MAX_TICKETS_PER_WALLET);
    });

    it("Should emit TicketsPurchased event", async function () {
      const { roffle, buyer1, publicClient } = await loadFixture(deployRoffleFixture);

      const roffleAsBuyer = await hre.viem.getContractAt("Roffle", roffle.address, {
        client: { wallet: buyer1 },
      });

      const hash = await roffleAsBuyer.write.buyTickets([3n], { value: TICKET_PRICE * 3n });
      await publicClient.waitForTransactionReceipt({ hash });

      const events = await roffle.getEvents.TicketsPurchased();
      expect(events).to.have.lengthOf(1);
      expect(events[0].args.buyer).to.equal(getAddress(buyer1.account.address));
      expect(events[0].args.quantity).to.equal(3n);
      expect(events[0].args.totalCost).to.equal(TICKET_PRICE * 3n);
    });

    it("Should revert when buying zero tickets", async function () {
      const { roffle, buyer1 } = await loadFixture(deployRoffleFixture);

      const roffleAsBuyer = await hre.viem.getContractAt("Roffle", roffle.address, {
        client: { wallet: buyer1 },
      });

      await expect(
        roffleAsBuyer.write.buyTickets([0n], { value: 0n })
      ).to.be.rejectedWith("ZeroTickets");
    });

    it("Should revert with incorrect payment (too little)", async function () {
      const { roffle, buyer1 } = await loadFixture(deployRoffleFixture);

      const roffleAsBuyer = await hre.viem.getContractAt("Roffle", roffle.address, {
        client: { wallet: buyer1 },
      });

      await expect(
        roffleAsBuyer.write.buyTickets([1n], { value: TICKET_PRICE - 1n })
      ).to.be.rejectedWith("IncorrectPayment");
    });

    it("Should revert with incorrect payment (too much)", async function () {
      const { roffle, buyer1 } = await loadFixture(deployRoffleFixture);

      const roffleAsBuyer = await hre.viem.getContractAt("Roffle", roffle.address, {
        client: { wallet: buyer1 },
      });

      await expect(
        roffleAsBuyer.write.buyTickets([1n], { value: TICKET_PRICE + 1n })
      ).to.be.rejectedWith("IncorrectPayment");
    });

    it("Should revert when exceeding per-wallet limit", async function () {
      const { roffle, buyer1 } = await loadFixture(deployRoffleFixture);

      const roffleAsBuyer = await hre.viem.getContractAt("Roffle", roffle.address, {
        client: { wallet: buyer1 },
      });

      await expect(
        roffleAsBuyer.write.buyTickets([11n], { value: TICKET_PRICE * 11n })
      ).to.be.rejectedWith("ExceedsWalletLimit");
    });

    it("Should revert when exceeding per-wallet limit in multiple purchases", async function () {
      const { roffle, buyer1 } = await loadFixture(deployRoffleFixture);

      const roffleAsBuyer = await hre.viem.getContractAt("Roffle", roffle.address, {
        client: { wallet: buyer1 },
      });

      await roffleAsBuyer.write.buyTickets([8n], { value: TICKET_PRICE * 8n });

      await expect(
        roffleAsBuyer.write.buyTickets([3n], { value: TICKET_PRICE * 3n })
      ).to.be.rejectedWith("ExceedsWalletLimit");
    });

    it("Should revert when raffle has ended", async function () {
      const { roffle, buyer1 } = await loadFixture(deployRoffleFixture);

      const endTime = await roffle.read.raffleEndTime();
      await time.increaseTo(endTime + 1n);

      const roffleAsBuyer = await hre.viem.getContractAt("Roffle", roffle.address, {
        client: { wallet: buyer1 },
      });

      await expect(
        roffleAsBuyer.write.buyTickets([1n], { value: TICKET_PRICE })
      ).to.be.rejectedWith("RaffleEnded");
    });

    it("Should allow multiple buyers", async function () {
      const { roffle, buyer1, buyer2, buyer3 } = await loadFixture(deployRoffleFixture);

      const roffle1 = await hre.viem.getContractAt("Roffle", roffle.address, {
        client: { wallet: buyer1 },
      });
      const roffle2 = await hre.viem.getContractAt("Roffle", roffle.address, {
        client: { wallet: buyer2 },
      });
      const roffle3 = await hre.viem.getContractAt("Roffle", roffle.address, {
        client: { wallet: buyer3 },
      });

      await roffle1.write.buyTickets([2n], { value: TICKET_PRICE * 2n });
      await roffle2.write.buyTickets([5n], { value: TICKET_PRICE * 5n });
      await roffle3.write.buyTickets([3n], { value: TICKET_PRICE * 3n });

      expect(await roffle.read.ticketsSold()).to.equal(10n);
      expect(await roffle.read.ticketsPurchased([buyer1.account.address])).to.equal(2n);
      expect(await roffle.read.ticketsPurchased([buyer2.account.address])).to.equal(5n);
      expect(await roffle.read.ticketsPurchased([buyer3.account.address])).to.equal(3n);
    });
  });

  describe("OPF Contribution", function () {
    it("Should allow owner to add OPF contribution", async function () {
      const { roffle, publicClient } = await loadFixture(deployRoffleFixture);

      const hash = await roffle.write.addOPFContribution({ value: TEST_OPF_CONTRIBUTION });
      await publicClient.waitForTransactionReceipt({ hash });

      expect(await roffle.read.opfContribution()).to.equal(TEST_OPF_CONTRIBUTION);
    });

    it("Should emit OPFContributionAdded event", async function () {
      const { roffle, publicClient } = await loadFixture(deployRoffleFixture);

      const hash = await roffle.write.addOPFContribution({ value: TEST_OPF_CONTRIBUTION });
      await publicClient.waitForTransactionReceipt({ hash });

      const events = await roffle.getEvents.OPFContributionAdded();
      expect(events).to.have.lengthOf(1);
      expect(events[0].args.amount).to.equal(TEST_OPF_CONTRIBUTION);
    });

    it("Should allow multiple OPF contributions", async function () {
      const { roffle } = await loadFixture(deployRoffleFixture);

      await roffle.write.addOPFContribution({ value: parseEther("50") });
      await roffle.write.addOPFContribution({ value: parseEther("50") });

      expect(await roffle.read.opfContribution()).to.equal(TEST_OPF_CONTRIBUTION);
    });

    it("Should accept contribution via receive function", async function () {
      const { roffle, owner, publicClient } = await loadFixture(deployRoffleFixture);

      const hash = await owner.sendTransaction({
        to: roffle.address,
        value: TEST_OPF_CONTRIBUTION,
      });
      await publicClient.waitForTransactionReceipt({ hash });

      expect(await roffle.read.opfContribution()).to.equal(TEST_OPF_CONTRIBUTION);
    });

    it("Should revert when adding zero contribution", async function () {
      const { roffle } = await loadFixture(deployRoffleFixture);

      await expect(
        roffle.write.addOPFContribution({ value: 0n })
      ).to.be.rejectedWith("ZeroContribution");
    });

    it("Should revert when non-owner adds contribution via addOPFContribution", async function () {
      const { roffle, buyer1 } = await loadFixture(deployRoffleFixture);

      const roffleAsBuyer = await hre.viem.getContractAt("Roffle", roffle.address, {
        client: { wallet: buyer1 },
      });

      await expect(
        roffleAsBuyer.write.addOPFContribution({ value: TEST_OPF_CONTRIBUTION })
      ).to.be.rejectedWith("OwnableUnauthorizedAccount");
    });

    it("Should allow owner to withdraw OPF contribution", async function () {
      const { roffle, owner, publicClient } = await loadFixture(deployRoffleWithOPFContribution);

      const ownerBalanceBefore = await publicClient.getBalance({ address: owner.account.address });

      const hash = await roffle.write.withdrawOPFContribution();
      const receipt = await publicClient.waitForTransactionReceipt({ hash });
      const gasUsed = receipt.gasUsed * receipt.effectiveGasPrice;

      const ownerBalanceAfter = await publicClient.getBalance({ address: owner.account.address });
      expect(ownerBalanceAfter).to.equal(ownerBalanceBefore + TEST_OPF_CONTRIBUTION - gasUsed);
      expect(await roffle.read.opfContribution()).to.equal(0n);
    });

    it("Should emit OPFContributionWithdrawn event", async function () {
      const { roffle, publicClient } = await loadFixture(deployRoffleWithOPFContribution);

      const hash = await roffle.write.withdrawOPFContribution();
      await publicClient.waitForTransactionReceipt({ hash });

      const events = await roffle.getEvents.OPFContributionWithdrawn();
      expect(events).to.have.lengthOf(1);
      expect(events[0].args.amount).to.equal(TEST_OPF_CONTRIBUTION);
    });

    it("Should revert withdrawal when no contribution exists", async function () {
      const { roffle } = await loadFixture(deployRoffleFixture);

      await expect(
        roffle.write.withdrawOPFContribution()
      ).to.be.rejectedWith("ZeroContribution");
    });
  });

  describe("Close Sales Early", function () {
    it("Should allow owner to close sales early", async function () {
      const { roffle, publicClient } = await loadFixture(deployRoffleFixture);

      const hash = await roffle.write.closeSalesEarly();
      await publicClient.waitForTransactionReceipt({ hash });

      expect(await roffle.read.state()).to.equal(1);
    });

    it("Should emit SalesClosed event", async function () {
      const { roffle, publicClient } = await loadFixture(deployRoffleFixture);

      const hash = await roffle.write.closeSalesEarly();
      await publicClient.waitForTransactionReceipt({ hash });

      const events = await roffle.getEvents.SalesClosed();
      expect(events).to.have.lengthOf(1);
    });

    it("Should prevent ticket purchases after closing early", async function () {
      const { roffle, buyer1 } = await loadFixture(deployRoffleFixture);

      await roffle.write.closeSalesEarly();

      const roffleAsBuyer = await hre.viem.getContractAt("Roffle", roffle.address, {
        client: { wallet: buyer1 },
      });

      await expect(
        roffleAsBuyer.write.buyTickets([1n], { value: TICKET_PRICE })
      ).to.be.rejectedWith("RaffleEnded");
    });

    it("Should revert when non-owner tries to close sales", async function () {
      const { roffle, buyer1 } = await loadFixture(deployRoffleFixture);

      const roffleAsBuyer = await hre.viem.getContractAt("Roffle", roffle.address, {
        client: { wallet: buyer1 },
      });

      await expect(
        roffleAsBuyer.write.closeSalesEarly()
      ).to.be.rejectedWith("OwnableUnauthorizedAccount");
    });

    it("Should revert when trying to close after raffle naturally ended", async function () {
      const { roffle } = await loadFixture(deployRoffleFixture);

      const endTime = await roffle.read.raffleEndTime();
      await time.increaseTo(endTime + 1n);

      await expect(
        roffle.write.closeSalesEarly()
      ).to.be.rejectedWith("RaffleEnded");
    });
  });

  describe("Select Winners", function () {
    it("Should revert when called before raffle ends", async function () {
      const { roffle } = await loadFixture(deployRoffleWithTicketsSold);

      await expect(
        roffle.write.selectWinnersAndDistribute()
      ).to.be.rejectedWith("RaffleStillActive");
    });

    it("Should revert when not enough participants", async function () {
      const { roffle, buyer1 } = await loadFixture(deployRoffleFixture);

      const roffleAsBuyer = await hre.viem.getContractAt("Roffle", roffle.address, {
        client: { wallet: buyer1 },
      });

      for (let i = 0; i < 9; i++) {
        await roffleAsBuyer.write.buyTickets([1n], { value: TICKET_PRICE });
      }

      const endTime = await roffle.read.raffleEndTime();
      await time.increaseTo(endTime + 1n);

      await expect(
        roffle.write.selectWinnersAndDistribute()
      ).to.be.rejectedWith("NotEnoughParticipants");
    });

    it("Should revert when non-owner tries to select winners", async function () {
      const { roffle, buyers } = await loadFixture(deployRoffleWithTicketsSold);

      const endTime = await roffle.read.raffleEndTime();
      await time.increaseTo(endTime + 1n);

      const roffleAsBuyer = await hre.viem.getContractAt("Roffle", roffle.address, {
        client: { wallet: buyers[0] },
      });

      await expect(
        roffleAsBuyer.write.selectWinnersAndDistribute()
      ).to.be.rejectedWith("OwnableUnauthorizedAccount");
    });

    it("Should revert when called twice", async function () {
      const { roffle } = await loadFixture(deployRoffleWithTicketsSold);

      const endTime = await roffle.read.raffleEndTime();
      await time.increaseTo(endTime + 1n);

      await roffle.write.selectWinnersAndDistribute();

      await expect(
        roffle.write.selectWinnersAndDistribute()
      ).to.be.rejectedWith("RaffleAlreadyCompleted");
    });

    it("Should select winners and distribute prizes", async function () {
      const { roffle, publicClient } = await loadFixture(deployRoffleWithTicketsSold);

      const prizePool = await publicClient.getBalance({ address: roffle.address });

      const endTime = await roffle.read.raffleEndTime();
      await time.increaseTo(endTime + 1n);

      const hash = await roffle.write.selectWinnersAndDistribute();
      await publicClient.waitForTransactionReceipt({ hash });

      expect(await roffle.read.state()).to.equal(2);

      const winners = await roffle.read.getWinners();
      expect(winners.length).to.equal(10);

      let totalDistributed = 0n;
      for (let i = 0; i < 10; i++) {
        expect(winners[i].winner).to.not.equal("0x0000000000000000000000000000000000000000");
        expect(winners[i].prize > 0n).to.be.true;
        totalDistributed += winners[i].prize;
      }

      expect(totalDistributed).to.equal(prizePool);
    });

    it("Should emit WinnersSelected event", async function () {
      const { roffle, publicClient } = await loadFixture(deployRoffleWithTicketsSold);

      const endTime = await roffle.read.raffleEndTime();
      await time.increaseTo(endTime + 1n);

      const hash = await roffle.write.selectWinnersAndDistribute();
      await publicClient.waitForTransactionReceipt({ hash });

      const events = await roffle.getEvents.WinnersSelected();
      expect(events).to.have.lengthOf(1);
    });

    it("Should emit PrizeDistributed events for all winners", async function () {
      const { roffle, publicClient } = await loadFixture(deployRoffleWithTicketsSold);

      const endTime = await roffle.read.raffleEndTime();
      await time.increaseTo(endTime + 1n);

      const hash = await roffle.write.selectWinnersAndDistribute();
      await publicClient.waitForTransactionReceipt({ hash });

      const events = await roffle.getEvents.PrizeDistributed();
      expect(events).to.have.lengthOf(10);
    });

    it("Should distribute correct prize percentages", async function () {
      const { roffle, publicClient } = await loadFixture(deployRoffleWithTicketsSold);

      const prizePool = await publicClient.getBalance({ address: roffle.address });

      const endTime = await roffle.read.raffleEndTime();
      await time.increaseTo(endTime + 1n);

      await roffle.write.selectWinnersAndDistribute();

      const winners = await roffle.read.getWinners();

      expect(winners[0].prize).to.equal((prizePool * 5000n) / 10000n);
      expect(winners[1].prize).to.equal((prizePool * 2000n) / 10000n);
      expect(winners[2].prize).to.equal((prizePool * 1000n) / 10000n);
      expect(winners[3].prize).to.equal((prizePool * 500n) / 10000n);
      expect(winners[4].prize).to.equal((prizePool * 500n) / 10000n);
      for (let i = 5; i < 10; i++) {
        expect(winners[i].prize).to.equal((prizePool * 200n) / 10000n);
      }
    });
  });

  describe("Cancel and Refund", function () {
    it("Should allow owner to cancel and refund", async function () {
      const { roffle, buyers, publicClient } = await loadFixture(deployRoffleWithTicketsSold);

      await roffle.write.addOPFContribution({ value: TEST_OPF_CONTRIBUTION });

      const hash = await roffle.write.cancelAndRefund();
      await publicClient.waitForTransactionReceipt({ hash });

      expect(await roffle.read.state()).to.equal(2);
    });

    it("Should refund OPF contribution on cancel", async function () {
      const { roffle, owner, publicClient } = await loadFixture(deployRoffleWithTicketsSold);

      await roffle.write.addOPFContribution({ value: TEST_OPF_CONTRIBUTION });

      const ownerBalanceBefore = await publicClient.getBalance({ address: owner.account.address });

      const hash = await roffle.write.cancelAndRefund();
      const receipt = await publicClient.waitForTransactionReceipt({ hash });
      const gasUsed = receipt.gasUsed * receipt.effectiveGasPrice;

      const ownerBalanceAfter = await publicClient.getBalance({ address: owner.account.address });

      expect(ownerBalanceAfter > ownerBalanceBefore - gasUsed).to.be.true;
    });

    it("Should emit RefundIssued events", async function () {
      const { roffle, publicClient } = await loadFixture(deployRoffleWithTicketsSold);

      const hash = await roffle.write.cancelAndRefund();
      await publicClient.waitForTransactionReceipt({ hash });

      const events = await roffle.getEvents.RefundIssued();
      expect(events.length > 0).to.be.true;
    });

    it("Should revert when non-owner tries to cancel", async function () {
      const { roffle, buyers } = await loadFixture(deployRoffleWithTicketsSold);

      const roffleAsBuyer = await hre.viem.getContractAt("Roffle", roffle.address, {
        client: { wallet: buyers[0] },
      });

      await expect(
        roffleAsBuyer.write.cancelAndRefund()
      ).to.be.rejectedWith("OwnableUnauthorizedAccount");
    });

    it("Should revert cancel after winners selected", async function () {
      const { roffle } = await loadFixture(deployRoffleWithTicketsSold);

      const endTime = await roffle.read.raffleEndTime();
      await time.increaseTo(endTime + 1n);

      await roffle.write.selectWinnersAndDistribute();

      await expect(
        roffle.write.cancelAndRefund()
      ).to.be.rejectedWith("RaffleAlreadyCompleted");
    });
  });

  describe("View Functions", function () {
    it("Should return correct total prize pool", async function () {
      const { roffle, buyer1, publicClient } = await loadFixture(deployRoffleFixture);

      const roffleAsBuyer = await hre.viem.getContractAt("Roffle", roffle.address, {
        client: { wallet: buyer1 },
      });

      await roffleAsBuyer.write.buyTickets([5n], { value: TICKET_PRICE * 5n });
      await roffle.write.addOPFContribution({ value: TEST_OPF_CONTRIBUTION });

      const expectedPool = TICKET_PRICE * 5n + TEST_OPF_CONTRIBUTION;
      expect(await roffle.read.getTotalPrizePool()).to.equal(expectedPool);
    });

    it("Should return correct tickets remaining", async function () {
      const { roffle, buyer1 } = await loadFixture(deployRoffleFixture);

      const roffleAsBuyer = await hre.viem.getContractAt("Roffle", roffle.address, {
        client: { wallet: buyer1 },
      });

      await roffleAsBuyer.write.buyTickets([10n], { value: TICKET_PRICE * 10n });

      expect(await roffle.read.getTicketsRemaining()).to.equal(MAX_TOTAL_TICKETS - 10n);
    });

    it("Should return correct tickets allowed for wallet", async function () {
      const { roffle, buyer1 } = await loadFixture(deployRoffleFixture);

      expect(await roffle.read.getTicketsAllowedForWallet([buyer1.account.address])).to.equal(MAX_TICKETS_PER_WALLET);

      const roffleAsBuyer = await hre.viem.getContractAt("Roffle", roffle.address, {
        client: { wallet: buyer1 },
      });

      await roffleAsBuyer.write.buyTickets([7n], { value: TICKET_PRICE * 7n });

      expect(await roffle.read.getTicketsAllowedForWallet([buyer1.account.address])).to.equal(3n);
    });

    it("Should return 0 tickets allowed when at limit", async function () {
      const { roffle, buyer1 } = await loadFixture(deployRoffleFixture);

      const roffleAsBuyer = await hre.viem.getContractAt("Roffle", roffle.address, {
        client: { wallet: buyer1 },
      });

      await roffleAsBuyer.write.buyTickets([10n], { value: TICKET_PRICE * 10n });

      expect(await roffle.read.getTicketsAllowedForWallet([buyer1.account.address])).to.equal(0n);
    });

    it("Should return correct active status", async function () {
      const { roffle } = await loadFixture(deployRoffleFixture);

      expect(await roffle.read.isActive()).to.equal(true);

      const endTime = await roffle.read.raffleEndTime();
      await time.increaseTo(endTime + 1n);

      expect(await roffle.read.isActive()).to.equal(false);
    });

    it("Should return correct time remaining", async function () {
      const { roffle } = await loadFixture(deployRoffleFixture);

      const timeRemaining = await roffle.read.getTimeRemaining();
      expect(timeRemaining > 0n).to.be.true;
      expect(timeRemaining <= ONE_WEEK).to.be.true;

      const endTime = await roffle.read.raffleEndTime();
      await time.increaseTo(endTime + 1n);

      expect(await roffle.read.getTimeRemaining()).to.equal(0n);
    });

    it("Should return correct total entries", async function () {
      const { roffle, buyer1, buyer2 } = await loadFixture(deployRoffleFixture);

      const roffle1 = await hre.viem.getContractAt("Roffle", roffle.address, {
        client: { wallet: buyer1 },
      });
      const roffle2 = await hre.viem.getContractAt("Roffle", roffle.address, {
        client: { wallet: buyer2 },
      });

      await roffle1.write.buyTickets([3n], { value: TICKET_PRICE * 3n });
      await roffle2.write.buyTickets([5n], { value: TICKET_PRICE * 5n });

      expect(await roffle.read.getTotalEntries()).to.equal(8n);
    });

    it("Should return correct prize for rank", async function () {
      const { roffle, buyer1 } = await loadFixture(deployRoffleFixture);

      const roffleAsBuyer = await hre.viem.getContractAt("Roffle", roffle.address, {
        client: { wallet: buyer1 },
      });

      await roffleAsBuyer.write.buyTickets([10n], { value: TICKET_PRICE * 10n });
      await roffle.write.addOPFContribution({ value: TEST_OPF_CONTRIBUTION });

      const prizePool = TICKET_PRICE * 10n + TEST_OPF_CONTRIBUTION;

      expect(await roffle.read.getPrizeForRank([0n])).to.equal((prizePool * 5000n) / 10000n);
      expect(await roffle.read.getPrizeForRank([1n])).to.equal((prizePool * 2000n) / 10000n);
      expect(await roffle.read.getPrizeForRank([9n])).to.equal((prizePool * 200n) / 10000n);
      expect(await roffle.read.getPrizeForRank([10n])).to.equal(0n);
    });

    it("Should return prize percentages array", async function () {
      const { roffle } = await loadFixture(deployRoffleFixture);

      expect(await roffle.read.PRIZE_PERCENTAGES([0n])).to.equal(5000n);
      expect(await roffle.read.PRIZE_PERCENTAGES([1n])).to.equal(2000n);
      expect(await roffle.read.PRIZE_PERCENTAGES([2n])).to.equal(1000n);
      expect(await roffle.read.PRIZE_PERCENTAGES([3n])).to.equal(500n);
      expect(await roffle.read.PRIZE_PERCENTAGES([4n])).to.equal(500n);
      expect(await roffle.read.PRIZE_PERCENTAGES([5n])).to.equal(200n);
      expect(await roffle.read.PRIZE_PERCENTAGES([9n])).to.equal(200n);
    });
  });

  describe("Edge Cases", function () {
    it("Should handle exact max tickets sold scenario", async function () {
      const { roffle, buyer1, buyer2 } = await loadFixture(deployRoffleFixture);

      const roffle1 = await hre.viem.getContractAt("Roffle", roffle.address, {
        client: { wallet: buyer1 },
      });
      const roffle2 = await hre.viem.getContractAt("Roffle", roffle.address, {
        client: { wallet: buyer2 },
      });

      await roffle1.write.buyTickets([10n], { value: TICKET_PRICE * 10n });
      await roffle2.write.buyTickets([10n], { value: TICKET_PRICE * 10n });

      expect(await roffle.read.ticketsSold()).to.equal(20n);
    });

    it("Should revert when not enough unique addresses for winners", async function () {
      const { roffle, buyer1 } = await loadFixture(deployRoffleFixture);

      const roffleAsBuyer = await hre.viem.getContractAt("Roffle", roffle.address, {
        client: { wallet: buyer1 },
      });

      await roffleAsBuyer.write.buyTickets([10n], { value: TICKET_PRICE * 10n });

      const endTime = await roffle.read.raffleEndTime();
      await time.increaseTo(endTime + 1n);

      await expect(
        roffle.write.selectWinnersAndDistribute()
      ).to.be.rejectedWith("NotEnoughParticipants");
    });

    it("Should ensure all winners are unique addresses", async function () {
      const { roffle, otherAccounts } = await loadFixture(deployRoffleFixture);

      for (let i = 0; i < 10; i++) {
        const buyer = otherAccounts[i];
        const roffleAsBuyer = await hre.viem.getContractAt("Roffle", roffle.address, {
          client: { wallet: buyer },
        });
        await roffleAsBuyer.write.buyTickets([1n], { value: TICKET_PRICE });
      }

      const endTime = await roffle.read.raffleEndTime();
      await time.increaseTo(endTime + 1n);

      await roffle.write.selectWinnersAndDistribute();

      const winners = await roffle.read.getWinners();
      const winnerAddresses = new Set<string>();

      for (let i = 0; i < 10; i++) {
        const addr = winners[i].winner.toLowerCase();
        expect(winnerAddresses.has(addr)).to.be.false;
        winnerAddresses.add(addr);
      }

      expect(winnerAddresses.size).to.equal(10);
    });

    it("Should select unique winners even when some have multiple tickets", async function () {
      const { roffle, otherAccounts } = await loadFixture(deployRoffleFixture);

      for (let i = 0; i < 10; i++) {
        const buyer = otherAccounts[i];
        const roffleAsBuyer = await hre.viem.getContractAt("Roffle", roffle.address, {
          client: { wallet: buyer },
        });
        const tickets = i < 5 ? 2n : 1n;
        await roffleAsBuyer.write.buyTickets([tickets], { value: TICKET_PRICE * tickets });
      }

      const endTime = await roffle.read.raffleEndTime();
      await time.increaseTo(endTime + 1n);

      await roffle.write.selectWinnersAndDistribute();

      const winners = await roffle.read.getWinners();
      const winnerAddresses = new Set<string>();

      for (let i = 0; i < 10; i++) {
        const addr = winners[i].winner.toLowerCase();
        expect(winnerAddresses.has(addr)).to.be.false;
        winnerAddresses.add(addr);
      }

      expect(winnerAddresses.size).to.equal(10);
    });
  });
});
