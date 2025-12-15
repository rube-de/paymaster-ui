import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Roffle
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const roffleAbi = [
  {
    type: 'constructor',
    inputs: [{ name: '_duration', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  { type: 'error', inputs: [], name: 'CanOnlyCloseEarly' },
  {
    type: 'error',
    inputs: [
      { name: 'requested', internalType: 'uint256', type: 'uint256' },
      { name: 'available', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ExceedsTotalSupply',
  },
  {
    type: 'error',
    inputs: [
      { name: 'requested', internalType: 'uint256', type: 'uint256' },
      { name: 'allowed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ExceedsWalletLimit',
  },
  {
    type: 'error',
    inputs: [
      { name: 'sent', internalType: 'uint256', type: 'uint256' },
      { name: 'required', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'IncorrectPayment',
  },
  { type: 'error', inputs: [], name: 'InvalidDuration' },
  { type: 'error', inputs: [], name: 'NotEnoughParticipants' },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'OwnableInvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'OwnableUnauthorizedAccount',
  },
  {
    type: 'error',
    inputs: [
      { name: 'winner', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'PrizeTransferFailed',
  },
  { type: 'error', inputs: [], name: 'RaffleAlreadyCompleted' },
  { type: 'error', inputs: [], name: 'RaffleEnded' },
  { type: 'error', inputs: [], name: 'RaffleStillActive' },
  { type: 'error', inputs: [], name: 'ReentrancyGuardReentrantCall' },
  {
    type: 'error',
    inputs: [
      { name: 'buyer', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'RefundTransferFailed',
  },
  { type: 'error', inputs: [], name: 'WithdrawalFailed' },
  { type: 'error', inputs: [], name: 'ZeroContribution' },
  { type: 'error', inputs: [], name: 'ZeroTickets' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'OPFContributionAdded',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'OPFContributionWithdrawn',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'winner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'prize',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'rank',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'PrizeDistributed',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'buyer',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'RefundIssued',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'closedAt',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'SalesClosed',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'buyer',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'quantity',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'totalCost',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'TicketsPurchased',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'winners',
        internalType: 'address[10]',
        type: 'address[10]',
        indexed: false,
      },
      {
        name: 'prizes',
        internalType: 'uint256[10]',
        type: 'uint256[10]',
        indexed: false,
      },
    ],
    name: 'WinnersSelected',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MAX_TICKETS_PER_WALLET',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MAX_TOTAL_TICKETS',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'PRIZE_PERCENTAGES',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'TICKET_PRICE',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'WINNER_COUNT',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'addOPFContribution',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [{ name: 'quantity', internalType: 'uint256', type: 'uint256' }],
    name: 'buyTickets',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'cancelAndRefund',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'closeSalesEarly',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'rank', internalType: 'uint256', type: 'uint256' }],
    name: 'getPrizeForRank',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'wallet', internalType: 'address', type: 'address' }],
    name: 'getTicketsAllowedForWallet',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getTicketsRemaining',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getTimeRemaining',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getTotalEntries',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getTotalPrizePool',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getWinners',
    outputs: [
      {
        name: '',
        internalType: 'struct IRoffle.Winner[10]',
        type: 'tuple[10]',
        components: [
          { name: 'winner', internalType: 'address', type: 'address' },
          { name: 'prize', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'isActive',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'opfContribution',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'raffleEndTime',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'selectWinnersAndDistribute',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'state',
    outputs: [
      { name: '', internalType: 'enum IRoffle.RaffleState', type: 'uint8' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'ticketsPurchased',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'ticketsSold',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'winners',
    outputs: [
      { name: 'winner', internalType: 'address', type: 'address' },
      { name: 'prize', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'withdrawOPFContribution',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link roffleAbi}__
 */
export const useReadRoffle = /*#__PURE__*/ createUseReadContract({
  abi: roffleAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link roffleAbi}__ and `functionName` set to `"MAX_TICKETS_PER_WALLET"`
 */
export const useReadRoffleMaxTicketsPerWallet =
  /*#__PURE__*/ createUseReadContract({
    abi: roffleAbi,
    functionName: 'MAX_TICKETS_PER_WALLET',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link roffleAbi}__ and `functionName` set to `"MAX_TOTAL_TICKETS"`
 */
export const useReadRoffleMaxTotalTickets = /*#__PURE__*/ createUseReadContract(
  { abi: roffleAbi, functionName: 'MAX_TOTAL_TICKETS' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link roffleAbi}__ and `functionName` set to `"PRIZE_PERCENTAGES"`
 */
export const useReadRofflePrizePercentages =
  /*#__PURE__*/ createUseReadContract({
    abi: roffleAbi,
    functionName: 'PRIZE_PERCENTAGES',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link roffleAbi}__ and `functionName` set to `"TICKET_PRICE"`
 */
export const useReadRoffleTicketPrice = /*#__PURE__*/ createUseReadContract({
  abi: roffleAbi,
  functionName: 'TICKET_PRICE',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link roffleAbi}__ and `functionName` set to `"WINNER_COUNT"`
 */
export const useReadRoffleWinnerCount = /*#__PURE__*/ createUseReadContract({
  abi: roffleAbi,
  functionName: 'WINNER_COUNT',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link roffleAbi}__ and `functionName` set to `"getPrizeForRank"`
 */
export const useReadRoffleGetPrizeForRank = /*#__PURE__*/ createUseReadContract(
  { abi: roffleAbi, functionName: 'getPrizeForRank' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link roffleAbi}__ and `functionName` set to `"getTicketsAllowedForWallet"`
 */
export const useReadRoffleGetTicketsAllowedForWallet =
  /*#__PURE__*/ createUseReadContract({
    abi: roffleAbi,
    functionName: 'getTicketsAllowedForWallet',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link roffleAbi}__ and `functionName` set to `"getTicketsRemaining"`
 */
export const useReadRoffleGetTicketsRemaining =
  /*#__PURE__*/ createUseReadContract({
    abi: roffleAbi,
    functionName: 'getTicketsRemaining',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link roffleAbi}__ and `functionName` set to `"getTimeRemaining"`
 */
export const useReadRoffleGetTimeRemaining =
  /*#__PURE__*/ createUseReadContract({
    abi: roffleAbi,
    functionName: 'getTimeRemaining',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link roffleAbi}__ and `functionName` set to `"getTotalEntries"`
 */
export const useReadRoffleGetTotalEntries = /*#__PURE__*/ createUseReadContract(
  { abi: roffleAbi, functionName: 'getTotalEntries' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link roffleAbi}__ and `functionName` set to `"getTotalPrizePool"`
 */
export const useReadRoffleGetTotalPrizePool =
  /*#__PURE__*/ createUseReadContract({
    abi: roffleAbi,
    functionName: 'getTotalPrizePool',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link roffleAbi}__ and `functionName` set to `"getWinners"`
 */
export const useReadRoffleGetWinners = /*#__PURE__*/ createUseReadContract({
  abi: roffleAbi,
  functionName: 'getWinners',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link roffleAbi}__ and `functionName` set to `"isActive"`
 */
export const useReadRoffleIsActive = /*#__PURE__*/ createUseReadContract({
  abi: roffleAbi,
  functionName: 'isActive',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link roffleAbi}__ and `functionName` set to `"opfContribution"`
 */
export const useReadRoffleOpfContribution = /*#__PURE__*/ createUseReadContract(
  { abi: roffleAbi, functionName: 'opfContribution' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link roffleAbi}__ and `functionName` set to `"owner"`
 */
export const useReadRoffleOwner = /*#__PURE__*/ createUseReadContract({
  abi: roffleAbi,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link roffleAbi}__ and `functionName` set to `"raffleEndTime"`
 */
export const useReadRoffleRaffleEndTime = /*#__PURE__*/ createUseReadContract({
  abi: roffleAbi,
  functionName: 'raffleEndTime',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link roffleAbi}__ and `functionName` set to `"state"`
 */
export const useReadRoffleState = /*#__PURE__*/ createUseReadContract({
  abi: roffleAbi,
  functionName: 'state',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link roffleAbi}__ and `functionName` set to `"ticketsPurchased"`
 */
export const useReadRoffleTicketsPurchased =
  /*#__PURE__*/ createUseReadContract({
    abi: roffleAbi,
    functionName: 'ticketsPurchased',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link roffleAbi}__ and `functionName` set to `"ticketsSold"`
 */
export const useReadRoffleTicketsSold = /*#__PURE__*/ createUseReadContract({
  abi: roffleAbi,
  functionName: 'ticketsSold',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link roffleAbi}__ and `functionName` set to `"winners"`
 */
export const useReadRoffleWinners = /*#__PURE__*/ createUseReadContract({
  abi: roffleAbi,
  functionName: 'winners',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link roffleAbi}__
 */
export const useWriteRoffle = /*#__PURE__*/ createUseWriteContract({
  abi: roffleAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link roffleAbi}__ and `functionName` set to `"addOPFContribution"`
 */
export const useWriteRoffleAddOpfContribution =
  /*#__PURE__*/ createUseWriteContract({
    abi: roffleAbi,
    functionName: 'addOPFContribution',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link roffleAbi}__ and `functionName` set to `"buyTickets"`
 */
export const useWriteRoffleBuyTickets = /*#__PURE__*/ createUseWriteContract({
  abi: roffleAbi,
  functionName: 'buyTickets',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link roffleAbi}__ and `functionName` set to `"cancelAndRefund"`
 */
export const useWriteRoffleCancelAndRefund =
  /*#__PURE__*/ createUseWriteContract({
    abi: roffleAbi,
    functionName: 'cancelAndRefund',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link roffleAbi}__ and `functionName` set to `"closeSalesEarly"`
 */
export const useWriteRoffleCloseSalesEarly =
  /*#__PURE__*/ createUseWriteContract({
    abi: roffleAbi,
    functionName: 'closeSalesEarly',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link roffleAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useWriteRoffleRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: roffleAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link roffleAbi}__ and `functionName` set to `"selectWinnersAndDistribute"`
 */
export const useWriteRoffleSelectWinnersAndDistribute =
  /*#__PURE__*/ createUseWriteContract({
    abi: roffleAbi,
    functionName: 'selectWinnersAndDistribute',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link roffleAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWriteRoffleTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: roffleAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link roffleAbi}__ and `functionName` set to `"withdrawOPFContribution"`
 */
export const useWriteRoffleWithdrawOpfContribution =
  /*#__PURE__*/ createUseWriteContract({
    abi: roffleAbi,
    functionName: 'withdrawOPFContribution',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link roffleAbi}__
 */
export const useSimulateRoffle = /*#__PURE__*/ createUseSimulateContract({
  abi: roffleAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link roffleAbi}__ and `functionName` set to `"addOPFContribution"`
 */
export const useSimulateRoffleAddOpfContribution =
  /*#__PURE__*/ createUseSimulateContract({
    abi: roffleAbi,
    functionName: 'addOPFContribution',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link roffleAbi}__ and `functionName` set to `"buyTickets"`
 */
export const useSimulateRoffleBuyTickets =
  /*#__PURE__*/ createUseSimulateContract({
    abi: roffleAbi,
    functionName: 'buyTickets',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link roffleAbi}__ and `functionName` set to `"cancelAndRefund"`
 */
export const useSimulateRoffleCancelAndRefund =
  /*#__PURE__*/ createUseSimulateContract({
    abi: roffleAbi,
    functionName: 'cancelAndRefund',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link roffleAbi}__ and `functionName` set to `"closeSalesEarly"`
 */
export const useSimulateRoffleCloseSalesEarly =
  /*#__PURE__*/ createUseSimulateContract({
    abi: roffleAbi,
    functionName: 'closeSalesEarly',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link roffleAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useSimulateRoffleRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: roffleAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link roffleAbi}__ and `functionName` set to `"selectWinnersAndDistribute"`
 */
export const useSimulateRoffleSelectWinnersAndDistribute =
  /*#__PURE__*/ createUseSimulateContract({
    abi: roffleAbi,
    functionName: 'selectWinnersAndDistribute',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link roffleAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulateRoffleTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: roffleAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link roffleAbi}__ and `functionName` set to `"withdrawOPFContribution"`
 */
export const useSimulateRoffleWithdrawOpfContribution =
  /*#__PURE__*/ createUseSimulateContract({
    abi: roffleAbi,
    functionName: 'withdrawOPFContribution',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link roffleAbi}__
 */
export const useWatchRoffleEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: roffleAbi,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link roffleAbi}__ and `eventName` set to `"OPFContributionAdded"`
 */
export const useWatchRoffleOpfContributionAddedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: roffleAbi,
    eventName: 'OPFContributionAdded',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link roffleAbi}__ and `eventName` set to `"OPFContributionWithdrawn"`
 */
export const useWatchRoffleOpfContributionWithdrawnEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: roffleAbi,
    eventName: 'OPFContributionWithdrawn',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link roffleAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchRoffleOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: roffleAbi,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link roffleAbi}__ and `eventName` set to `"PrizeDistributed"`
 */
export const useWatchRofflePrizeDistributedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: roffleAbi,
    eventName: 'PrizeDistributed',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link roffleAbi}__ and `eventName` set to `"RefundIssued"`
 */
export const useWatchRoffleRefundIssuedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: roffleAbi,
    eventName: 'RefundIssued',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link roffleAbi}__ and `eventName` set to `"SalesClosed"`
 */
export const useWatchRoffleSalesClosedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: roffleAbi,
    eventName: 'SalesClosed',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link roffleAbi}__ and `eventName` set to `"TicketsPurchased"`
 */
export const useWatchRoffleTicketsPurchasedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: roffleAbi,
    eventName: 'TicketsPurchased',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link roffleAbi}__ and `eventName` set to `"WinnersSelected"`
 */
export const useWatchRoffleWinnersSelectedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: roffleAbi,
    eventName: 'WinnersSelected',
  })
