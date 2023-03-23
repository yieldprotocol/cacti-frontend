interface NftAssetContainerProps {
  network: string;
  address: string;
  tokenId: string | number;
  collectionName: string;
  name: string;
  previewImageUrl: string;
}

interface NftAssetTraitsContainerProps {
  asset: JSX.Element;
  children?: JSX.Element;
}

interface NftAssetTraitValueContainerProps {
  trait: string;
  value: string;
}

export const NftAssetContainer = ({
  network,
  address,
  tokenId,
  collectionName,
  name,
  previewImageUrl,
}: NftAssetContainerProps) => {
  return (
    <div className="flex justify-center">
      <a
        href={`https://center.app/${network}/collections/${address}/${tokenId}`}
        className="flex flex-col items-center py-4"
        target="_blank"
        rel="noreferrer"
      >
        {previewImageUrl ? (
          <img className="h-32 w-32 rounded-md" src={previewImageUrl} alt="" />
        ) : (
          <div className="flex h-32 w-32 items-center justify-center bg-gray-100 text-4xl text-gray-400">
            ?
          </div>
        )}
        <div className="mt-2 flex flex-col items-center justify-center">
          <p className="ml-3 text-sm font-medium text-blue-400 underline">{name}</p>
          <p className="ml-3 text-sm font-medium text-gray-400">{collectionName}</p>
          <p className="ml-3 text-sm font-medium text-gray-400">{network}</p>
        </div>
      </a>
    </div>
  );
};

// Asset with a nested list of trait values
export const NftAssetTraitsContainer = ({ asset, children }: NftAssetTraitsContainerProps) => {
  return (
    <div className="flex justify-center gap-16 p-4">
      {asset}
      <div>{children}</div>
    </div>
  );
};

// Value of a trait
export const NftAssetTraitValueContainer = ({ trait, value }: NftAssetTraitValueContainerProps) => {
  return (
    <div>
      <div className="m-2 text-black">
        <b>{trait}</b>: {value}{' '}
      </div>
    </div>
  );
};
