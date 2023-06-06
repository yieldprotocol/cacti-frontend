import { BigNumber, ethers } from 'ethers';
import { Address, useContract } from 'wagmi';
import poolAbi from './abis/pool.json';
import { ICallData, getWrapEthCallData } from './helpers';
import { LadleActions, RoutedActions } from './operations';

const lend = (
  account: Address | undefined,
  input: BigNumber,
  baseAddress: Address,
  poolAddress: Address,
  isEthBase: boolean
): ICallData[] | undefined => {
  const targetContract = useContract({ address: poolAddress, abi: poolAbi });
  if (!targetContract) {
    console.error('Pool contract not found');
    return undefined;
  }

  return [
    ...getWrapEthCallData(poolAddress, input), // wrap eth to the pool
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
