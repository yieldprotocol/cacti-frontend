import { BigNumber, Signer, ethers } from 'ethers';
import { Address } from 'wagmi';
import { getContract, readContract } from 'wagmi/actions';
import poolAbi from '../../contracts/abis/Pool';
import contractAddresses, { ContractNames } from '../../contracts/config';
import { ICallData, getSendParams, getUnwrapEthCallData } from '../../helpers';
import { LadleActions, RoutedActions } from '../../operations';

interface LendCloseProps {
  account: Address | undefined;
  amount: BigNumber;
  fyTokenAddress: Address;
  poolAddress: Address;
  seriesEntityId: string;
  seriesEntityIsMature: boolean;
  isEthBase: boolean;
  signer: Signer;
  chainId: number;
}

/**
 * Returns the calldata needed for the batch transaction to lend
 * @param account
 * @param amount
 * @param fyTokenAddress
 * @param poolAddress
 * @param seriesEntityId
 * @param seriesEntityIsMature
 * @param isEthBase
 * @param signer
 * @param chainId
 *
 * @returns {ICallData[] | undefined}
 */
const _lendClose = async ({
  account,
  amount,
  fyTokenAddress,
  poolAddress,
  seriesEntityId,
  seriesEntityIsMature,
  isEthBase,
  signer,
  chainId,
}: LendProps): Promise<ICallData[] | undefined> => {
  if (!signer) {
    console.error('Signer not found');
    return undefined;
  }
  const ladleAddress = contractAddresses.addresses.get(chainId)?.get(ContractNames.LADLE);

  const poolContract = getContract({
    address: poolAddress,
    abi: poolAbi,
    signerOrProvider: signer,
  });

  if (!poolContract) {
    console.error('Pool contract not found');
    return undefined;
  }

  // select destination based on if mature
  const transferToAddress = seriesEntityIsMature ? fyTokenAddress : poolAddress;
  const receiverAddress = isEthBase ? ladleAddress : account;

  // estimate the fyToken value of the base amount
  const fyTokenValue = seriesEntityIsMature
    ? amount
    : await readContract({
        address: poolAddress,
        abi: poolAbi,
        functionName: 'buyBasePreview',
        args: [amount],
      });

  // input amount with 1% slippage
  const amountWithSlippage = amount.mul(99).div(100);

  return [
    {
      operation: LadleActions.Fn.TRANSFER,
      args: [fyTokenAddress, transferToAddress, fyTokenValue] as LadleActions.Args.TRANSFER,
    },

    /* BEFORE MATURITY */
    {
      operation: LadleActions.Fn.ROUTE,
      args: [receiverAddress, amountWithSlippage] as RoutedActions.Args.SELL_FYTOKEN,
      fnName: RoutedActions.Fn.SELL_FYTOKEN,
      targetContract: poolContract,
      ignoreIf: seriesEntityIsMature,
    },

    /* AFTER MATURITY */
    {
      operation: LadleActions.Fn.REDEEM,
      args: [seriesEntityId, receiverAddress, fyTokenValue] as LadleActions.Args.REDEEM,
      ignoreIf: !seriesEntityIsMature,
    },

    ...(isEthBase
      ? getUnwrapEthCallData({ value: ethers.constants.One, to: receiverAddress! })
      : []), // will unwrap all eth in the ladle, so value does not matter here (just has to be greater than 0)
  ];
};

/**
 * Returns the send params for closing a lend position (selling fyToken for base)
 */
const lendClose = async ({
  account,
  amount,
  fyTokenAddress,
  poolAddress,
  seriesEntityId,
  seriesEntityIsMature,
  isEthBase,
  signer,
  chainId,
}: LendCloseProps) => {
  const calls = await _lendClose({
    account,
    amount,
    fyTokenAddress,
    poolAddress,
    seriesEntityId,
    seriesEntityIsMature,
    isEthBase,
    signer,
    chainId,
  });
  return calls ? await getSendParams({ calls, signer, chainId }) : undefined;
};

export default lendClose;
