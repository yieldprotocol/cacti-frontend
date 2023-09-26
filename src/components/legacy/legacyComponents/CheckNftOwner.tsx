//@ts-nocheck
import { useEffect, useState } from 'react';
import { Address, erc721ABI, useAccount, useContractRead } from 'wagmi';
import { shortenAddress } from '@/utils';
import useBalance from '../../cactiComponents/hooks/useBalance';

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
    args: [BigInt(tokenId)],
    watch: true,
  });

  const { data: erc1155Data } = useBalance(nftAddress as Address, undefined, tokenId);

  const isOwner = owner === account;

  useEffect(() => {
    if (is721ReadSuccess) setOwner(`${erc721Data?.toString()}` || '');
    if (erc1155Data) setOwner(`Your balance: ` + erc1155Data.toString() || '0');
  }, [erc721Data, erc1155Data, is721ReadSuccess]);

  return (
    <div>
      <b>Owned by</b>: {isOwner ? 'You' : shortenAddress(owner)}
    </div>
  );
};
