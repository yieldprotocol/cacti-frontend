import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { JsonRpcProvider } from '@ethersproject/providers';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import { BigNumber, BigNumberish } from 'ethers';
import { parseEther } from 'ethers/lib/utils.js';
import { getJSDocParameterTags } from 'typescript';
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

interface Props {
  nftAddress: string;
  tokenId: string;
}

interface BasicOrderParameters {
  considerationToken: string;
  considerationIdentifier: BigNumberish;
  considerationAmount: BigNumberish;
  offerer: string;
  zone?: string;
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
  additionalRecipients: [any];
  signature: string;
}

const fetchListing = async (nftAddress: string, tokenId: string) => {
  return axios
    .get(
      `https://api.opensea.io/v2/orders/ethereum/seaport/listings?asset_contract_address=${nftAddress}&token_ids=${tokenId}&order_by=created_date&order_direction=desc`,
      {
        headers: {
          Accept: 'application/json',
          'X-API-Key': '2cbc58c203fd498f9ff9c531f3f71c27',
        },
      }
    )
    .then((res) => {
      console.log('res is', res);

      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

const fillOrder = async (orderHash: string, fulfillerAddr: string) => {
  const data = {
    listing: {
      hash: orderHash,
      chain: 'ethereum',
      protocol_address: '0x00000000000001ad428e4906aE43D8F9852d0dD6', // Seaport 1.4
    },
    fulfiller: {
      address: fulfillerAddr,
    },
  };

  return axios
    .post('https://api.opensea.io/v2/listings/fulfillment_data', data, {
      headers: {
        Accept: 'application/json',
        'X-API-Key': '2cbc58c203fd498f9ff9c531f3f71c27',
      },
    })
    .then((res) => {
      console.log('fullfillment res is', res);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const BuyNFT = ({ nftAddress, tokenId }: Props) => {
  // Owner is the receiver
  const { address: receiver } = useAccount();
  const provider = useProvider() as JsonRpcProvider;
  const { data: blockNumber } = useBlockNumber();
  const [timeStamp, setTimeStamp] = useState(0);
  const [myParams, setMyParams] = useState();

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
    if (params) {
      params['considerationAmount'] = BigNumber.from(params['considerationAmount'].toString());
      params['salt'] = BigNumber.from(`3`);
    }
  });

  const { isLoading, isError, error, data } = useQuery(['listing', nftAddress, tokenId], async () =>
    fetchListing(nftAddress, tokenId)
  );

  console.log('listing data is', data);
  console.log('listing hash is', data?.orders[0].order_hash);
  const orderHash = data?.orders[0].order_hash;

  const { data: fulfillmentData } = useQuery(['fulfillment', orderHash], async () =>
    fillOrder(orderHash, receiver || '0x637C1Ec1d205a4E7a79c9CE4Bd100CD1d19E6080')
  );

  console.log('fullfillment data is', fulfillmentData);

  let params = fulfillmentData?.fulfillment_data.transaction.input_data
    .parameters as BasicOrderParameters;

  const paramValue = fulfillmentData?.fulfillment_data.transaction.value;
  console.log('params are', params);

  const { config: swapConfig, error: prepareWriteError } = usePrepareContractWrite({
    address: '0x00000000000001ad428e4906aE43D8F9852d0dD6',
    abi: SeaportAbi,
    functionName: 'fulfillBasicOrder',
    args: [params],
    overrides: {
      value: BigNumber.from(paramValue?.toString() || 0),
      gasLimit: BigNumber.from('300000'), // Errors on mainnet without this
    },
  });
  const err: Error & { reason?: string } = prepareWriteError;

  const {
    write: swapWrite,
    data: ContractWriteData,
    isError: NFTError,
  } = useContractWrite(swapConfig);

  const {
    isLoading: isTxPending,
    isSuccess,
    isError: txError,
  } = useWaitForTransaction({ hash: data?.hash });

  return (
    <div>
      component mounted
      {isSuccess && <p>Success!</p>}
      {txError && <p>Tx error: {txError}</p>}
      {isTxPending ? (
        <Button className="flex items-center" disabled>
          <Spinner /> Buying NFT...
        </Button>
      ) : ContractWriteData?.hash ? (
        <div className="flex items-center disabled:border-0 disabled:bg-green-700">
          <CheckCircleIcon className="h-5 text-green-600" />
          <div className="p-1 text-green-600">Success</div>
        </div>
      ) : (
        <Button disabled={!swapWrite} onClick={() => swapWrite?.()}>
          Buy NFT
        </Button>
      )}
      {ContractWriteData?.hash && (
        <div>
          <a
            className="text-blue-200 underline"
            href={`https://goerli.etherscan.io/tx/${ContractWriteData?.hash}`}
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
