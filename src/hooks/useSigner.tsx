//@ts-nocheck
import { useContext } from 'react';
import { Signer } from 'ethers';
import { useSigner as useSignerWagmi } from 'wagmi';
import SettingsContext from '@/contexts/SettingsContext';
import useForkTools from '@/hooks/useForkTools';

const useSigner = () => {
  /* Get the useForkSettings the settings context */
  const { settings } = useContext(SettingsContext);
  const { isForkedEnv } = settings;

  const { data: wagmiSigner } = useSignerWagmi();
  const { signer: forkSigner } = useForkTools();

  return isForkedEnv ? forkSigner : (wagmiSigner as Signer);
};

export default useSigner;
