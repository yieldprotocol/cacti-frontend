import { BigNumber, Signer, ethers } from 'ethers';
import { Address, readContracts } from 'wagmi';
import { getContract } from 'wagmi/actions';
import cauldronAbi from '../../contracts/abis/Cauldron';
import ladleAbi from '../../contracts/abis/Ladle';
import poolAbi from '../../contracts/abis/Pool';
import contractAddresses, { ContractNames } from '../../contracts/config';
import { ICallData, getSendParams, getUnwrapEthCallData, getWrapEthCallData } from '../../helpers';
import { LadleActions } from '../../operations';

export const WETH = '0x303000000000';

interface BorrowCloseProps {
  account: Address;
  vaultId: string;
  signer: Signer;
  chainId: number;
}

/**
 * Returns the calldata needed for the batch transaction to close a vault (close borrow position)
 * @param account
 * @param vaultId
 * @param borrowTokenIsEth
 * @param collateralTokenIsEth
 * @param signer
 * @param chainId
 *
 * @returns {ICallData[] | undefined}
 */
const _borrowClose = async ({
  account,
  vaultId,
  signer,
  chainId,
}: BorrowCloseProps): Promise<ICallData[] | undefined> => {
  const ladleAddress = contractAddresses.addresses.get(chainId)?.get(ContractNames.LADLE);
  if (!ladleAddress) {
    console.error('Ladle address not found; possibly on an unsupported chain');
    return undefined;
  }
  const cauldronAddress = contractAddresses.addresses.get(chainId)?.get(ContractNames.CAULDRON);
  if (!cauldronAddress) {
    console.error('Cauldron address not found; possibly on an unsupported chain');
    return undefined;
  }

  // get cauldron
  const cauldron = getContract({
    address: cauldronAddress,
    abi: cauldronAbi,
  });

  // get the accrued art directly from contract; can't multicall this using wagmi for now
  const [{ art, ink: collateralAmount }, { seriesId, ilkId }] = await readContracts({
    contracts: [
      {
        address: cauldronAddress,
        abi: cauldronAbi,
        functionName: 'balances',
        args: [vaultId as Address],
      },
      {
        address: cauldronAddress,
        abi: cauldronAbi,
        functionName: 'vaults',
        args: [vaultId as Address],
      },
    ],
  });

  const [{ baseId, maturity }, poolAddress] = await readContracts({
    contracts: [
      { address: cauldronAddress, abi: cauldronAbi, functionName: 'series', args: [seriesId] },
      { address: ladleAddress, abi: ladleAbi, functionName: 'pools', args: [seriesId] },
    ],
  });

  const seriesEntityIsMature = maturity <= Math.floor(Date.now() / 1000);
  const [baseAddress, joinAddress, maxBaseIn] = await readContracts({
    contracts: [
      {
        address: cauldronAddress,
        abi: cauldronAbi,
        functionName: 'assets',
        args: [baseId],
      },
      {
        address: ladleAddress,
        abi: ladleAbi,
        functionName: 'joins',
        args: [baseId],
      },
      {
        address: poolAddress,
        abi: poolAbi,
        functionName: 'maxBaseIn',
      },
    ],
  });

  const debtAmount = (await cauldron.callStatic.debtFromBase(
    seriesId,
    art
  )) as unknown as BigNumber; // TODO make more kosher

  const amountToTransfer = seriesEntityIsMature ? debtAmount.mul(10001).div(10000) : art; // After maturity + 0.1% for increases during tx time

  const tradeIsPossible = debtAmount.gt(maxBaseIn);

  const borrowTokenIsEth = baseId === WETH;
  const collateralTokenIsEth = ilkId === WETH;
  const removeCollateralToAddress = collateralTokenIsEth ? ladleAddress : account;

  return [
    ...(borrowTokenIsEth
      ? getWrapEthCallData({
          value: amountToTransfer,
          to: seriesEntityIsMature ? ladleAddress : joinAddress,
          signer,
          chainId,
        })
      : []),

    {
      operation: LadleActions.Fn.TRANSFER,
      args: [baseAddress, joinAddress, amountToTransfer] as LadleActions.Args.TRANSFER,
      ignoreIf: borrowTokenIsEth,
    },

    /* BEFORE MATURITY */
    {
      operation: LadleActions.Fn.REPAY_VAULT,
      args: [
        vaultId,
        removeCollateralToAddress,
        collateralAmount,
        debtAmount,
      ] as LadleActions.Args.REPAY_VAULT,
      ignoreIf: seriesEntityIsMature || !tradeIsPossible,
    },

    /* edge case in pool low liquidity situations wheere the repay amount is greater than the max base into the pool (debt is repaid at 1:1 with fyToken, so there's a penalty) */
    {
      operation: LadleActions.Fn.CLOSE,
      args: [
        vaultId,
        removeCollateralToAddress,
        collateralAmount,
        debtAmount.mul(-1),
      ] as LadleActions.Args.CLOSE,
      ignoreIf: seriesEntityIsMature || tradeIsPossible,
    },

    /* AFTER MATURITY */
    {
      operation: LadleActions.Fn.CLOSE,
      args: [
        vaultId,
        removeCollateralToAddress,
        collateralAmount,
        BigNumber.from(debtAmount).mul(-1),
      ] as LadleActions.Args.CLOSE,
      ignoreIf: !seriesEntityIsMature || tradeIsPossible,
    },

    ...getUnwrapEthCallData({
      to: account,
      value: collateralTokenIsEth ? collateralAmount : ethers.constants.Zero,
    }),
  ];
};

/**
 * Returns the send params for closing a borrow position
 */
const borrowClose = async ({ account, vaultId, signer, chainId }: BorrowCloseProps) => {
  const calls = await _borrowClose({
    account,
    vaultId,
    signer,
    chainId,
  });
  return calls ? await getSendParams({ calls, signer, chainId }) : undefined;
};

export default borrowClose;
