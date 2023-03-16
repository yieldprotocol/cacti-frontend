import { useQuery } from 'react-query';
import { useAsset, useCollection } from '@center-inc/react';
import axios from 'axios';
import { Spinner } from '@/utils';

interface Props {
  nftAddress: string;
  tokenID?: string;
  traitType?: string;
  traitValue?: string;
}

interface NftAttributesProps {
  tokenId: string;
  address: string;
  name: string;
  mediumPreviewImageUrl: string;
}

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

const fetchNftsByAttributes = async (nftAddress: string, traitType: string, traitValue: string) => {
  const data = {
    query: {
      [traitType]: [traitValue],
    },
  };

  return axios
    .post(`${nftAddress}/assets/searchByTraits?limit=10`, data, {
      headers: {
        Accept: 'application/json',
        contentType: 'application/json',
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
    <div className="flex flex-col">
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
    </div>
  );
};

export const NftsWithAttributes = ({ nftAddress, traitType, traitValue }: Props) => {
  const { isLoading, isError, error, data } = useQuery(
    ['NftsWithAttributes', nftAddress, traitType, traitValue],
    async () => fetchNftsByAttributes(nftAddress, traitType, traitValue)
  );

  if (isLoading) return <Spinner />;
  if (isError) return <h1>{JSON.stringify(error)}</h1>;
  if (!data) return <h1 className="text-black">fetchNftsByAttributes failed</h1>;

  return (
    <>
      <div className="mt-4 flex w-[100%] justify-center text-black">
        {isLoading && <span>Results loading</span>}
        <ul
          role="list"
          className="flex grid w-[100%] grid-cols-2 flex-wrap gap-x-6 gap-y-1 after:flex-auto xl:grid-cols-4"
        >
          {(data?.items &&
            data?.items.map(
              ({ tokenId, address, name, mediumPreviewImageUrl }: NftAttributesProps) => (
                <div className="flex justify-center" key={tokenId}>
                  <a
                    href={`https://center.app/collections/${address}/${tokenId}`}
                    className="flex items-center py-4"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {mediumPreviewImageUrl ? (
                      <img className="h-32 w-32 rounded-md" src={mediumPreviewImageUrl} alt="" />
                    ) : (
                      <div className="flex h-32 w-32 items-center justify-center bg-gray-100 text-4xl text-gray-400">
                        ?
                      </div>
                    )}
                    <p className="ml-3 text-sm font-medium text-gray-300 underline">{name}</p>
                  </a>
                </div>
              )
            )) ||
            `Can't find items that has the following traits: ${traitType}: ${traitValue}`}
        </ul>
        {error && 'There was an unexpected center.app API error'}
      </div>
    </>
  );
};
