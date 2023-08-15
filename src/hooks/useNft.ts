import { useQuery } from 'react-query';
import { Network } from '@center-inc/react';
import axios from 'axios';
import { BigNumber } from 'ethers';
import { Address, erc721ABI, useAccount } from 'wagmi';
import { readContract } from 'wagmi/actions';
import { ETHEREUM_NETWORK } from '@/utils/constants';

interface NftRes {
  address: string;
  collectionName: string;
  collection_name: string;
  mediumPreviewImageUrl: string;
  metadata: {
    attributes: {
      trait_type: string;
      value: string;
    }[];
    description: string;
    image: string;
    name: string;
    tokenId: number;
  };
  name: string;
  smallPreviewImageUrl: string;
  small_preview_image_url: string;
  tokenId: string;
  token_id: string;
  url: string;
  owner?: Address;
  isOwner?: boolean;
}

const useNft = ({
  address,
  tokenId,
  network,
}: {
  address: Address;
  tokenId: number;
  network: Network;
}) => {
  const { address: account } = useAccount();
  const fetchNft = async (
    nftAddress: string,
    tokenId: number,
    network: string = ETHEREUM_NETWORK
  ) => {
    // TODO: deprecate this hook as Center API shouldn't be called from the FE
    const { data } = await axios.get<NftRes>(
      `https://api.center.dev/v1/${network}/${nftAddress}/${tokenId}`,
      {
        headers: {
          Accept: 'application/json',
          'X-API-Key': process.env.NEXT_PUBLIC_CENTER_APP_KEY || 'test',
        },
      }
    );
    return data;
  };

  const { data: centerData, ...rest } = useQuery({
    queryKey: ['nft', address, tokenId, network],
    queryFn: async () => await fetchNft(address, tokenId, network),
    refetchOnWindowFocus: false,
  });

  const { data: owner, refetch: refetchOwner } = useQuery({
    queryKey: ['nftOwner', address, tokenId, network],
    queryFn: async () =>
      await readContract({
        address,
        abi: erc721ABI,
        functionName: 'ownerOf',
        args: [BigNumber.from(tokenId)],
      }),
    refetchOnWindowFocus: false,
  });

  const data = { ...centerData, owner, isOwner: owner === account };

  return {
    data,
    ...rest,
    refetchOwner,
  };
};

export default useNft;
