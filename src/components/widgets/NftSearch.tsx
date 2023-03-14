import { useCollectionSearch } from '@center-inc/react';
import { NftCollectionContainer } from './NftCollectionContainer';

interface Result {
  id: any;
  address: any;
  relevance: any;
  name: any;
  previewImageUrl: any;
}

export const NftSearch = ({ query }) => {
  const { results, loading, error } = useCollectionSearch({
    query,
  });
  return (
    <>
      <div className="columns-1 text-black sm:columns-2">
        {loading && <span>Results loading</span>}
        <ul role="list" className="divide-y divide-gray-200">
          {results?.map(({ id, ...props }: Result) => (
            <NftCollectionContainer key={id} network="ethereum-mainnet" {...props} />
          )) || ''}
        </ul>
        {error && 'There was an unexpected center.app API error'}
      </div>
    </>
  );
};
