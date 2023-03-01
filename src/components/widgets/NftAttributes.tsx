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
        'X-API-Key': 'keyf3d186ab56cd4148783854f3',
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

const NftCollectionAttributes = ({ nftAddress }: Props) => {
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

export default NftCollectionAttributes;
