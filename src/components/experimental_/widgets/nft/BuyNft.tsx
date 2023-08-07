import { useEffect, useMemo } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { BigNumber, BigNumberish, ethers } from 'ethers';
// @ts-ignore TODO: fix this
import * as JSONbigint from 'json-bigint';
import { useAccount } from 'wagmi';
import SeaportAbi from '@/abi/SeaportAbi.json';
import { NftOwner } from '@/components/CheckNftOwner';
import { ActionResponse, HeaderResponse } from '@/components/cactiComponents';
import { ImageVariant } from '@/components/cactiComponents/ImageResponse';
import { TxBasicParams } from '@/components/cactiComponents/hooks/useSubmitTx';
import { Order } from '@/types';
import { ConnectFirst } from '../helpers/ConnectFirst';
import { NftAsset } from './NftAsset';

// @ts-ignore
const JSONbig = JSONbigint({ storeAsString: true });

const fetchListing = async (nftAddress: string, tokenId: string) => {
  // console.log( nftAddress, tokenId);
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

export const BuyNft = ({ nftAddress, tokenId }: { nftAddress: string; tokenId: string }) => {
  // // The new owner will be the receiver
  const { address: account } = useAccount();
  //const addRecentTransaction = useAddRecentTransaction();
  // const { refetch: refetchBal } = useBalance();

  // fetchListing possible states:
  // If order array is empty, show the NFT is not currently for sale
  // If order is no longer valid based on the timestamp, show the fork is out of date
  // If !isQueryError, proceed
  const {
    isLoading: isQueryLoading,
    isError: isQueryError,
    data: listingData,
  } = useQuery({
    queryKey: ['listing', nftAddress, tokenId],
    queryFn: async () => fetchListing(nftAddress, tokenId),
    retry: false,
  });

  const orderHash = listingData?.orders[0]?.order_hash;
  const orderExpirationDate = listingData?.orders[0]?.expiration_time;
  const protocol_address = listingData?.orders[0]?.protocol_address;

  const notForSale = listingData?.orders.length === 0;
  const isExpired = orderExpirationDate < Date.now() / 1000;

  // fetchFulfillParams possible states:
  // If listing Query failed, error is already shown, no concern to fetchFulfillParams
  // If listing Query succeeds but there's no order hash, no concern to fetchFulfillParams
  // If listing Query succeeds and there's an order hash, but fetchFulfillParams fails, show error
  // If listing Query succeeds and there's an order hash, and fetchFulfillParams succeeds, proceed
  const { isError: isFulfillError, data: fulfillmentData } = useQuery({
    queryKey: ['fulfillment', orderHash],
    queryFn: async () => orderHash && fetchFulfillParams(orderHash, account!, protocol_address),
    retry: false,
    enabled: !!listingData && !notForSale && !isExpired,
  });

  const params = fulfillmentData?.fulfillment_data.orders[0].parameters as Order;
  const signature = fulfillmentData?.fulfillment_data.orders[0].signature as string;
  const valueAmount = fulfillmentData?.fulfillment_data.transaction.value as BigNumberish;

  const tx = useMemo(
    (): TxBasicParams => ({
      address: protocol_address,
      abi: SeaportAbi,
      functionName: 'fulfillOrder',
      args: [
        {
          parameters: params,
          signature: signature,
        },
        '0x0000000000000000000000000000000000000000000000000000000000000000', // fulfillerConduitKey
      ],
      overrides: {
        value: BigNumber.from(valueAmount || 0),
      },
      enabled: !!fulfillmentData,
    }),
    [fulfillmentData]
  );

  return (
    <ConnectFirst>
      <HeaderResponse text={`Buy NFT`} projectName={'Opensea Seaport'} />
      <NftAsset
        address={nftAddress}
        tokenId={tokenId}
        network="ethereum-mainnet"
        variant={ImageVariant.SHOWCASE}
        price={
          valueAmount ? `${ethers.utils.formatEther(BigNumber.from(valueAmount))} ETH` : 'unlisted'
        }
      />
      <ActionResponse
        txParams={tx}
        approvalParams={undefined}
        label={notForSale ? 'Item not for sale' : 'Purchase NFT'}
        disabled={isExpired || notForSale}
      />
    </ConnectFirst>

  );
};
