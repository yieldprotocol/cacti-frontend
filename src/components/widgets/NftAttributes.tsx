import { useQuery } from 'react-query';
import { useAsset } from '@center-inc/react';
import axios from 'axios';
import { Spinner } from '@/utils';

type Props = {
  nftAddress: string;
  tokenID?: string;
};

axios.defaults.baseURL = 'https://api.center.dev/v1/ethereum-mainnet';

const fetchNftAttributes = async (nftAddress: string, subUrl: string) => {
  return axios
    .get(`${nftAddress}${subUrl}`, {
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
    fetchNftAttributes(nftAddress, '/traits')
  );

  if (isLoading) return <h1>Loading..</h1>;
  if (isError) return <h1>{JSON.stringify(error)}</h1>;

  return (
    <>
      {data?.items.map((item) => {
        return <span key={item.trait}>{item.trait} </span>;
      })}
    </>
  );
};

export const NftAttributes = ({ nftAddress, tokenID }: Props) => {
  const { isLoading, isError, error, data } = useQuery(['singleNftAttributes'], async () =>
    fetchNftAttributes(nftAddress, `/${tokenID}`)
  );
  const result = useAsset({ network: 'ethereum-mainnet', address: nftAddress, tokenId: tokenID });

  if (isLoading) return <Spinner />;
  if (isError) return <h1>{JSON.stringify(error)}</h1>;

  return (
    <>
      <div className="flex justify-center">
        <img className="h-32 w-32 rounded-md" src={result[0].mediaUrl} alt="nft image" />
      </div>
      {data &&
        data?.metadata.attributes.map((attribute) => {
          return (
            <div key={attribute.trait_type}>
              <div className="m-2 text-black">
                <b>{attribute.trait_type}</b>: {attribute.value}{' '}
              </div>
            </div>
          );
        })}
    </>
  );
};
