import { useEffect, useMemo } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { BigNumber, BigNumberish, ethers } from 'ethers';
// @ts-ignore TODO: fix this
import * as JSONbigint from 'json-bigint';
import { Address, useAccount, usePrepareContractWrite } from 'wagmi';
import SeaportAbi from '@/abi/SeaportAbi.json';
import { ActionResponse, HeaderResponse } from '@/components/cactiComponents';
import { ImageVariant } from '@/components/cactiComponents/ImageResponse';
import { TxBasicParams } from '@/components/cactiComponents/hooks/useSubmitTx';
import useNft from '@/hooks/useNft';
import { Order } from '@/types';
import { ConnectFirst } from '../helpers/ConnectFirst';
import { NftAsset, NftAssetProps } from './NftAsset';

interface BuyNftProps {
  isForSale: boolean;
  orderParameters: any;
  orderSignature: string;
  orderValue: string;
  protocolAddress: string;
  asset: NftAssetProps;
}

export const BuyNft = ({
  isForSale,
  orderParameters,
  orderSignature,
  orderValue,
  protocolAddress,
  asset,
}: BuyNftProps) => {
  const tx = {
    address: protocolAddress as `0x${string}`,
    abi: SeaportAbi,
    functionName: 'fulfillOrder',
    args: [
      {
        parameters: orderParameters,
        signature: orderSignature,
      },
      '0x0000000000000000000000000000000000000000000000000000000000000000', // fulfillerConduitKey
    ],
    overrides: {
      value: BigNumber.from(orderValue || 0),
      gasLimit: 500000,
    },
  };

  // Simulate tx to re-verify if the NFT is for sale
  const { isError } = usePrepareContractWrite({
    ...tx,
    overrides: {
      ...tx.overrides,
      gasLimit: undefined,
    },
  });

  const notForSale = !isForSale || isError;

  return (
    <ConnectFirst>
      <HeaderResponse text={`Buy NFT`} projectName={'Opensea Seaport'} />
      <NftAsset
        address={asset.address as Address}
        tokenId={asset.tokenId}
        network="ethereum-mainnet"
        variant={ImageVariant.SHOWCASE}
        price={asset.price === 'unlisted' ? 'Not for Sale' : asset.price}
      />
      <ActionResponse
        txParams={tx}
        approvalParams={undefined}
        label={notForSale ? 'Item not for sale' : 'Purchase NFT'}
        disabled={notForSale}
      />
    </ConnectFirst>
  );
};
