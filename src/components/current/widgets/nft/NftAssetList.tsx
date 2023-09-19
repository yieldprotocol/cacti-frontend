import { useCollection } from '@center-inc/react';
import { ImageResponse } from '@/components/cactiComponents';
import { ImageVariant } from '@/components/cactiComponents/ImageResponse';
import ListContainer from '../../containers/ListContainer';
import { NftAsset, NftAssetProps } from './NftAsset';

interface NftAssetListProps {
  assets: { name: 'display-nft-asset-container'; params: NftAssetProps }[];
}

export const NftAssetList = ({ assets }: NftAssetListProps) => {
  if (assets.length === 0) {
    return <div>No NFTs found</div>;
  }
  return <ListContainer items={assets} />;
};
