import { useQuery } from 'react-query';
import { useAsset, useCollection } from '@center-inc/react';
import axios from 'axios';
import { NftAssetContainer } from '@/components/legacy/legacyWidgets/NftAssetContainer';
import { NftCollectionTraitsContainer } from '@/components/legacy/legacyWidgets/NftCollectionContainer';
import { Spinner } from '@/utils';
import { ETHEREUM_NETWORK } from '@/utils/constants';
import Grid from '../legacyComponents/Grid';

interface Props {
  nftAddress: string;
  tokenID?: string;
  traitType?: string;
  traitValue?: string;
}

interface NftAttributesProps {
  tokenId: string;
  address: string;
  collectionName: string;
  name: string;
  mediumPreviewImageUrl: string;
}

axios.defaults.baseURL = `https://api.center.dev/v1/${ETHEREUM_NETWORK}`;

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
  const useCollectionResult = useCollection({ network: ETHEREUM_NETWORK, address: nftAddress });

  if (isLoading) return <h1>Loading..</h1>;
  if (isError) return <h1>{JSON.stringify(error)}</h1>;

  return (
    <NftCollectionTraitsContainer
      network={ETHEREUM_NETWORK}
      address={nftAddress}
      name={useCollectionResult?.name!}
      traits={data?.items.map((item: any) => item.trait)}
    />
  );
};

export const NftAttributes = ({ nftAddress, tokenID }: Props) => {
  const { isLoading, isError, error, data } = useQuery(
    ['NftAttributes', nftAddress, tokenID],
    async () => fetchNftAttributes(nftAddress, `/${tokenID}`)
  );
  const result = useAsset({ network: ETHEREUM_NETWORK, address: nftAddress, tokenId: tokenID! });

  if (isLoading) return <Spinner className="h-4" />;
  if (isError) return <h1>{JSON.stringify(error)}</h1>;

  return (
    <div className="flex flex-col">
      <div className="flex justify-center">
        <img className="h-32 w-32 rounded-md" src={result[0].mediaUrl} alt="nft image" />
      </div>
      {data?.metadata?.attributes &&
        data?.metadata.attributes.map((attribute: any) => {
          return (
            <div key={attribute.trait_type}>
              <div className="m-2">
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
    async () => fetchNftsByAttributes(nftAddress, traitType!, traitValue!)
  );

  if (isLoading) return <Spinner className="h-4" />;
  if (isError) return <h1>{JSON.stringify(error)}</h1>;
  if (!data) return <h1 className="text-black">fetchNftsByAttributes failed</h1>;

  return (
    <>
      <div className="mt-4 flex w-[100%] justify-center text-black">
        {isLoading && <span>Results loading</span>}
        <Grid>
          {(data?.items &&
            data?.items.map(
              ({
                tokenId,
                address,
                collectionName,
                name,
                mediumPreviewImageUrl,
              }: NftAttributesProps) => (
                <NftAssetContainer
                  key={`${address}/${tokenId}`}
                  network={ETHEREUM_NETWORK}
                  address={address}
                  tokenId={tokenId}
                  collectionName={collectionName}
                  name={name}
                  previewImageUrl={mediumPreviewImageUrl}
                />
              )
            )) ||
            `Can't find items that has the following traits: ${traitType}: ${traitValue}`}
        </Grid>
        {error && 'There was an unexpected center.app API error'}
      </div>
    </>
  );
};
