interface NftCollectionContainerProps {
  network: string;
  address: string;
  name: string;
  previewImageUrl: string;
  numAssets?: string | number;
}

interface NftCollectionTraitContainerProps {
  trait: string;
  children?: JSX.Element;
}

interface NftCollectionTraitValueContainerProps {
  trait: string;
  value: string;
  count: string | number;
  total: string | number;
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

export const NftCollectionTraitContainer = ({
  trait,
  children,
}: NftCollectionTraitContainerProps) => {
  return (
    <div>
      <b>{trait}: </b>
      {children}
    </div>
  );
};

export const NftCollectionTraitValueContainer = ({
  trait,
  value,
  count,
  total,
}: NftCollectionTraitValueContainerProps) => {
  const numer = typeof count === 'string' ? parseInt(count) : count;
  const denom = typeof total === 'string' ? parseInt(total) : total;
  const pct = Math.round((100.0 * numer) / denom);
  return (
    <div>
      {value} ({pct}%)
    </div>
  );
};
