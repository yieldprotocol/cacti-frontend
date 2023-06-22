import { useEffect, useMemo } from 'react';
import { useQuery } from 'react-query';
import { useAddRecentTransaction } from '@rainbow-me/rainbowkit';
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
import { NftOwner } from '@/components/CheckNftOwner';
import { ActionResponse, HeaderResponse } from '@/components/cactiComponents';
import { TxBasicParams } from '@/components/cactiComponents/hooks/useSubmitTx';
import SubmitButton from '@/components/widgets/common/SubmitButton';
import useBalance from '@/hooks/useBalance';
import { Order } from '@/types';
import { ETHEREUM_NETWORK } from '@/utils/constants';
import { ConnectFirst } from '../helpers/ConnectFirst';

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

// const fetchNftAsset = async (nftAddress: string, tokenID: string) => {
//   axios.defaults.baseURL = `https://api.center.dev/v1/${ETHEREUM_NETWORK}`;
//   return axios
//     .get(`${nftAddress}/${tokenID}`, {
//       headers: {
//         Accept: 'application/json',
//         'X-API-Key': process.env.NEXT_PUBLIC_CENTER_APP_KEY || 'keyf3d186ab56cd4148783854f3',
//       },
//     })
//     .then((res) => {
//       return res.data;
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

// const NFTMetadata = ({ tokenId, nftAddress }: { tokenId: string; nftAddress: string }) => {
//   const { data, error, isLoading } = useQuery(['NftAsset', nftAddress, tokenId], async () =>
//     fetchNftAsset(nftAddress, tokenId)
//   );
//   return (
//     <>
//       {data ? (
//         <>
//           <div className="flex justify-center">
//             <img className="h-32 w-32 rounded-md" src={data.smallPreviewImageUrl} alt="nft image" />
//           </div>
//           <div>
//             <b>{data.collectionName}</b>: #{tokenId}
//           </div>
//         </>
//       ) : (
//         <></>
//       )}
//     </>
//   );
// };

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
  // console.log(fulfillmentData);

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
        value: BigNumber.from(
          valueAmount || 0
        ),
      },
      enabled: !!fulfillmentData,
    }),
    [fulfillmentData]
  );

  // // opensea buy nft function
  // const {
  //   write: seaportWrite,
  //   data: contractWriteData,
  //   isError: isWriteError,
  // } = useContractWrite(writeConfig);

  // // tx states
  // const {
  //   data: txData,
  //   isLoading: isTxPending,
  //   isSuccess,
  // } = useWaitForTransaction({ hash: contractWriteData?.hash });

  // useEffect(() => {
  //   if (txData) {
  //     addRecentTransaction({
  //       hash: txData.transactionHash,
  //       description: `Buy NFT with token address ${nftAddress} and id ${tokenId}`,
  //     });
  //   }

  //   if (isSuccess) refetchBal();
  // }, [addRecentTransaction, isSuccess, nftAddress, refetchBal, tokenId, txData]);

  return (
    <ConnectFirst>
      <HeaderResponse text={'Buy NFT'} projectName={'Opensea Seaport'} />

      {/* <ImageResponse
      /> */}

      <ActionResponse
        txParams={tx}
        approvalParams={undefined}
        label={ notForSale ? 'Item not for sale': 'Purchase NFT'}
        disabled={isExpired || notForSale}
        // stepper?: boolean | undefined;
        // onSuccess = {() => refetchBal() }
      />
    </ConnectFirst>

    /* <div className="mb-2 flex flex-col items-center justify-center gap-1">
          <NFTMetadata nftAddress={nftAddress} tokenId={tokenId} />
          <NftOwner nftAddress={nftAddress} tokenId={tokenId} />
        </div> */

    /* <SubmitButton
        styleProps="flex rounded-sm border border-gray-200/25 bg-gray-700/80 p-3.5 hover:bg-gray-700"
        label={
          isSuccess
            ? 'Success! You now own the NFT.'
            : isTxPending
            ? 'Buying NFT...'
            : isWriteError
            ? 'Error buying NFT'
            : isPrepareError
            ? 'NFT not available for purchase'
            : isQueryError
            ? 'Error fetching NFT listing'
            : isFulfillError
            ? 'Error fetching fulfillment data'
            : isQueryLoading
            ? 'Fetching NFT listing...'
            : isExpired
            ? 'Listing expired'
            : `Buy NFT ${valueAmount ? `for ${formatEther(valueAmount)} ETH` : ''}`
        }
        onClick={() => seaportWrite?.()}
        isLoading={isQueryLoading || isTxPending}
        isError={isQueryError || isFulfillError || isWriteError || isPrepareError}
        disabled={
          isQueryLoading ||
          isExpired ||
          isQueryError ||
          isFulfillError ||
          isWriteError ||
          isPrepareError ||
          isTxPending ||
          isSuccess
        }
      /> */
  );
};
