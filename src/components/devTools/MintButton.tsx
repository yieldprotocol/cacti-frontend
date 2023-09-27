import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { useAccount, useNetwork } from 'wagmi';
import { useEthersProvider } from '@/utils/ethersAdapter';
import useBalance from '../cactiComponents/hooks/useBalance';
import { Button } from '../shared/Button';

export const MintButton = () => {
  const { address } = useAccount();
  const [isLoading, setLoading] = useState(false);
  const [isVisible, setVisible] = useState(false);
  const { chain } = useNetwork();
  const { refetch } = useBalance();
  const provider = useEthersProvider();

  useEffect(() => {
    if (!address || chain?.id != 1) setVisible(false);
    setVisible(true);
  }, [address, chain?.id]);

  const mint = async () => {
    const params = [
      [address],
      ethers.utils.parseEther('10').toHexString(), // hex encoded wei amount
    ];
    setLoading(true);
    // @ts-ignore
    await provider.send('tenderly_addBalance', params);
    await refetch();
    setLoading(false);
  };
  return !isVisible ? (
    <></>
  ) : (
    <Button
      onClick={mint}
      disabled={isLoading}
      className="flex w-full text-xs disabled:bg-gray-400"
    >
      Mint 10 ETH
    </Button>
  );
};
