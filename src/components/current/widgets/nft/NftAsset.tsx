import { Network } from '@center-inc/react';
import { Address } from 'wagmi';
import { ImageResponse } from '@/components/cactiComponents';
import { ImageVariant } from '@/components/cactiComponents/ImageResponse';
import { InlineChip } from '@/components/cactiComponents/InlineChip';
import { getBackendApiUrl } from '@/utils/backend';

export interface NftAssetProps {
  network: Network;
  address: Address;
  tokenId: number;
  collectionName?: string;
  name?: string;
  previewImageUrl?: string;
  variant?: ImageVariant; // widget variant
  price?: string;
  attributes?: {trait_type: string, value: string}[];
}

const TraitList = ({ attributes }: { attributes: {trait_type: string, value: string}[] }) => {
  return (
    <div className="">
      {attributes.map((attribute, index) => (
        <div key={index} className="text-xs mr-2 mb-2">
          <span className="font-bold">{attribute.trait_type}</span>: {attribute.value}
        </div>
      ))}
    </div>
  )

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
  attributes
}: NftAssetProps) => {

  const backendUrl = getBackendApiUrl();
  
  return (
    <ImageResponse
      image={`${backendUrl}/center_image/${network}/${address}/${tokenId}/small`}
      imageTags={
        variant === ImageVariant.SHOWCASE
          ? [`Token Id: ${tokenId}`, `${network.replace('-mainnet', '')}`]
          : [`Token Id: ${tokenId}`] // always show the token id 
      }
      title={name}
      subTitle={collectionName}
      imageLink={`https://center.app/${network}/collections/${address}/${tokenId}`}
      variant={variant}
    >
      {/* {variant === ImageVariant.SHOWCASE && (
        <div className="text-xs">{nftData.metadata?.description}</div>
      )} */}
      {attributes && <TraitList attributes={attributes} />}
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
