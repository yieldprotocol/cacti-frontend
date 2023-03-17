import { useCollectionSearch } from '@center-inc/react';
import { ETHEREUM_NETWORK } from '@/utils/constants';
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
      <div className="mt-4 flex w-[100%] justify-center text-black">
        {loading && <span>Results loading</span>}
        <ul
          role="list"
          className="flex grid w-[100%] grid-cols-3 flex-wrap gap-x-6 gap-y-1 after:flex-auto xl:grid-cols-4"
        >
          {results?.map(({ id, ...props }: Result) => {
            if (props.previewImageUrl) {
              return <NftCollectionContainer key={id} network={ETHEREUM_NETWORK} {...props} />;
            }
          }) || ''}
        </ul>
        {error && 'There was an unexpected center.app API error'}
      </div>
    </>
  );
};
