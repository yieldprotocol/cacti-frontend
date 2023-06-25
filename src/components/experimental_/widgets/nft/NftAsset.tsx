import axios from 'axios';
import { useQuery } from 'wagmi';
import { ImageResponse } from '@/components/cactiComponents';
import { ImageVariant } from '@/components/cactiComponents/ImageResponse';
import { ETHEREUM_NETWORK } from '@/utils/constants';
import { useAsset } from '@center-inc/react';

interface NftAssetProps {
  network: string;
  address: string;
  tokenId: string | number;
  collectionName: string;
  name: string;
  previewImageUrl: string;
  price: string | undefined;

  variant?: ImageVariant; // widget variant
}

interface NftAssetTraitsContainerProps {
  asset: JSX.Element;
  children?: JSX.Element;
}

interface NftAssetTraitValueContainerProps {
  trait: string;
  value: string;
}

const fetchNftAsset = async (nftAddress: string, tokenId: string, network:string=ETHEREUM_NETWORK ) => {
  return axios
    .get(`https://api.center.dev/v1/${network}/${nftAddress}/${tokenId}`, {
      headers: {
        Accept: 'application/json',
        'X-API-Key': process.env.NEXT_PUBLIC_CENTER_APP_KEY || 'keyf3d186ab56cd4148783854f3',
      },
    })
    .then((res) => {
      console.log( res.data )
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
  price,
  variant,
}: NftAssetProps) => {
  const listPrice = price === 'unlisted' ? 'Not for sale' : price ? price : '';

  const asset = useAsset( {
    network: network as any,
    address,
    tokenId
  });

  console.log('ASSET:', asset);

  const {
    data: nftData,
    error,
    isLoading,
  } = useQuery(['NftAsset', address, tokenId], async () =>
    fetchNftAsset(address, tokenId.toString(), network),
    // {enabled: variant === ImageVariant.SHOWCASE }
  );

  variant === ImageVariant.SHOWCASE && console.log('NFT DATA:', nftData);
  // const {} = nftData;

  return (
    <ImageResponse
      actionLabel={network}
      actionValue={listPrice}
      // description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      image={previewImageUrl}
      // imageTags={['some tag', 'Another tag']}
      title={name}
      subTitle={collectionName}
      imageLink={`https://center.app/${network}/collections/${address}/${tokenId}`}
      variant={variant}
    >
      {variant === ImageVariant.SHOWCASE && <div>{
        nftData?.traits?.map((trait: any) => {
          {trait }
        })
      }</div>}
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
