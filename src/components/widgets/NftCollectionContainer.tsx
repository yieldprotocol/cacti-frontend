interface NftCollectionContainerProps {
  network?: string;
  address?: string;
  name?: string;
  previewImageUrl?: string;
  numAssets?: string | number;
}

interface NftCollectionAssetsContainerProps {
  collection: JSX.Element;
  children?: JSX.Element;
}

interface NftCollectionTraitsContainerProps {
  network: string;
  address: string;
  name: string;
  traits: string[];
}

interface NftCollectionTraitValuesContainerProps {
  network: string;
  address: string;
  name: string;
  trait: string;
  values: string[];
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
          <p className="ml-3 text-xs font-medium text-blue-300 underline">{name}</p>
          <p className="ml-3 text-xs font-medium text-gray-200">{network}</p>
        </div>
      </a>
    </>
  );
};

// Collection with a nested list of assets
export const NftCollectionAssetsContainer = ({
  collection,
  children,
}: NftCollectionAssetsContainerProps) => {
  return (
    <div>
      <div>This is the NFT collection:</div>
      <div>{collection}</div>
      <div>Here are some of the NFTs in the collection:</div>
      <div>{children}</div>
    </div>
  );
};

// Plain list of traits
export const NftCollectionTraitsContainer = ({
  network,
  address,
  name,
  traits,
}: NftCollectionTraitsContainerProps) => {
  return (
    <div>
      <span>
        The NFT collection, <b>{name || address}</b>, has the following traits:{' '}
      </span>
      {traits.map((trait, index, items) => {
        if (index === items.length - 1)
          return (
            <span key={trait}>
              {index === 0 ? '' : 'and '}
              <b>{trait}</b>.
            </span>
          );
        return (
          <span key={trait}>
            <b>{trait}</b>,{' '}
          </span>
        );
      })}
    </div>
  );
};

// Plain list of trait values
export const NftCollectionTraitValuesContainer = ({
  network,
  address,
  name,
  trait,
  values,
}: NftCollectionTraitValuesContainerProps) => {
  return (
    <div>
      <span>
        The trait <b>{trait}</b> of the NFT collection, <b>{name || address}</b>, has the following
        values:{' '}
      </span>
      {values.map((value, index, items) => {
        if (index === items.length - 1)
          return (
            <span key={value}>
              {index === 0 ? '' : 'and '}
              <b>{value}</b>.
            </span>
          );
        return (
          <span key={value}>
            <b>{value}</b>,{' '}
          </span>
        );
      })}
    </div>
  );
};

// Trait with a nested list of values
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

// Value of a trait with its associated frequency
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
