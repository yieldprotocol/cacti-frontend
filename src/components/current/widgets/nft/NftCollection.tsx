import { Network, useCollection } from '@center-inc/react';
import { Address } from 'wagmi';
import { ImageResponse } from '@/components/cactiComponents';
import { ImageVariant } from '@/components/cactiComponents/ImageResponse';
import { Widget } from '../../MessageTranslator';
import ListContainer from '../../containers/ListContainer';
import { NftAsset } from './NftAsset';
import { abbreviateHash } from '@/utils';

interface NftCollectionContainerProps {
  network: Network;
  address: string;
  name?: string;

  numAssets?: string | number;
  previewImageUrl?: string;

  variant?: ImageVariant; // widget variant (default, showcase, compact)
  assetsToShow?: number | number[] | Widget[]; // number of assets to show in the list. from 0 to num for not array DEFAULT
}

export const NftCollection = ({
  network,
  address,
  name,
  numAssets,
  previewImageUrl,
  variant,
  assetsToShow = [],
}: NftCollectionContainerProps) => {
  
  /**
   * Get the  array of the asset ids to show:
   * */
  const assetsIdsToShow = Array.isArray(assetsToShow)
    ? assetsToShow // if assetsToShow is an array, use it
    : Array.from(new Array(assetsToShow), (_, i) => i + 1); // if assetsToShow is a number, create an array of numbers from 1 to assetsToShow

  /**
   * Create the nfts assets for each tokenId to Show
   * */
  const assets = assetsIdsToShow.map((asset, i) =>
    typeof asset === 'number' ? (
      <NftAsset network={network} address={address as Address} tokenId={asset} key={asset} /> // if just a number, use it as tokenId
    ) : (
      <Widget key={asset.params.tokenId || `${i}`} widget={asset} />
    )
  );

  return (
    <>
      <ListContainer
        items={[
          <ImageResponse
            image={previewImageUrl}
            imageTags={[`${(numAssets || 'Unknown')!.toString()} Assets`, network.split("-")[0] ]}
            title={name}
            subTitle={abbreviateHash(address,8)}
            imageLink={`https://center.app/${network}/collections/${address}`}
            key={address}
            variant={variant}
          />,
          ...assets,
        ]}
      />
    </>
  );
};
