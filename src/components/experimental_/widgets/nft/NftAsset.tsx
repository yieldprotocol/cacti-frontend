import { useQuery } from 'react-query';
import { useAsset } from '@center-inc/react';
import axios from 'axios';
import { ImageResponse } from '@/components/cactiComponents';
import { ImageVariant } from '@/components/cactiComponents/ImageResponse';
import { ETHEREUM_NETWORK } from '@/utils/constants';

interface NftAssetProps {
  network: string;
  address: string;
  tokenId: string | number;
  collectionName?: string;
  name?: string;
  previewImageUrl?: string;

  variant?: ImageVariant; // widget variant
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
}: NftAssetProps) => {
  // const listPrice = price === 'unlisted' ? 'Not for sale' : price ? price : '';
  const {
    data: nftData,
    error,
    isLoading,
  } = useQuery(
    ['NftAsset', address, tokenId],
    async () => fetchNftAsset(address, tokenId.toString(), network),
    {
      enabled:
        name && previewImageUrl && !(variant === ImageVariant.SHOWCASE)
          ? false
          : true,
    } // only fetch if we don't have the basic data from props 
  );

  return (
    <ImageResponse
      description={nftData?.description}
      image={nftData?.smallPreviewImageUrl || previewImageUrl}
      imageTags={variant === ImageVariant.SHOWCASE ? [`Token Id: ${tokenId}`, `${network.replace('-mainnet','')}`] : []}
      title={nftData?.name || name}
      subTitle={nftData?.collection?.name || collectionName}
      imageLink={`https://center.app/${network}/collections/${address}/${tokenId}`}
      variant={variant}
    >
      {variant === ImageVariant.SHOWCASE && <div className='text-xs'>
        {nftData?.metadata?.description}
      </div>}
    </ImageResponse>
  );
};

//   // Asset with a nested list of trait values
//   export const NftAssetTraitsContainer = ({ asset, children }: NftAssetTraitsContainerProps) => {
//     return (
//       <div className="flex justify-center gap-16 rounded-lg bg-gray-500 p-4 shadow">
//         {asset}
//         <div>{children}</div>
//       </div>
//     );
//   };

//   // Value of a trait
//   export const NftAssetTraitValueContainer = ({ trait, value }: NftAssetTraitValueContainerProps) => {
//     return (
//       <div>
//         <div className="m-2 text-gray-200">
//           <b>{trait}</b>: {value}{' '}
//         </div>
//       </div>
//     );
//   };
