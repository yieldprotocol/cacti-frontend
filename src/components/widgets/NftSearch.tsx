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
      {loading && <span>Results loading</span>}
      <ul
        role="list"
        className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
      >
        {' '}
        {results?.map(({ id, address, relevance, name, previewImageUrl }: Result) => (
          <li key={id} className="relative">
            <div className="group block w-32 overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
              {previewImageUrl ? (
                <div className="items-center justify-center">
                  <a
                    href={`https://center.app/collections/${address}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      className="pointer-events-none h-32 w-32 rounded-md object-cover group-hover:opacity-75"
                      src={previewImageUrl}
                      alt=""
                    />
                  </a>
                </div>
              ) : (
                <div className="flex h-32 w-32 items-center justify-center bg-gray-100 text-4xl text-gray-400">
                  ?
                </div>
              )}
              <p className="pointer-events-none mt-2 block truncate text-center text-sm font-medium text-gray-900">
                {name}
              </p>
            </div>
          </li>
        )) || ''}
      </ul>
      {error && 'There was an unexpected center.app API error'}
    </>
  );
};
