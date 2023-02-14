import { useCollectionSearch } from '@center-inc/react';

export const NftSearch = ({ query }) => {
  const { results, loading, error } = useCollectionSearch({
    query,
  });
  return (
    <>
      <div className="text-black">
        {loading && <span>Results loading</span>}
        <ul role="list" className="divide-y divide-gray-200">
          {results?.map(
            ({
              id,
              address,
              relevance,
              name,
              previewImageUrl,
            }: {
              id: any;
              address: any;
              relevance: any;
              name: any;
              previewImageUrl: any;
            }) => (
              <li key={id}>
                <a
                  href={`https://etherscan.io/token/${address}`}
                  className="flex py-4"
                  target="_blank"
                  rel="noreferrer"
                >
                  {previewImageUrl ? (
                    <img className="h-10 w-10 rounded-full" src={previewImageUrl} alt="" />
                  ) : (
                    <div className="h-10 w-10"></div>
                  )}
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">{name}</p>
                    <p className="text-sm text-gray-500">{address}</p>
                  </div>
                </a>
              </li>
            )
          ) || ''}
        </ul>
        {error && 'There was an unexpected center.app API error'}
      </div>
    </>
  );
};
