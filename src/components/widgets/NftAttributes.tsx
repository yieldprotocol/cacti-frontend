import { useQuery } from 'react-query';

type Props = {
  nftAddress: string;
};

const fetchNftAttributes = async ({ nftAddress }: Props) => {
  return fetch(`https://api.center.dev/v1/ethereum-mainnet/${nftAddress}/traits`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

const NftCollectionAttributes = ({ nftAddress }: Props) => {
  const { isLoading, isError, error, data } = useQuery(['nftAttributes'], () =>
    fetchNftAttributes({ nftAddress })
  );

  if (isLoading) return <h1>Loading..</h1>;
  if (isError) return <h1>{JSON.stringify(error)}</h1>;

  return (
    <>
      {data?.items.map((item) => {
        return <li key={item.trait}>{item.trait}</li>;
      })}
      <div>{isLoading && <p>return is Loading</p>}</div>
    </>
  );
};

export default NftCollectionAttributes;
