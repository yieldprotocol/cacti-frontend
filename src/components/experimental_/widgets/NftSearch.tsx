import { useCollectionSearch } from '@center-inc/react';
import Grid from '@/components/Grid';
import { ETHEREUM_NETWORK } from '@/utils/constants';
import { NftCollectionContainer } from './NftCollectionContainer';

export const NftSearch = ({ query }: { query: string }) => {
  const { results, loading, error } = useCollectionSearch({
    query,
  });
  return (
    <>
      <div className="mt-4 flex w-[100%] justify-center text-black">
        {loading && <span>Results loading</span>}
        <Grid>
          {results?.map(({ id, ...props }) => {
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
