import { useCollectionSearch } from '@center-inc/react';

const ResultItem: React.FC = ({
  id,
  url,
  relevance,
  name,
}: {
  id: any;
  url: string;
  relevance: any;
  name: any;
}) => {
  return <div>{name}</div>;
};

export const NftSearch = ({ query }) => {
  const { results, loading, error } = useCollectionSearch({
    query,
  });
  return (
    <>
      <div>
        {loading && <span>Results loading</span>}
        {results?.map((result) => <ResultItem key={result.id} {...result} />) || ''}
        {error && 'There was an unexpected center.app API error'}
      </div>
    </>
  );
};
