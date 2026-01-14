# Oasis Bridge

Oasis Bridge is a cross-chain payment interface powered by the [ROFL Paymaster].
It enables users to seamlessly transfer assets between different blockchain networks
using the Oasis Protocol's secure infrastructure.

The production deployment lives at <https://bridge.oasis.io/>.

[ROFL]: https://docs.oasis.io/build/rofl/

## How it works?

The bridge integrates the [ROFL Paymaster] which allows users to deposit USDC or
USDT on Base and get the appropriate amount of ROSE to their Sapphire account.
All transactions are secured by [Oasis Sapphire]'s confidential computing capabilities.

[Oasis Sapphire]: https://docs.oasis.io/build/sapphire/
[ROFL Paymaster]: https://github.com/oasisprotocol/rofl-paymaster

## Features

- Seamless [ROFL Paymaster] integration for cross-chain payments
- Support for USDC and USDT on Base network
- Secure asset bridging to Oasis Sapphire
- Modern React frontend with RainbowKit wallet integration
