import { useEffect, useState } from 'react';
import { BigNumber } from 'ethers';
import { erc721ABI, useAccount, useContractRead } from 'wagmi';
import erc1155ABI from '@/abi/erc1155ABI.json';
import { shortenAddress } from '@/utils';

interface Props {
  nftAddress: string;
  tokenId: string;
}

export const NftOwner = ({ nftAddress, tokenId }: Props) => {
  const [owner, setOwner] = useState('');
  const { address: account } = useAccount();

  const { data: erc721Data, isSuccess: is721ReadSuccess } = useContractRead({
    address: nftAddress as `0x${string}`,
    abi: erc721ABI,
    functionName: 'ownerOf',
    args: [BigNumber.from(tokenId)],
    watch: true,
  });

  const { data: erc1155Data, isSuccess: is1155ReadSuccess } = useContractRead({
    address: nftAddress as `0x${string}`,
    abi: erc1155ABI,
    functionName: 'balanceOf',
    args: [account, BigNumber.from(tokenId)],
    watch: true,
  });

  useEffect(() => {
    if (is721ReadSuccess) setOwner(`${erc721Data?.toString()}` || '');
    if (is1155ReadSuccess) setOwner(`Your balance: ` + erc1155Data?.toString() || '0');
  }, [erc721Data, erc1155Data, is721ReadSuccess, is1155ReadSuccess]);

  return (
    <div>
      <b>Owned by</b>: {shortenAddress(owner)}
    </div>
  );
};
