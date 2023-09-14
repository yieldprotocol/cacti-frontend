import { useMemo } from 'react';
import { cleanValue } from '@/utils';
import useToken from './useToken';
import { formatUnits, parseUnits } from 'viem';

type Input = {
  value: bigint | undefined;
  formatted: string | undefined;
  decimals: number;
};

/**
 * Cleans an input value to a token's decimals, then parses it
 * Any arbitrary synchronous func can be used to transform the input value after parsing
 * @param input
 * @param tokenSymbol
 * @param transform
 * @returns {Input}
 */
const useInput = (
  input: string,
  tokenSymbol: string,
  mutate?: (inputBN: bigint) => bigint
) => {
  const { data: token } = useToken(tokenSymbol);

  return useMemo((): Input | undefined => {
    if (!token) {
      console.error(`Token ${tokenSymbol} not found`);
      return;
    }

    const { decimals } = token;
    const inputCleaned = cleanValue(input, decimals);
    const inputBN = inputCleaned ? parseUnits(inputCleaned, decimals) : undefined;
    if (!inputBN) return { value: undefined, formatted: undefined, decimals: decimals };

    const value = mutate ? mutate(inputBN) : inputBN;
    const formatted = formatUnits(value, decimals);
    return { value, formatted, decimals };
  }, [input, tokenSymbol, token, mutate]);
};

export default useInput;
