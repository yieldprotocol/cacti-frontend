import { useEffect, useState } from 'react';
import { BigNumber } from 'ethers';
import { erc721ABI, useBlockNumber, useContractRead } from 'wagmi';

interface Props {
  nftAddress: string;
  tokenId: string;
}

export const CheckNftOwner = ({ nftAddress, tokenId }: Props) => {
  const [owner, setOwner] = useState('');

  const { data, isError, isLoading } = useContractRead({
    address: nftAddress as `0x${string}`,
    abi: erc721ABI,
    functionName: 'ownerOf',
    args: [BigNumber.from(tokenId)],
    watch: true,
  });

  useEffect(() => {
    setOwner(data?.toString() || '');
  }, [data]);

  return (
    <div className="m-2">
      <b>Owner</b>: {owner}
    </div>
  );
};
