import { useCallback, useMemo } from 'react';
import { BigNumber } from 'ethers';
import { parseUnits } from 'ethers/lib/utils.js';
import { cleanValue } from '@/utils';
import useToken from './useToken';

/**
 * Cleans an input value to a token's decimals, then parses it
 * Any arbitrary synchronous func can be used to transform the input value after parsing
 * @param input
 * @param tokenSymbol
 * @param transform
 * @returns {BigNumber}
 */
const useInput = (
  input: string,
  tokenSymbol: string,
  mutate?: (inputBN: BigNumber) => BigNumber
): BigNumber | undefined => {
  const { data: token } = useToken(tokenSymbol);

  if (!token) {
    throw new Error(`Token ${tokenSymbol} not found`);
  }

  const { decimals } = token;

  return useMemo(() => {
    const inputCleaned = cleanValue(input, decimals);
    const inputBN = inputCleaned ? parseUnits(inputCleaned, decimals) : undefined;
    if (!inputBN) return undefined;

    return mutate ? mutate(inputBN) : inputBN;
  }, [decimals, input, mutate]);
};

export default useInput;
