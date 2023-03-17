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
    <>
      <a
        href={`https://center.app/${network}/collections/${address}`}
        className="flex flex-col items-center justify-center py-4"
        target="_blank"
        rel="noreferrer"
      >
        <img className="h-32 w-32 rounded-md" src={previewImageUrl} alt="" />
        <div className="mt-1 flex flex-col items-center justify-center">
          <p className="ml-3 text-xs font-medium text-blue-400 underline">{name}</p>
          <p className="ml-3 text-xs font-medium text-gray-400">{network}</p>
        </div>
      </a>
    </>
  );
};
