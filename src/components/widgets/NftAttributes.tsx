import { useQuery } from 'react-query';
import { useAsset, useCollection } from '@center-inc/react';
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
        'X-API-Key': process.env.NEXT_PUBLIC_CENTER_APP_KEY || 'keyf3d186ab56cd4148783854f3',
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
  const { isLoading, isError, error, data } = useQuery(
    ['nftCollectionAttributes', nftAddress],
    async () => fetchNftAttributes(nftAddress, '/traits')
  );

  const useCollectionResult = useCollection({ network: 'ethereum-mainnet', address: nftAddress });

  if (isLoading) return <h1>Loading..</h1>;
  if (isError) return <h1>{JSON.stringify(error)}</h1>;

  return (
    <div>
      <span>
        The NFT collection, <b>{useCollectionResult?.name || nftAddress}</b>, has the following
        traits:{' '}
      </span>
      {data?.items.map((item, index, items) => {
        if (index === items.length - 1) return <b key={item.trait}>and {item.trait}. </b>;
        return (
          <span key={item.trait}>
            <b>{item.trait}</b>,{' '}
          </span>
        );
      })}
    </div>
  );
};

export const NftAttributes = ({ nftAddress, tokenID }: Props) => {
  const { isLoading, isError, error, data } = useQuery(
    ['NftAttributes', nftAddress, tokenID],
    async () => fetchNftAttributes(nftAddress, `/${tokenID}`)
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
