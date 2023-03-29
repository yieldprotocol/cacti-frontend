import { useQuery } from 'react-query';
import axios from 'axios';
import { BigNumber, BigNumberish } from 'ethers';
import { formatEther } from 'ethers/lib/utils.js';
// @ts-ignore TODO: fix this
import * as JSONbigint from 'json-bigint';
import {
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import SeaportAbi from '@/abi/SeaportAbi.json';
import { Button } from '@/components/Button';
import { NftAttributes } from '@/components/widgets/NftAttributes';
import { WidgetError } from '@/components/widgets/helpers';
import { Order } from '@/types/seaport';
import { Spinner } from '@/utils';
import { NftOwner } from '../CheckNftOwner';

// @ts-ignore
const JSONbig = JSONbigint({ storeAsString: true });

const fetchListing = async (nftAddress: string, tokenId: string) => {
  return axios
    .get(
      `https://api.opensea.io/v2/orders/ethereum/seaport/listings?asset_contract_address=${nftAddress}&token_ids=${tokenId}&order_by=created_date&order_direction=desc`,
      {
        headers: {
          Accept: 'application/json',
          'X-API-Key': process.env.NEXT_PUBLIC_OPENSEA_API_KEY,
        },
      }
    )
    .then((res) => res.data);
};

const fetchFulfillParams = async (
  orderHash: string,
  fulfillerAddr: string,
  protocolAddress: string
) => {
  const data = {
    listing: {
      hash: orderHash,
      chain: 'ethereum',
      protocol_address: protocolAddress,
    },
    fulfiller: {
      address: fulfillerAddr,
    },
  };

  return axios
    .post('https://api.opensea.io/v2/listings/fulfillment_data', data, {
      headers: {
        Accept: 'application/json',
        'X-API-Key': process.env.NEXT_PUBLIC_OPENSEA_API_KEY,
      },
      transformResponse: (data) => JSONbig.parse(data), // opensea passes ints that are too big for js, so we process here first
    })
    .then((res) => res.data);
};

export const BuyNFT = ({ nftAddress, tokenId }: { nftAddress: string; tokenId: string }) => {
  // The new owner will be the receiver
  const { address: receiver } = useAccount();

  // fetchListing possible states:
  // If order array is empty, show the NFT is not currently for sale
  // If order is no longer valid based on the timestamp, show the fork is out of date
  // If isQueryError, return widget error
  // If !isQueryError, proceed
  const {
    isLoading: isQueryLoading,
    isSuccess: isQuerySuccess,
    isError: isQueryError,
    error: queryError,
    data: listingData,
  } = useQuery(['listing', nftAddress, tokenId], async () => fetchListing(nftAddress, tokenId));

  const orderHash = listingData?.orders[0]?.order_hash;
  const orderListingDate = listingData?.orders[0]?.listing_time;
  const orderExpirationDate = listingData?.orders[0]?.expiration_time;
  const protocol_address = listingData?.orders[0]?.protocol_address;

  const isNewerListing =
    orderListingDate > process.env.NEXT_PUBLIC_FORK_ORIGINATING_BLOCK_TIMESTAMP!;
  const isExpired = orderExpirationDate < Date.now() / 1000;
  const isValidListing = !isNewerListing && !isExpired;

  // fetchFulfillParams possible states:
  // If listing Query failed, error is already shown, no concern to fetchFulfillParams
  // If listing Query succeeds but there's no order hash, no concern to fetchFulfillParams
  // If listing Query succeeds and there's an order hash, but fetchFulfillParams fails, show error
  // If listing Query succeeds and there's an order hash, and fetchFulfillParams succeeds, proceed
  const {
    isError: isFulfillError,
    error: fulfillError,
    data: fulfillmentData,
  } = useQuery(
    ['fulfillment', orderHash],
    async () => orderHash && fetchFulfillParams(orderHash, receiver!, protocol_address)
  );

  const params = fulfillmentData?.fulfillment_data.orders[0].parameters as Order;
  const signature = fulfillmentData?.fulfillment_data.orders[0].signature as string;

  const valueAmount = fulfillmentData?.fulfillment_data.transaction.value as BigNumberish;

  // usePrepareContractWrite states:
  // If prepareWriteError, show error
  // If prepareWriteError is not set, proceed
  const { config: writeConfig, error: prepareWriteError } = usePrepareContractWrite({
    address: protocol_address,
    abi: SeaportAbi,
    functionName: 'fulfillOrder',
    args: [
      { parameters: params, signature: signature },
      '0x0000000000000000000000000000000000000000000000000000000000000000', // fulfillerConduitKey
    ],
    overrides: {
      value: BigNumber.from(valueAmount || 0),
    },
  });

  // useContractWrite states:
  // If writeError, show error
  // If writeError is not set, proceed
  const {
    write: seaportWrite,
    data: contractWriteData,
    isError: isWriteError,
    error: writeError,
  } = useContractWrite(writeConfig);

  const err: Error & { reason?: string } = (queryError as Error) || prepareWriteError || writeError;

  // useWaitForTransaction states:
  // If txErrorData, show error
  // If txErrorData is not set, proceed
  const {
    isLoading: isTxPending,
    isSuccess,
    isError: isTxError,
    error: txErrorData,
  } = useWaitForTransaction({ hash: contractWriteData?.hash });

  return (
    <div>
      <div>
        <NftAttributes nftAddress={nftAddress} tokenID={tokenId} />
        <NftOwner nftAddress={nftAddress} tokenId={tokenId} />
      </div>

      {isTxError && <WidgetError>Tx error: {txErrorData?.message}</WidgetError>}
      {isTxPending && (
        <Button className="flex items-center" disabled>
          <Spinner /> Buying NFT...
        </Button>
      )}
      {!isSuccess && (
        <Button disabled={!seaportWrite || isWriteError} onClick={() => seaportWrite?.()}>
          Buy NFT {valueAmount ? `for ${formatEther(valueAmount)} ETH` : ''}
        </Button>
      )}
      {isSuccess && <b className="m-2">Success! You now own the NFT.</b>}

      {isQueryLoading && <p>Fetching listing hash...</p>}
      {!isQueryLoading && !isQueryError && !orderHash && (
        <WidgetError>NFT is not currently for sale</WidgetError>
      )}
      {!isValidListing && <WidgetError>Listing expired or too new for forked Mainnet</WidgetError>}
      {!isSuccess && isFulfillError && (
        <WidgetError>
          Could not fetch fulfillment data from Opensea. Error: {(fulfillError as Error).message}
        </WidgetError>
      )}
      {!isSuccess && err && <WidgetError>Error: {err.message || err.reason}</WidgetError>}
    </div>
  );
};
