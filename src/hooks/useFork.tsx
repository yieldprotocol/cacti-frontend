import { useLocalStorage } from './useLocalStorage';

const USE_FORK_KEY = 'useFork';

// handle using a fork
const useFork = () => {
  const [useForkEnv] = useLocalStorage(USE_FORK_KEY, JSON.stringify(true));

  return { useForkEnv: useForkEnv as boolean };
};

export default useFork;
