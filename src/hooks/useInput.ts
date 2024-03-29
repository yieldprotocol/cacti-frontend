import { useMemo } from 'react';
import { BigNumber } from 'ethers';
import { formatUnits, parseUnits } from 'ethers/lib/utils.js';
import { cleanValue } from '@/utils';
import useToken from './useToken';

type Input = {
  value: BigNumber | undefined;
  formatted: string | undefined;
  decimals: number;
};

/**
 * Cleans an input value to a token's decimals, then parses it
 * Any arbitrary synchronous func can be used to transform the input value after parsing
 * @param input
 * @param tokenSymbol
 * @param transform
 * @returns {Input | undefined}
 */
const useInput = (
  input: string,
  tokenSymbol: string,
  mutate?: (inputBN: BigNumber) => BigNumber
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
