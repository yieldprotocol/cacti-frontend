import { useQuery } from 'react-query';
import { useAsset } from '@center-inc/react';
import axios from 'axios';
import { ImageResponse } from '@/components/cactiComponents';
import { ImageVariant } from '@/components/cactiComponents/ImageResponse';
import { InlineChip } from '@/components/cactiComponents/InlineChip';
import { ETHEREUM_NETWORK } from '@/utils/constants';

export interface NftAssetProps {
  network: string;
  address: string;
  tokenId: string | number;
  collectionName?: string;
  name?: string;
  previewImageUrl?: string;

  variant?: ImageVariant; // widget variant

  price?: string;
}

const fetchNftAsset = async (
  nftAddress: string,
  tokenId: string,
  network: string = ETHEREUM_NETWORK
) => {
  return axios
    .get(`https://api.center.dev/v1/${network}/${nftAddress}/${tokenId}`, {
      // .get(`https://api.center.app/v2/${network}/${nftAddress}/nft/${tokenId}/metadata`,{
      headers: {
        Accept: 'application/json',
        'X-API-Key': process.env.NEXT_PUBLIC_CENTER_APP_KEY || 'test',
      },
    })
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

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
  const {
    data: nftData,
    error,
    isLoading,
  } = useQuery(
    ['NftAsset', address, tokenId],
    async () => fetchNftAsset(address, tokenId.toString(), network)
  );

  return (
    <ImageResponse
      description={nftData?.description}
      image={nftData?.smallPreviewImageUrl || previewImageUrl}
      imageTags={
        variant === ImageVariant.SHOWCASE
          ? [`Token Id: ${tokenId}`, `${network.replace('-mainnet', '')}`]
          : []
      }
      title={nftData?.name || name}
      subTitle={nftData?.collection?.name || nftData?.collectionName || collectionName}
      imageLink={`https://center.app/${network}/collections/${address}/${tokenId}`}
      variant={variant}
    >
      {variant === ImageVariant.SHOWCASE && (
        <div className="text-xs">{nftData?.metadata?.description}</div>
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
