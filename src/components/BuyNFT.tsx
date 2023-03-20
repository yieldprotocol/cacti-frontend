import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { JsonRpcProvider } from '@ethersproject/providers';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import { BigNumber, BigNumberish } from 'ethers';
import * as JSONbigint from 'json-bigint';
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

const JSONbig = JSONbigint({ storeAsString: true });

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
    .then((res) => res.data)
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
      transformResponse: (data) => JSONbig.parse(data), // opensea passes ints that are too big for js, so we process here first
    })
    .then((res) => res.data)
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

  const {
    isLoading,
    isError,
    error,
    data: listingData,
  } = useQuery(['listing', nftAddress, tokenId], async () => fetchListing(nftAddress, tokenId));
  console.log('listing response is', listingData);

  const orderHash = listingData?.orders[0].order_hash;
  console.log('0th listing hash is', orderHash);

  const { data: fulfillmentData } = useQuery(['fulfillment', orderHash], async () =>
    fillOrder(orderHash, receiver)
  );

  console.log('fullfillment response is', fulfillmentData);

  let params = fulfillmentData?.fulfillment_data.transaction.input_data
    .parameters as BasicOrderParameters;

  if (params) params.salt = params?.salt.toString();

  const valueAmount = fulfillmentData?.fulfillment_data.transaction.value.toString();
  console.log('fullfillment params are', params);
  console.log('fulfillment value amount is ', valueAmount);

  const { config: writeConfig, error: prepareWriteError } = usePrepareContractWrite({
    address: '0x00000000000001ad428e4906aE43D8F9852d0dD6', // Seaport 1.4
    abi: SeaportAbi,
    functionName: 'fulfillBasicOrder',
    args: [params],
    overrides: {
      value: BigNumber.from(valueAmount || 0),
      gasLimit: BigNumber.from(8000000),
    },
  });
  const err: Error & { reason?: string } = prepareWriteError;

  const {
    write: seaportWrite,
    data: contractWriteData,
    isError: isWriteError,
  } = useContractWrite(writeConfig);

  const {
    isLoading: isTxPending,
    isSuccess,
    isError: isTxError,
  } = useWaitForTransaction({ hash: contractWriteData?.hash });

  return (
    <div>
      {isSuccess && <p>Success!</p>}
      {isTxError && <p>Tx error: {isTxError}</p>}
      {isTxPending ? (
        <Button className="flex items-center" disabled>
          <Spinner /> Buying NFT...
        </Button>
      ) : (
        <Button disabled={!seaportWrite} onClick={() => seaportWrite?.()}>
          Buy NFT
        </Button>
      )}
      {err && <WidgetError>Error simulating transaction: {err.message || err.reason}</WidgetError>}
    </div>
  );
};
