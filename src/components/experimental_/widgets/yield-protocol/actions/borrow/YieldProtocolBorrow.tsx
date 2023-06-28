import { useCallback, useEffect, useMemo, useState } from 'react';
import { useAccount } from 'wagmi';
import { readContract } from 'wagmi/actions';
import {
  ActionResponse,
  HeaderResponse,
  ListResponse,
  SingleLineResponse,
  TextResponse,
} from '@/components/cactiComponents';
import { ApprovalBasicParams } from '@/components/cactiComponents/hooks/useApproval';
import { TxBasicParams } from '@/components/cactiComponents/hooks/useSubmitTx';
// CUSTOM IMPORTS
import useChainId from '@/hooks/useChainId';
import useInput from '@/hooks/useInput';
import useToken from '@/hooks/useToken';
import { toTitleCase } from '@/utils';
import { SERIES_ENTITIES } from '../../config/seriesEntities';
import contractAddresses, { ContractNames } from '../../contracts/config';
import useYieldProtocol from '../../hooks/useYieldProtocol';
import { nameFromMaturity } from '../../utils';

// arbitrary protocol operation custom data
interface YieldBorrowRes {
  maturity_: string; // formatted maturity date
}

// should be generalized and only needed as reference once for all components
interface InputProps {
  borrowTokenSymbol: string;
  collateralTokenSymbol: string;
  borrowAmount: string;
  collateralAmount: string;
  seriesEntityName?: string;

  action: string;
  projectName: string;
}

const YieldProtocolBorrow = ({
  borrowTokenSymbol,
  collateralTokenSymbol,
  borrowAmount,
  collateralAmount,
  seriesEntityName,
  action,
  projectName,
}: InputProps) => {
  /* generic hook usage (not to be touched when creating from example) */
  const chainId = useChainId();
  const { address: account } = useAccount();
  const { data: borrowToken, isETH: borrowTokenIsEth } = useToken(borrowTokenSymbol);
  const { data: collateralToken, isETH: collateralTokenIsEth } = useToken(collateralTokenSymbol);
  const label = `
        ${toTitleCase(
          action
        )} ${borrowAmount} ${borrowTokenSymbol} using ${collateralAmount} ${collateralTokenSymbol} on ${toTitleCase(
    projectName
  )}`;
  const { value: _borrowAmount } = useInput(borrowAmount, borrowToken?.symbol!);
  const { value: _collateralAmount } = useInput(collateralAmount, collateralToken?.symbol!);

  /***************INPUTS******************************************/

  const [approvalParams, setApprovalParams] = useState<ApprovalBasicParams>();
  const [txParams, setTxParams] = useState<TxBasicParams>();
  const [data, setData] = useState<YieldBorrowRes>();
  const [ilkId, setIlkId] = useState<string>();

  const { borrow } = useYieldProtocol();
  const ladle = contractAddresses.addresses.get(chainId)?.get(ContractNames.LADLE);

  const getApprovalParams = useCallback(async () => {
    if (!_collateralAmount) return console.error('collateral amount is undefined');
    if (!collateralToken || !ladle) return undefined;

    // get the proper join address
    const joinAddress = await readContract({
      address: ladle,
      chainId,
      abi: [
        {
          inputs: [{ internalType: 'bytes6', name: '', type: 'bytes6' }],
          name: 'joins',
          outputs: [{ internalType: 'contract IJoin', name: '', type: 'address' }],
          stateMutability: 'view',
          type: 'function',
        },
      ],
      functionName: 'joins',
      args: [ilkId],
    });

    const approvalParams: ApprovalBasicParams = {
      tokenAddress: collateralToken.address,
      spender: joinAddress,
      approvalAmount: _collateralAmount,
    };

    setApprovalParams(approvalParams);
  }, [_collateralAmount, chainId, collateralToken, ilkId, ladle]);

  // set tx params (specific to yield protocol)
  useEffect(() => {
    (async () => {
      if (!ilkId) return console.error('ilkId is undefined');
      if (!_borrowAmount) return console.error('borrow amount is undefined');
      if (!_collateralAmount) return console.error('collateral amount is undefined');
      if (!borrowToken || !collateralToken) return;

      const baseAddress = borrowToken.address;
      const seriesEntities = SERIES_ENTITIES.get(chainId);
      if (!seriesEntities) return console.error('seriesEntities is undefined');

      const relevantSeriesEntities = Array.from(seriesEntities.values());

      const seriesEntity = relevantSeriesEntities.find(
        (s) => s.baseAddress.toLowerCase() === baseAddress.toLowerCase()
      ); // Find the first relevant series using base address (TODO not kosher)

      if (!seriesEntity) return console.error('seriesEntity is undefined');

      const txParams = await borrow({
        account,
        borrowAmount: _borrowAmount,
        collateralAmount: _collateralAmount,
        seriesEntityId: seriesEntity.id,
        ilkId,
        vaultId: undefined, // vault id is blank when borrowing without a previously built vault (TODO: handle trying to supply a vault id)
        isEthBase: borrowTokenIsEth,
        isEthCollateral: collateralTokenIsEth,
      });

      setTxParams(txParams);
      setData({ maturity_: `${nameFromMaturity(seriesEntity.maturity, 'MMM yyyy')}` });
    })();
  }, [
    _borrowAmount,
    _collateralAmount,
    account,
    borrow,
    borrowToken,
    borrowTokenIsEth,
    chainId,
    collateralToken,
    collateralTokenIsEth,
    ilkId,
  ]);

  // set approval params
  useEffect(() => {
    (async () => {
      await getApprovalParams();
    })();
  }, [getApprovalParams]);

  /***************INPUTS******************************************/

  // TODO handle generic weird inputs

  return (
    <>
      <HeaderResponse text={label} projectName={projectName} />
      <SingleLineResponse
        tokenSymbol={borrowTokenSymbol}
        tokenValueInUsd={100} // TODO handle actual
        amount={borrowAmount}
        amountValueInUsd={100} // TODO handle actual
      />
      <SingleLineResponse
        tokenSymbol={collateralTokenSymbol}
        tokenValueInUsd={100} // TODO handle actual
        amount={collateralAmount}
        amountValueInUsd={100} // TODO handle actual
      />
      <ListResponse
        title="Breakdown"
        data={[
          ['APR', 'some calculated apr %'],
          ['Maturity', data?.maturity_],
          ['Slippage', 'Some slippage %'],
        ]}
        collapsible
      />
      <ActionResponse label={label} approvalParams={approvalParams} txParams={txParams} />
    </>
  );
};

export default YieldProtocolBorrow;
