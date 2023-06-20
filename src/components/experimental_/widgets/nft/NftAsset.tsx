import { ImageResponse } from '@/components/cactiComponents';

interface NftAssetContainerProps {
  network: string;
  address: string;
  tokenId: string | number;
  collectionName: string;
  name: string;
  previewImageUrl: string;
  price?: string;

  compact?: boolean
}

interface NftAssetTraitsContainerProps {
  asset: JSX.Element;
  children?: JSX.Element;
}

interface NftAssetTraitValueContainerProps {
  trait: string;
  value: string;
}

export const NftAsset = ({
  network,
  address,
  tokenId,
  collectionName,
  name,
  previewImageUrl,
  price,
}: NftAssetContainerProps) => {
  const listPrice = price === 'unlisted' ? 'Not for sale' : price ? price : '';

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
    />
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
