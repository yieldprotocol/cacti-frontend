interface NftCollectionContainerProps {
  network: string;
  address: string;
  name: string;
  previewImageUrl: string;
  numAssets?: string | number;
}

export const NftCollectionContainer = ({
  network,
  address,
  name,
  previewImageUrl,
}: NftCollectionContainerProps) => {
  return (
    <div>
      <a
        href={`https://center.app/${network}/collections/${address}`}
        className="flex items-center py-4"
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
        <div>
          <p className="ml-3 text-sm font-medium text-blue-400 underline">{name}</p>
          <p className="ml-3 text-sm font-medium text-gray-400">{network}</p>
        </div>
      </a>
    </div>
  );
};
