import { BigNumber, Signer, ethers } from 'ethers';
import { Address } from 'wagmi';
import { getContract } from 'wagmi/actions';
import poolAbi from '../../contracts/abis/Pool';
import { ICallData, getSendParams, getWrapEthCallData } from '../../helpers';
import { LadleActions, RoutedActions } from '../../operations';

interface LendProps {
  account: Address | undefined;
  input: BigNumber;
  poolAddress: Address;
  baseAddress: Address;
  isEthBase: boolean;
  signer: Signer;
  chainId: number;
}

/**
 * Returns the calldata needed for the batch transaction to lend
 * @param account
 * @param input
 * @param poolAddress
 * @param baseAddress
 * @param poolAddress
 * @param isEthBase
 * @param signer
 * @param chainId
 *
 * @returns {ICallData[] | undefined}
 */
const _lend = ({
  account,
  input,
  poolAddress,
  baseAddress,
  isEthBase,
  signer,
  chainId,
}: LendProps): ICallData[] | undefined => {
  if (!signer) {
    console.error('Signer not found');
    return undefined;
  }

  const poolContract = getContract({
    address: poolAddress,
    abi: poolAbi,
    signerOrProvider: signer,
  });

  if (!poolContract) {
    console.error('Pool contract not found');
    return undefined;
  }

  return [
    ...getWrapEthCallData({
      to: poolAddress,
      value: isEthBase ? input : ethers.constants.Zero,
      signer,
      chainId,
    }), // wrap eth to the pool if required
    {
      operation: LadleActions.Fn.TRANSFER,
      args: [baseAddress, poolAddress, input] as LadleActions.Args.TRANSFER,
      ignoreIf: isEthBase,
    },
    {
      operation: LadleActions.Fn.ROUTE,
      args: [account, ethers.constants.Zero] as RoutedActions.Args.SELL_BASE, // TODO handle slippage more gracefully
      fnName: RoutedActions.Fn.SELL_BASE,
      targetContract: poolContract,
      ignoreIf: false,
    },
  ];
};

/**
 * Returns the send params for lending
 */
const lend = async ({
  account,
  input,
  poolAddress,
  baseAddress,
  isEthBase,
  signer,
  chainId,
}: LendProps) => {
  const lendCallData = _lend({
    account,
    input,
    poolAddress,
    baseAddress,
    isEthBase,
    signer,
    chainId,
  });
  return lendCallData ? await getSendParams({ calls: lendCallData, signer, chainId }) : undefined;
};

export default lend;
