import { BigNumber, ethers } from 'ethers';
import { Address } from 'wagmi';
import { getContract } from 'wagmi/actions';
import poolAbi from '../../contracts/abis/pool.json';
import { ICallData, getWrapEthCallData } from '../../helpers';
import { LadleActions, RoutedActions } from '../../operations';

const lend = (
  account: Address | undefined,
  input: BigNumber,
  baseAddress: Address,
  poolAddress: Address,
  isEthBase: boolean
): ICallData[] | undefined => {
  const targetContract = getContract({ address: poolAddress, abi: poolAbi });
  if (!targetContract) {
    console.error('Pool contract not found');
    return undefined;
  }

  return [
    ...getWrapEthCallData(poolAddress, isEthBase ? ethers.constants.Zero : input), // wrap eth to the pool if required
    {
      operation: LadleActions.Fn.TRANSFER,
      args: [baseAddress, poolAddress, input] as LadleActions.Args.TRANSFER,
      ignoreIf: isEthBase,
    },
    {
      operation: LadleActions.Fn.ROUTE,
      args: [account, ethers.constants.Zero] as RoutedActions.Args.SELL_BASE, // TODO handle slippage more gracefully
      fnName: RoutedActions.Fn.SELL_BASE,
      targetContract,
      ignoreIf: false,
    },
  ];
};

export default lend;
