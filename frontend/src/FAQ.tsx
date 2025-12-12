export function FAQ({ RAFFLE_CONTRACT_ADDRESS }: { RAFFLE_CONTRACT_ADDRESS: string }) {
  return (
    <div className="font-['Geist',Helvetica] text-[rgba(255,255,255,0.6)] text-[14px] flex flex-col [&_h3]:mb-2 [&_h3]:mt-[32px]">
      <h1 className="text-white text-5xl font-normal font-['Mountains_of_Christmas'] leading-[56px]">FAQ</h1>
      <h3 className="text-white text-2xl font-normal font-['Mountains_of_Christmas',cursive] leading-8">
        What is the Xmas Roffle?
      </h3>
      <p>
        The Xmas Roffle (raffle + ROFL) is a bit of fun to celebrate the end of the year. Users can buy raffle
        tickets and win a share of <b>1,000,000 ROSE,</b> depending on how many tickets are sold. Everything
        runs on a Sapphire{' '}
        <a
          href={`https://explorer.oasis.io/mainnet/sapphire/address/${RAFFLE_CONTRACT_ADDRESS}/code#code`}
          target="_blank"
          className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid underline hover:opacity-80 transition-opacity"
        >
          contract
        </a>{' '}
        for transparency and automatic payouts.
      </p>
      <h3 className="text-white text-2xl font-normal font-['Mountains_of_Christmas',cursive] leading-8">
        How does it work?
      </h3>
      <p>
        Connect any EVM wallet and buy tickets using <b>ROSE or USDC on Base</b>. USDC will be converted to
        ROSE automatically, so you don’t need to buy ROSE upfront.
        <br />
        Each ticket costs an equivalent of <b>250 ROSE</b>, each contributing to the prize pot, and once all
        tickets are sold or the raffle ends, winners are randomly selected, and rewards are distributed
        automatically.
      </p>
      <h3 className="text-white text-2xl font-normal font-['Mountains_of_Christmas',cursive] leading-8">
        How long does the raffle run?
      </h3>
      <p>
        Tickets are available <b>until December 23rd, 2025, 23:59 CET</b> (or earlier if all 3,600 tickets are
        sold). Winners will be announced on December 24th at the latest.
      </p>
      <h3 className="text-white text-2xl font-normal font-['Mountains_of_Christmas',cursive] leading-8">
        How many tickets can I buy?
      </h3>
      <p>
        Each wallet can buy <b>up to</b> <b>10 tickets</b>. Total supply is capped at <b>3,600 tickets</b>, so
        the raffle may close early if sold out.
      </p>
      <h3 className="text-white text-2xl font-normal font-['Mountains_of_Christmas',cursive] leading-8">
        What are the prizes?
      </h3>
      <p>
        There are <b>10 winners</b>. The <b>initial pot is 100k ROSE</b>. The prize pool can reach{' '}
        <b>up to 1,000,000 ROSE</b>.
      </p>
      <p>
        Here is how the rewards are distributed:
        <br />
        1st place – <b>50% of the prize pool</b>
        <br />
        2nd place – <b>20% of the prize pool</b>
        <br />
        3rd place – <b>10% of the prize pool</b>
        <br />
        4th place – <b>5% of the prize pool</b>
        <br />
        5th place – <b>5% of the prize pool</b>
        <br />
        6th–10th place – <b>2% each.</b>
      </p>
      <p>
        This way, we ensure there are higher chances for more users to win a share of the pot, keeping the
        highest rewards attractive.
      </p>
      <h3 className="text-white text-2xl font-normal font-['Mountains_of_Christmas',cursive] leading-8">
        Who can win?
      </h3>
      <p>
        Anyone who buys at least one ticket. Winners are chosen randomly, and the payout is handled
        automatically by the contract.
      </p>
      <h3 className="text-white text-2xl font-normal font-['Mountains_of_Christmas',cursive] leading-8">
        How are winners announced?
      </h3>
      <p>
        The winning wallet addresses will automatically receive the reward. The prize distribution can also be
        inspected via{' '}
        <a
          href={`https://explorer.oasis.io/mainnet/sapphire/address/${RAFFLE_CONTRACT_ADDRESS}/events#events`}
          target="_blank"
          className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid underline hover:opacity-80 transition-opacity"
        >
          Sapphire Explorer
        </a>
        .
      </p>
      <h3 className="text-white text-2xl font-normal font-['Mountains_of_Christmas',cursive] leading-8">
        Is the ticket refundable?
      </h3>
      <p>Tickets are non-refundable once purchased. All tickets contribute directly to the prize pool.</p>
    </div>
  )
}
