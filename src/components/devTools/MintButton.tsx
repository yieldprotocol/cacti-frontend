import { useContext, useState } from 'react';
import SettingsContext from '@/contexts/SettingsContext';
import { useAccount, useNetwork, useProvider } from 'wagmi';
import useBalance from '../cactiComponents/hooks/useBalance';
import { Button } from '../shared/Button';
import { parseEther } from 'viem';

export const MintButton = () => {
  const { address } = useAccount();
  const [isLoading, setLoading] = useState(false);
  const { refetch } = useBalance();
  const provider = useProvider();
  const {
    settings: { isForkedEnv },
  } = useContext(SettingsContext);

  // useEffect(() => {
  //   if (!address || chain?.id != 1) setVisible(false);
  //   setVisible(true);
  // }, [address, chain?.id]);

  const mint = async () => {
    const params = [
      [address],
      parseEther('10'), // hex encoded wei amount
    ];
    setLoading(true);
    // @ts-ignore
    await provider.send('tenderly_addBalance', params);
    await refetch();
    setLoading(false);
  };
  return (
    isForkedEnv ? 
    <Button
      onClick={mint}
      disabled={isLoading}
      className="flex w-full text-xs disabled:bg-gray-400"
    >
      Mint 10 ETH
    </Button> : <></>
  );
};
