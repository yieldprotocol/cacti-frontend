import { useQuery } from 'react-query';
import axios from 'axios';

type Props = {
  nftAddress: string;
};

axios.defaults.baseURL = 'https://api.center.dev/v1/ethereum-mainnet';

const fetchCollectionAttributes = async (nftAddress: string) => {
  return axios
    .get(`${nftAddress}/traits`, {
      headers: {
        Accept: 'application/json',
        'X-API-Key': process.env.NEXT_PUBLIC_CENTER_APP_KEY,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const NftCollectionAttributes = ({ nftAddress }: Props) => {
  const { isLoading, isError, error, data } = useQuery(['nftAttributes'], async () =>
    fetchCollectionAttributes(nftAddress)
  );

  if (isLoading) return <h1>Loading..</h1>;
  if (isError) return <h1>{JSON.stringify(error)}</h1>;

  return (
    <>
      {data?.items.map((item) => {
        return <li key={item.trait}>{item.trait}</li>;
      })}
    </>
  );
};
