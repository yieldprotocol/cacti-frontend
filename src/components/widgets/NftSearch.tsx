import { useCollectionSearch } from '@center-inc/react';

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
          {results?.map(({ id, address, relevance, name, previewImageUrl }: Result) => (
            <div key={id}>
              <a
                href={`https://center.app/collections/${address}`}
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
                <p className="ml-3 text-sm font-medium text-blue-400 underline">{name}</p>
              </a>
            </div>
          )) || ''}
        </ul>
        {error && 'There was an unexpected center.app API error'}
      </div>
    </>
  );
};
