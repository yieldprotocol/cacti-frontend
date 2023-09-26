import { useContext } from 'react';
import { useWalletClient } from 'wagmi';
import SettingsContext from '@/contexts/SettingsContext';
import useForkTools from '@/hooks/useForkTools';

const useSigner = () => {
  /* Get the useForkSettings the settings context */
  const { settings } = useContext(SettingsContext);
  const { isForkedEnv } = settings;

  const { data } = useWalletClient();
  const { signer: forkSigner } = useForkTools();

  return isForkedEnv ? forkSigner : data;
};

export default useSigner;
