import { useEffect, useState } from 'react';
import { JsonRpcProvider } from '@ethersproject/providers';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { BigNumberish } from 'ethers';
import { parseEther } from 'ethers/lib/utils.js';
import {
  useAccount,
  useBlockNumber,
  useContractWrite,
  usePrepareContractWrite,
  useProvider,
  useWaitForTransaction,
} from 'wagmi';
import { Spinner } from '@/utils';
import SeaportAbi from '../abi/SeaportAbi.json';
import { Button } from './Button';
import { WidgetError } from './widgets/helpers';

interface Props {}
interface BasicOrderParameters {
  considerationToken: string;
  considerationIdentifier: BigNumberish;
  considerationAmount: BigNumberish;
  offerer: string;
  zone: string;
  offerToken: string;
  offerIdentifier: BigNumberish;
  offerAmount: BigNumberish;
  basicOrderType: string;
  startTime: BigNumberish;
  endTime: BigNumberish;
  zoneHash: string;
  salt: BigNumberish;
  offererConduitKey: string;
  fulfillerConduitKey: string;
  totalOriginalAdditionalRecipients: BigNumberish;
  additionalRecipients: [string];
  signature: string;
}
export const BuyNFT = (props: Props) => {
  // Owner is the receiver
  const { address: receiver } = useAccount();
  const provider = useProvider() as JsonRpcProvider;
  const { data: blockNumber, isError } = useBlockNumber();
  const [timeStamp, setTimeStamp] = useState(0);

  const getBlock = async () => {
    const block = await provider.getBlock(blockNumber);
    return block;
  };

  const getTimeStamp = async () => {
    const block = await getBlock();
    setTimeStamp(block.timestamp);
  };

  useEffect(() => {
    getTimeStamp();
  });

  const params: BasicOrderParameters = {
    considerationToken: '0x23581767a106ae21c074b2276d25e5c3e136a68b',
    considerationIdentifier: 8652,
    considerationAmount: 1,
    offerer: receiver,
    zone: '',
    offerToken: '0x0000000000000000000000000000000000000000',
    offerIdentifier: '3',
    offerAmount: parseEther('6.99'),
    basicOrderType: 'FULL_OPEN',
    startTime: timeStamp,
    endTime: timeStamp + 86400,
    zoneHash: '0x3000000000000000000000000000000000000000000000000000000000000000',
    salt: '1178663006809303457',
    offererConduitKey: '',
    fulfillerConduitKey: '',
    totalOriginalAdditionalRecipients: 0,
    additionalRecipients: [''],
    signature: '',
  };

  const { config: swapConfig, error } = usePrepareContractWrite({
    address: '0x00000000006c3852cbEf3e08E8dF289169EdE581',
    abi: SeaportAbi,
    functionName: 'fulfillBasicOrder',
    args: [params],
    overrides: {
      value: parseEther('6.99'),
    },
  });
  const err: Error & { reason?: string } = error;

  const { write: swapWrite, data, isError: NFTError } = useContractWrite(swapConfig);
  const { isLoading } = useWaitForTransaction({ hash: data?.hash });

  return (
    <div>
      {isLoading ? (
        <Button className="flex items-center" disabled>
          <Spinner /> Buying NFT...
        </Button>
      ) : data?.hash ? (
        <div className="flex items-center disabled:border-0 disabled:bg-green-700">
          <CheckCircleIcon className="h-5 text-green-600" />
          <div className="p-1 text-green-600">Success</div>
        </div>
      ) : (
        <Button disabled={!swapWrite} onClick={() => swapWrite?.()}>
          Buy NFT
        </Button>
      )}
      {data?.hash && (
        <div>
          <a
            className="text-blue-200 underline"
            href={`https://goerli.etherscan.io/tx/${data?.hash}`}
            target="_blank"
            rel="noreferrer"
          >
            View on Etherscan
          </a>
        </div>
      )}
      {err && <WidgetError>Error simulating transaction: {err.message || err.reason}</WidgetError>}
    </div>
  );
};
