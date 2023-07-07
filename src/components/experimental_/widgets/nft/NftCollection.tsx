import { useQuery } from 'react-query';
import { useCollection } from '@center-inc/react';
import axios from 'axios';
import { ImageResponse } from '@/components/cactiComponents';
import { ImageVariant } from '@/components/cactiComponents/ImageResponse';
import { ResponseWrap } from '@/components/cactiComponents/helpers/layout';
import { ETHEREUM_NETWORK } from '@/utils/constants';

interface NftCollectionContainerProps {
  network: string;
  address: string;
  name?: string;

  numAssets?: string | number;
  previewImageUrl?: string;

  variant?: ImageVariant; // widget variant (default, showcase, compact)
}

export const NftCollection = ({
  network,
  address,
  name,
  numAssets,
  previewImageUrl,
  variant,
}: NftCollectionContainerProps) => {
  const collection = useCollection({
    network: network as any,
    address,
  });

  return (
    <>
      <ImageResponse
        image={collection?.smallPreviewImageUrl || previewImageUrl}
        imageTags={[`${(numAssets || collection?.numAssets || 'Unknown')!.toString()} Assets`]}
        title={collection?.name || name}
        subTitle={collection?.symbol || collection?.name}
        imageLink={`https://center.app/${network}/collections/${address}`}
      />
      {/* <a  
        href={`https://center.app/${network}/collections/${address}`}
        className="flex flex-col items-center justify-center py-4"
        target="_blank"
        rel="noreferrer"
      >
        <img className="h-32 w-32 rounded-md" src={previewImageUrl} alt="" />
        <div className="mt-1 flex flex-col items-center justify-center">
          <p className="ml-3 text-xs font-medium text-blue-300 underline">{name}</p>
          <p className="ml-3 text-xs font-medium text-gray-200">{network}</p>
        </div>
      </a> */}
    </>
  );
};

// Collection with a nested list of assets
// export const NftCollection = ({
//   collection,
//   children,
// }: NftCollectionProps) => {

//   return (
//     <div>
//       <div>This is the NFT collection:</div>
//       <div>{collection}</div>
//       <div>Here are some of the NFTs in the collection:</div>
//       <div>{children}</div>
//     </div>
//   );
// };
