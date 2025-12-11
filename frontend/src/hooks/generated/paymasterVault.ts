import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PaymasterVault
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const paymasterVaultAbi = [
  {
    type: 'error',
    inputs: [{ name: 'target', internalType: 'address', type: 'address' }],
    name: 'AddressEmptyCode',
  },
  { type: 'error', inputs: [], name: 'AmountAboveMaximum' },
  { type: 'error', inputs: [], name: 'AmountBelowMinimum' },
  { type: 'error', inputs: [], name: 'AmountExceedsSafeLimit' },
  { type: 'error', inputs: [], name: 'CircuitBreakerTriggered' },
  {
    type: 'error',
    inputs: [
      { name: 'implementation', internalType: 'address', type: 'address' },
    ],
    name: 'ERC1967InvalidImplementation',
  },
  { type: 'error', inputs: [], name: 'ERC1967NonPayable' },
  { type: 'error', inputs: [], name: 'EnforcedPause' },
  { type: 'error', inputs: [], name: 'ExpectedPause' },
  { type: 'error', inputs: [], name: 'FailedCall' },
  {
    type: 'error',
    inputs: [
      { name: 'available', internalType: 'uint256', type: 'uint256' },
      { name: 'required', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'InsufficientBalance',
  },
  { type: 'error', inputs: [], name: 'InvalidAmount' },
  { type: 'error', inputs: [], name: 'InvalidDecimals' },
  { type: 'error', inputs: [], name: 'InvalidInitialization' },
  { type: 'error', inputs: [], name: 'InvalidMaxAmount' },
  { type: 'error', inputs: [], name: 'InvalidMinAmount' },
  { type: 'error', inputs: [], name: 'InvalidRecipient' },
  { type: 'error', inputs: [], name: 'MinAmountExceedsMax' },
  { type: 'error', inputs: [], name: 'NotInitializing' },
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
  { type: 'error', inputs: [], name: 'ReentrancyGuardReentrantCall' },
  {
    type: 'error',
    inputs: [{ name: 'token', internalType: 'address', type: 'address' }],
    name: 'SafeERC20FailedOperation',
  },
  { type: 'error', inputs: [], name: 'UUPSUnauthorizedCallContext' },
  {
    type: 'error',
    inputs: [{ name: 'slot', internalType: 'bytes32', type: 'bytes32' }],
    name: 'UUPSUnsupportedProxiableUUID',
  },
  { type: 'error', inputs: [], name: 'UnsupportedToken' },
  { type: 'error', inputs: [], name: 'ZeroAddress' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'DepositsPaused',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'DepositsUnpaused',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'version',
        internalType: 'uint64',
        type: 'uint64',
        indexed: false,
      },
    ],
    name: 'Initialized',
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
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'Paused',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'payer',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'recipient',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'token',
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
      {
        name: 'paymentId',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: false,
      },
    ],
    name: 'PaymentInitiated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'token',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'minDepositAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'maxDepositAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'TokenAdded',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'token',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'minDepositAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'maxDepositAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      { name: 'enabled', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'TokenConfigUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'depositId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'depositor',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'token',
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
      {
        name: 'recipient',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'blockNumber',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'TokenDeposited',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'token',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'TokenWithdrawn',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'Unpaused',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'implementation',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'Upgraded',
  },
  {
    type: 'function',
    inputs: [],
    name: 'UPGRADE_INTERFACE_VERSION',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'blockHeaderRequester',
    outputs: [
      {
        name: '',
        internalType: 'contract BlockHeaderRequester',
        type: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'token', internalType: 'contract IERC20', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'recipient', internalType: 'address', type: 'address' },
    ],
    name: 'deposit',
    outputs: [{ name: 'depositId', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'depositsArePaused',
    outputs: [{ name: 'paused_', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'chainId', internalType: 'uint256', type: 'uint256' },
      { name: 'vault', internalType: 'address', type: 'address' },
      { name: 'blockNumber', internalType: 'uint256', type: 'uint256' },
      { name: 'txIndex', internalType: 'uint256', type: 'uint256' },
      { name: 'logIndex', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'derivePaymentId',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [{ name: 'depositId', internalType: 'uint256', type: 'uint256' }],
    name: 'getDeposit',
    outputs: [
      { name: 'depositor', internalType: 'address', type: 'address' },
      { name: 'token', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'recipient', internalType: 'address', type: 'address' },
      { name: 'blockNumber', internalType: 'uint256', type: 'uint256' },
      { name: 'timestamp', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'token', internalType: 'contract IERC20', type: 'address' },
    ],
    name: 'getTokenCircuitBreaker',
    outputs: [
      {
        name: '',
        internalType: 'struct RemoteTypes.CircuitBreaker',
        type: 'tuple',
        components: [
          { name: 'dailyLimit', internalType: 'uint128', type: 'uint128' },
          { name: 'currentVolume', internalType: 'uint128', type: 'uint128' },
          { name: 'lastResetDay', internalType: 'uint32', type: 'uint32' },
          { name: 'enabled', internalType: 'bool', type: 'bool' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'token', internalType: 'contract IERC20', type: 'address' },
    ],
    name: 'getTokenConfig',
    outputs: [
      { name: 'minAmount', internalType: 'uint256', type: 'uint256' },
      { name: 'maxAmount', internalType: 'uint256', type: 'uint256' },
      { name: 'enabled', internalType: 'bool', type: 'bool' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'token', internalType: 'contract IERC20', type: 'address' },
    ],
    name: 'getTotalDeposited',
    outputs: [
      { name: 'totalDeposited', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_owner', internalType: 'address', type: 'address' },
      {
        name: '_blockHeaderRequester',
        internalType: 'address',
        type: 'address',
      },
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'token', internalType: 'contract IERC20', type: 'address' },
    ],
    name: 'isTokenSupported',
    outputs: [{ name: 'supported', internalType: 'bool', type: 'bool' }],
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
    name: 'pauseDeposits',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'paused',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'proxiableUUID',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
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
    inputs: [
      { name: 'token', internalType: 'contract IERC20', type: 'address' },
      { name: 'enabled', internalType: 'bool', type: 'bool' },
    ],
    name: 'setTokenCircuitBreakerEnabled',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'token', internalType: 'contract IERC20', type: 'address' },
      {
        name: 'cfg',
        internalType: 'struct RemoteTypes.AssetConfig',
        type: 'tuple',
        components: [
          { name: 'enabled', internalType: 'bool', type: 'bool' },
          { name: 'decimals', internalType: 'uint8', type: 'uint8' },
          { name: 'minAmount', internalType: 'uint96', type: 'uint96' },
          { name: 'maxAmount', internalType: 'uint96', type: 'uint96' },
        ],
      },
    ],
    name: 'setTokenConfig',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'token', internalType: 'contract IERC20', type: 'address' },
      { name: 'newLimit', internalType: 'uint128', type: 'uint128' },
    ],
    name: 'setTokenDailyLimit',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'token', internalType: 'contract IERC20', type: 'address' },
      { name: 'enabled', internalType: 'bool', type: 'bool' },
    ],
    name: 'setTokenEnabled',
    outputs: [],
    stateMutability: 'nonpayable',
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
    inputs: [],
    name: 'unpauseDeposits',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'newImplementation', internalType: 'address', type: 'address' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'upgradeToAndCall',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'token', internalType: 'contract IERC20', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'withdrawToken',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link paymasterVaultAbi}__
 */
export const useReadPaymasterVault = /*#__PURE__*/ createUseReadContract({
  abi: paymasterVaultAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link paymasterVaultAbi}__ and `functionName` set to `"UPGRADE_INTERFACE_VERSION"`
 */
export const useReadPaymasterVaultUpgradeInterfaceVersion =
  /*#__PURE__*/ createUseReadContract({
    abi: paymasterVaultAbi,
    functionName: 'UPGRADE_INTERFACE_VERSION',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link paymasterVaultAbi}__ and `functionName` set to `"blockHeaderRequester"`
 */
export const useReadPaymasterVaultBlockHeaderRequester =
  /*#__PURE__*/ createUseReadContract({
    abi: paymasterVaultAbi,
    functionName: 'blockHeaderRequester',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link paymasterVaultAbi}__ and `functionName` set to `"depositsArePaused"`
 */
export const useReadPaymasterVaultDepositsArePaused =
  /*#__PURE__*/ createUseReadContract({
    abi: paymasterVaultAbi,
    functionName: 'depositsArePaused',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link paymasterVaultAbi}__ and `functionName` set to `"derivePaymentId"`
 */
export const useReadPaymasterVaultDerivePaymentId =
  /*#__PURE__*/ createUseReadContract({
    abi: paymasterVaultAbi,
    functionName: 'derivePaymentId',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link paymasterVaultAbi}__ and `functionName` set to `"getDeposit"`
 */
export const useReadPaymasterVaultGetDeposit =
  /*#__PURE__*/ createUseReadContract({
    abi: paymasterVaultAbi,
    functionName: 'getDeposit',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link paymasterVaultAbi}__ and `functionName` set to `"getTokenCircuitBreaker"`
 */
export const useReadPaymasterVaultGetTokenCircuitBreaker =
  /*#__PURE__*/ createUseReadContract({
    abi: paymasterVaultAbi,
    functionName: 'getTokenCircuitBreaker',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link paymasterVaultAbi}__ and `functionName` set to `"getTokenConfig"`
 */
export const useReadPaymasterVaultGetTokenConfig =
  /*#__PURE__*/ createUseReadContract({
    abi: paymasterVaultAbi,
    functionName: 'getTokenConfig',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link paymasterVaultAbi}__ and `functionName` set to `"getTotalDeposited"`
 */
export const useReadPaymasterVaultGetTotalDeposited =
  /*#__PURE__*/ createUseReadContract({
    abi: paymasterVaultAbi,
    functionName: 'getTotalDeposited',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link paymasterVaultAbi}__ and `functionName` set to `"isTokenSupported"`
 */
export const useReadPaymasterVaultIsTokenSupported =
  /*#__PURE__*/ createUseReadContract({
    abi: paymasterVaultAbi,
    functionName: 'isTokenSupported',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link paymasterVaultAbi}__ and `functionName` set to `"owner"`
 */
export const useReadPaymasterVaultOwner = /*#__PURE__*/ createUseReadContract({
  abi: paymasterVaultAbi,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link paymasterVaultAbi}__ and `functionName` set to `"paused"`
 */
export const useReadPaymasterVaultPaused = /*#__PURE__*/ createUseReadContract({
  abi: paymasterVaultAbi,
  functionName: 'paused',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link paymasterVaultAbi}__ and `functionName` set to `"proxiableUUID"`
 */
export const useReadPaymasterVaultProxiableUuid =
  /*#__PURE__*/ createUseReadContract({
    abi: paymasterVaultAbi,
    functionName: 'proxiableUUID',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link paymasterVaultAbi}__
 */
export const useWritePaymasterVault = /*#__PURE__*/ createUseWriteContract({
  abi: paymasterVaultAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link paymasterVaultAbi}__ and `functionName` set to `"deposit"`
 */
export const useWritePaymasterVaultDeposit =
  /*#__PURE__*/ createUseWriteContract({
    abi: paymasterVaultAbi,
    functionName: 'deposit',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link paymasterVaultAbi}__ and `functionName` set to `"initialize"`
 */
export const useWritePaymasterVaultInitialize =
  /*#__PURE__*/ createUseWriteContract({
    abi: paymasterVaultAbi,
    functionName: 'initialize',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link paymasterVaultAbi}__ and `functionName` set to `"pauseDeposits"`
 */
export const useWritePaymasterVaultPauseDeposits =
  /*#__PURE__*/ createUseWriteContract({
    abi: paymasterVaultAbi,
    functionName: 'pauseDeposits',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link paymasterVaultAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useWritePaymasterVaultRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: paymasterVaultAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link paymasterVaultAbi}__ and `functionName` set to `"setTokenCircuitBreakerEnabled"`
 */
export const useWritePaymasterVaultSetTokenCircuitBreakerEnabled =
  /*#__PURE__*/ createUseWriteContract({
    abi: paymasterVaultAbi,
    functionName: 'setTokenCircuitBreakerEnabled',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link paymasterVaultAbi}__ and `functionName` set to `"setTokenConfig"`
 */
export const useWritePaymasterVaultSetTokenConfig =
  /*#__PURE__*/ createUseWriteContract({
    abi: paymasterVaultAbi,
    functionName: 'setTokenConfig',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link paymasterVaultAbi}__ and `functionName` set to `"setTokenDailyLimit"`
 */
export const useWritePaymasterVaultSetTokenDailyLimit =
  /*#__PURE__*/ createUseWriteContract({
    abi: paymasterVaultAbi,
    functionName: 'setTokenDailyLimit',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link paymasterVaultAbi}__ and `functionName` set to `"setTokenEnabled"`
 */
export const useWritePaymasterVaultSetTokenEnabled =
  /*#__PURE__*/ createUseWriteContract({
    abi: paymasterVaultAbi,
    functionName: 'setTokenEnabled',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link paymasterVaultAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWritePaymasterVaultTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: paymasterVaultAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link paymasterVaultAbi}__ and `functionName` set to `"unpauseDeposits"`
 */
export const useWritePaymasterVaultUnpauseDeposits =
  /*#__PURE__*/ createUseWriteContract({
    abi: paymasterVaultAbi,
    functionName: 'unpauseDeposits',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link paymasterVaultAbi}__ and `functionName` set to `"upgradeToAndCall"`
 */
export const useWritePaymasterVaultUpgradeToAndCall =
  /*#__PURE__*/ createUseWriteContract({
    abi: paymasterVaultAbi,
    functionName: 'upgradeToAndCall',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link paymasterVaultAbi}__ and `functionName` set to `"withdrawToken"`
 */
export const useWritePaymasterVaultWithdrawToken =
  /*#__PURE__*/ createUseWriteContract({
    abi: paymasterVaultAbi,
    functionName: 'withdrawToken',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link paymasterVaultAbi}__
 */
export const useSimulatePaymasterVault =
  /*#__PURE__*/ createUseSimulateContract({ abi: paymasterVaultAbi })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link paymasterVaultAbi}__ and `functionName` set to `"deposit"`
 */
export const useSimulatePaymasterVaultDeposit =
  /*#__PURE__*/ createUseSimulateContract({
    abi: paymasterVaultAbi,
    functionName: 'deposit',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link paymasterVaultAbi}__ and `functionName` set to `"initialize"`
 */
export const useSimulatePaymasterVaultInitialize =
  /*#__PURE__*/ createUseSimulateContract({
    abi: paymasterVaultAbi,
    functionName: 'initialize',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link paymasterVaultAbi}__ and `functionName` set to `"pauseDeposits"`
 */
export const useSimulatePaymasterVaultPauseDeposits =
  /*#__PURE__*/ createUseSimulateContract({
    abi: paymasterVaultAbi,
    functionName: 'pauseDeposits',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link paymasterVaultAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useSimulatePaymasterVaultRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: paymasterVaultAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link paymasterVaultAbi}__ and `functionName` set to `"setTokenCircuitBreakerEnabled"`
 */
export const useSimulatePaymasterVaultSetTokenCircuitBreakerEnabled =
  /*#__PURE__*/ createUseSimulateContract({
    abi: paymasterVaultAbi,
    functionName: 'setTokenCircuitBreakerEnabled',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link paymasterVaultAbi}__ and `functionName` set to `"setTokenConfig"`
 */
export const useSimulatePaymasterVaultSetTokenConfig =
  /*#__PURE__*/ createUseSimulateContract({
    abi: paymasterVaultAbi,
    functionName: 'setTokenConfig',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link paymasterVaultAbi}__ and `functionName` set to `"setTokenDailyLimit"`
 */
export const useSimulatePaymasterVaultSetTokenDailyLimit =
  /*#__PURE__*/ createUseSimulateContract({
    abi: paymasterVaultAbi,
    functionName: 'setTokenDailyLimit',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link paymasterVaultAbi}__ and `functionName` set to `"setTokenEnabled"`
 */
export const useSimulatePaymasterVaultSetTokenEnabled =
  /*#__PURE__*/ createUseSimulateContract({
    abi: paymasterVaultAbi,
    functionName: 'setTokenEnabled',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link paymasterVaultAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulatePaymasterVaultTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: paymasterVaultAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link paymasterVaultAbi}__ and `functionName` set to `"unpauseDeposits"`
 */
export const useSimulatePaymasterVaultUnpauseDeposits =
  /*#__PURE__*/ createUseSimulateContract({
    abi: paymasterVaultAbi,
    functionName: 'unpauseDeposits',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link paymasterVaultAbi}__ and `functionName` set to `"upgradeToAndCall"`
 */
export const useSimulatePaymasterVaultUpgradeToAndCall =
  /*#__PURE__*/ createUseSimulateContract({
    abi: paymasterVaultAbi,
    functionName: 'upgradeToAndCall',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link paymasterVaultAbi}__ and `functionName` set to `"withdrawToken"`
 */
export const useSimulatePaymasterVaultWithdrawToken =
  /*#__PURE__*/ createUseSimulateContract({
    abi: paymasterVaultAbi,
    functionName: 'withdrawToken',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link paymasterVaultAbi}__
 */
export const useWatchPaymasterVaultEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: paymasterVaultAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link paymasterVaultAbi}__ and `eventName` set to `"DepositsPaused"`
 */
export const useWatchPaymasterVaultDepositsPausedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: paymasterVaultAbi,
    eventName: 'DepositsPaused',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link paymasterVaultAbi}__ and `eventName` set to `"DepositsUnpaused"`
 */
export const useWatchPaymasterVaultDepositsUnpausedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: paymasterVaultAbi,
    eventName: 'DepositsUnpaused',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link paymasterVaultAbi}__ and `eventName` set to `"Initialized"`
 */
export const useWatchPaymasterVaultInitializedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: paymasterVaultAbi,
    eventName: 'Initialized',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link paymasterVaultAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchPaymasterVaultOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: paymasterVaultAbi,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link paymasterVaultAbi}__ and `eventName` set to `"Paused"`
 */
export const useWatchPaymasterVaultPausedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: paymasterVaultAbi,
    eventName: 'Paused',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link paymasterVaultAbi}__ and `eventName` set to `"PaymentInitiated"`
 */
export const useWatchPaymasterVaultPaymentInitiatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: paymasterVaultAbi,
    eventName: 'PaymentInitiated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link paymasterVaultAbi}__ and `eventName` set to `"TokenAdded"`
 */
export const useWatchPaymasterVaultTokenAddedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: paymasterVaultAbi,
    eventName: 'TokenAdded',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link paymasterVaultAbi}__ and `eventName` set to `"TokenConfigUpdated"`
 */
export const useWatchPaymasterVaultTokenConfigUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: paymasterVaultAbi,
    eventName: 'TokenConfigUpdated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link paymasterVaultAbi}__ and `eventName` set to `"TokenDeposited"`
 */
export const useWatchPaymasterVaultTokenDepositedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: paymasterVaultAbi,
    eventName: 'TokenDeposited',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link paymasterVaultAbi}__ and `eventName` set to `"TokenWithdrawn"`
 */
export const useWatchPaymasterVaultTokenWithdrawnEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: paymasterVaultAbi,
    eventName: 'TokenWithdrawn',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link paymasterVaultAbi}__ and `eventName` set to `"Unpaused"`
 */
export const useWatchPaymasterVaultUnpausedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: paymasterVaultAbi,
    eventName: 'Unpaused',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link paymasterVaultAbi}__ and `eventName` set to `"Upgraded"`
 */
export const useWatchPaymasterVaultUpgradedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: paymasterVaultAbi,
    eventName: 'Upgraded',
  })
