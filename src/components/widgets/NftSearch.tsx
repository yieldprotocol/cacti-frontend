import { useCollectionSearch } from '@center-inc/react';
import Grid from '@/components/Grid';
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
        <Grid>
          {results?.map(({ id, ...props }: Result) => {
            if (props.previewImageUrl) {
              return <NftCollectionContainer key={id} network={ETHEREUM_NETWORK} {...props} />;
            }
          }) || ''}
        </Grid>
        {error && 'There was an unexpected center.app API error'}
      </div>
    </>
  );
};
