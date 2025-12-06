import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { parseEther } from 'viem';
import { abi } from '../../artifacts/contracts/Raffle.sol/Raffle.json';

// TODO: update when mainnet
const RAFFLE_CONTRACT_ADDRESS = '0x0165878A594ca255338adfa4d48449f69242Eb8F' as `0x${string}`;

function App() {
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess, error: error2 } = useWaitForTransactionReceipt({
    hash,
  });

  const handleEnter = () => {
    writeContract({
      address: RAFFLE_CONTRACT_ADDRESS,
      abi: abi,
      functionName: 'enter',
      // TODO: 250
      value: parseEther('0.02'),
    });
  };

  return (
    <div>
      <h1>Xmas Raffle</h1>
      <ConnectButton />
      <div style={{ marginTop: '20px' }}>
        <div>
          1: {error?.name}_{error?.message}
          <br />
          2: {error2?.name}_{error2?.message}
          <br />
          <code>
            TODO: error is bad. does not print "too late". prints
            {`2: CallExecutionError_Missing or invalid parameters. Double check you have provided the correct parameters. URL: http://localhost:8545 Request body: {"method":"eth_call","params":[{"data":"0xe97dcb62","from":"0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266","gas":"0x1edbec","gasPrice":"0x174876e800","nonce":"0x13","to":"0x0165878a594ca255338adfa4d48449f69242eb8f","value":"0x470de4df820000"},"0x1b8c"]} Raw Call Arguments: from: 0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266 to: 0x0165878a594ca255338adfa4d48449f69242eb8f value: 0.02 TEST data: 0xe97dcb62 gas: 2022380 gasPrice: 100 gwei nonce: 19 Details: execution failed: out of funds Version: viem@2.41.2_Missing or invalid parameters. Double check you have provided the correct parameters.`}
          </code>
        </div>
        <button
          onClick={handleEnter}
          disabled={isPending || isConfirming}
        >
          {isPending ? 'Confirming...' : isConfirming ? 'Processing...' : 'Enter Raffle'}
        </button>
        {isSuccess && (
          <div>
            <p>Transaction successful!</p>
            <p>Hash: {hash}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

