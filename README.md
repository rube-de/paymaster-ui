# Oasis Xmas Roffle

The Oasis Xmas Roffle (raffle + [ROFL]) is an entertaining application where
users can buy raffle tickets and win a share of the prize pool. Each new
ticket bought increases the prize pool.

The production deployment lives at <https://roffle.oasis.io/>.

[ROFL]: https://docs.oasis.io/build/rofl/

## How it works?

Everything is governed by a [smart contract] running on [Oasis Sapphire].
Once the time to purchase tickets has expired, the owner calls the
`selectWinnersAndDistribute()` method which uses Sapphire's secure random
number generator to pick the winners and automatically distribute the rewards.

For more convenient ticket purchasing, Roffle also integrates the
[ROFL Paymaster] which allows users to deposit USDC or USDT on Base and get the
appropriate amount of ROSE to their Sapphire account.

[smart contract]: contracts/Roffle.sol
[Oasis Sapphire]: https://docs.oasis.io/build/sapphire/
[ROFL Paymaster]: https://github.com/oasisprotocol/rofl-paymaster

## Features

- Configurable [smart contract] which allows setting ticket price, maximum
  tickets per account, maximum total tickets, winner count and prize
  distribution and the duration of the raffle.

- Seamless [ROFL Paymaster] integration which allows buying tickets with USDC
  or USDT on Base.
