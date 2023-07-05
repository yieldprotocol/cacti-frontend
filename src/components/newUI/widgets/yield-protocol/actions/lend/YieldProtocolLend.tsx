import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
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
import { getTxParams } from '../../helpers';
import { nameFromMaturity } from '../../utils';
import lend from './helpers';

// arbitrary protocol operation custom data
interface YieldLendRes {
  maturity_: string; // formatted maturity date
}

// should be generalized and only needed as reference once for all components
interface InputProps {
  tokenInSymbol: string;
  tokenOutSymbol?: string;
  inputAmount: string;
  action: string;
  projectName: string;
}

const YieldProtocolLend = ({
  tokenInSymbol,
  tokenOutSymbol,
  inputAmount,
  action,
  projectName,
}: InputProps) => {
  /* generic hook usage (not to be touched when creating from example) */
  const chainId = useChainId();
  const { address } = useAccount();
  const { data: tokenIn, isETH: tokenInIsETH } = useToken(tokenInSymbol);
  const { data: tokenOut, isETH: tokenOutIsETH } = useToken(tokenOutSymbol);
  const label = `
        ${toTitleCase(action)} ${inputAmount} ${tokenInSymbol} on ${toTitleCase(projectName)}`;
  const { value: amount } = useInput(inputAmount, tokenInSymbol);

  /***************INPUTS******************************************/

  const [approvalParams, setApprovalParams] = useState<ApprovalBasicParams>();
  const [txParams, setTxParams] = useState<TxBasicParams>();
  const [data, setData] = useState<YieldLendRes>();

  // Yield Protocol specific spender handling
  const ladle = contractAddresses.addresses.get(chainId)?.get(ContractNames.LADLE);

  // set tx params (specific to yield protocol)
  useEffect(() => {
    (async () => {
      if (!tokenIn) return console.error('tokenIn is undefined');
      if (!amount) return console.error('amount is undefined');
      if (!ladle) return console.error('ladle is undefined');

      const approvalParams: ApprovalBasicParams = {
        tokenAddress: tokenIn.address,
        spender: ladle,
        approvalAmount: amount,
      };
      setApprovalParams(approvalParams);

      const baseAddress = tokenIn.address;
      const seriesEntities = SERIES_ENTITIES.get(chainId);
      if (!seriesEntities) return;

      const relevantSeriesEntities = Array.from(seriesEntities.values());

      const seriesEntity = relevantSeriesEntities.find(
        (s) => s.baseAddress.toLowerCase() === baseAddress.toLowerCase()
      ); // Find the first relevant series using base address (TODO not kosher)

      const poolAddress = seriesEntity?.poolAddress;
      if (!poolAddress) return;

      const lendCallData = lend(address, amount!, baseAddress, poolAddress, tokenInIsETH);

      setTxParams(lendCallData ? await getTxParams(lendCallData, ladle) : undefined);
      setData({ maturity_: `${nameFromMaturity(seriesEntity.maturity, 'MMM yyyy')}` });
    })();
  }, [address, amount, chainId, ladle, tokenIn, tokenInIsETH]);
  /***************INPUTS******************************************/

  // generic weird input handling; can be abstracted out
  if (inputAmount === '*' || inputAmount === '{amount}')
    return (
      <TextResponse
        text={`Please edit your query with an amount you wish to trade on ${toTitleCase(
          projectName
        )}.`}
      />
    );

  return (
    <>
      <HeaderResponse text={label} projectName={projectName} />
      <SingleLineResponse
        tokenSymbol={tokenInSymbol}
        tokenValueInUsd={100}
        amount={amount}
        amountValueInUsd={100}
      />
      <ListResponse
        title="Breakdown"
        data={[
          ['Maturity', data?.maturity_],
          ['Slippage', 'Some slippage %'],
        ]}
        collapsible
      />
      <ActionResponse label={label} approvalParams={approvalParams} txParams={txParams} />
    </>
  );
};

export default YieldProtocolLend;
