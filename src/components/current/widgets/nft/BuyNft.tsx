import { UsePrepareContractWriteConfig, usePrepareContractWrite } from 'wagmi';
import SeaportAbi from '@/abi/SeaportAbi';
import { ActionResponse, HeaderResponse } from '@/components/cactiComponents';
import { ImageVariant } from '@/components/cactiComponents/ImageResponse';
import { ConnectFirst } from '../helpers/ConnectFirst';
import { NftAsset, NftAssetProps } from './NftAsset';

interface BuyNftProps extends NftAssetProps {
  // TODO: consider inherited typings?
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
  const tx: UsePrepareContractWriteConfig = {
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
    value: BigInt(orderValue),
    gas: BigInt(500_000),
  };

  // Simulate tx to re-verify if the NFT is for sale
  const { isError } = usePrepareContractWrite({
    ...tx,
  });

  const notForSale = !isForSale || isError;

  return (
    <ConnectFirst>
      <HeaderResponse text={`Buy NFT`} projectName={'Opensea Seaport'} />
      <NftAsset {...asset} variant={ImageVariant.SHOWCASE} />
      <ActionResponse
        txParams={notForSale ? undefined : tx} // if not for sale abort the tx preparation
        approvalParams={undefined}
        label={notForSale ? 'Item not for sale' : 'Purchase NFT'}
        disabled={notForSale}
      />
    </ConnectFirst>
  );
};
