import { useQuery } from 'react-query';
import { Network, useCollection } from '@center-inc/react';
import axios from 'axios';
import { ImageResponse, ListResponse } from '@/components/cactiComponents';
import { ImageVariant } from '@/components/cactiComponents/ImageResponse';
import { ResponseWrap } from '@/components/cactiComponents/helpers/layout';
import { ETHEREUM_NETWORK } from '@/utils/constants';
import ListContainer from '../../containers/ListContainer';
import { NftAsset } from './NftAsset';

interface NftCollectionContainerProps {
  network: Network;
  address: string;
  name?: string;

  numAssets?: string | number;
  previewImageUrl?: string;

  variant?: ImageVariant; // widget variant (default, showcase, compact)
  assetsToShow?: number | number[]; // number of assets to show in the list. from 0 to num for not array DEFAULT
}

export const NftCollection = ({
  network,
  address,
  name,
  numAssets,
  previewImageUrl,
  variant,
  assetsToShow = 0,
}: NftCollectionContainerProps) => {
  const collection = useCollection({
    network,
    address,
  });

  /**
   * Get the  array of the asset ids to show:
   * */
  const assetsIdsToShow = Array.isArray(assetsToShow)
    ? assetsToShow // if assetsToShow is an array, use it
    : Array.from(new Array(assetsToShow), (_, i) => i + 1); // if assetsToShow is a number, create an array of numbers from 1 to assetsToShow

  /**
   * Create the nfts assets for each tokenId to Show
   * */
  const assets = assetsIdsToShow.map((id: number) => (
    <NftAsset network={network} address={address} tokenId={id} key={id} />
  ));

  return (
    <>
      <ListContainer
        items={[
          <ImageResponse
            image={collection?.smallPreviewImageUrl}
            imageTags={[`${(numAssets || collection?.numAssets || 'Unknown')!.toString()} Assets`]}
            title={collection?.name || name}
            subTitle={collection?.symbol || collection?.name}
            imageLink={`https://center.app/${network}/collections/${address}`}
            key={address}
          />,
          ...assets,
        ]}
      />
    </>
  );
};
