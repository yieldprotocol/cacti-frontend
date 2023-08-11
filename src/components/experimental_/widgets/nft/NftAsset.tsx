import { Network } from '@center-inc/react';
import { Address } from 'wagmi';
import { ImageResponse } from '@/components/cactiComponents';
import { ImageVariant } from '@/components/cactiComponents/ImageResponse';
import { InlineChip } from '@/components/cactiComponents/InlineChip';
import useNft from '@/hooks/useNft';

export interface NftAssetProps {
  network: Network;
  address: Address;
  tokenId: number;
  collectionName?: string;
  name?: string;
  previewImageUrl?: string;
  variant?: ImageVariant; // widget variant
  price?: string;
}

export const NftAsset = ({
  network,
  address,
  tokenId,
  collectionName,
  name,
  previewImageUrl,
  variant,
  price,
}: NftAssetProps) => {
  const { data: nftData } = useNft({ network, address, tokenId });

  return (
    <ImageResponse
      image={nftData.smallPreviewImageUrl || previewImageUrl}
      imageTags={
        variant === ImageVariant.SHOWCASE
          ? [`Token Id: ${tokenId}`, `${network.replace('-mainnet', '')}`]
          : []
      }
      title={nftData.name || name}
      subTitle={nftData.collectionName || collectionName}
      imageLink={`https://center.app/${network}/collections/${address}/${tokenId}`}
      variant={variant}
    >
      {variant === ImageVariant.SHOWCASE && (
        <div className="text-xs">{nftData.metadata?.description}</div>
      )}
      {price && (
        <InlineChip
          className="text-xs"
          label={price !== 'unlisted' ? `${price}` : 'Not for Sale'}
          image="https://assets.coingecko.com/coins/images/279/thumb/ethereum.png?1608803028"
        />
      )}
    </ImageResponse>
  );
};
