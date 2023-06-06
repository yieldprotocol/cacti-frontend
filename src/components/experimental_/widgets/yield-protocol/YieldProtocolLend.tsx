////////////////DON'T TOUCH//////////////////////////////////////
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import {
  ActionResponse,
  DoubleLineResponse,
  HeaderResponse,
  IconResponse,
  ListResponse,
  TextResponse,
} from '@/components/cactiComponents';
import { ResponseRow } from '@/components/cactiComponents/helpers/layout';
import { ApprovalBasicParams } from '@/components/cactiComponents/hooks/useApproval';
import { TxBasicParams } from '@/components/cactiComponents/hooks/useSubmitTx';
////////////////DON'T TOUCH//////////////////////////////////////
// Custom imports
import useChainId from '@/hooks/useChainId';
import useInput from '@/hooks/useInput';
import useToken from '@/hooks/useToken';
import { toTitleCase } from '@/utils';
import { SERIES_ENTITIES } from './config/seriesEntities';
import { getTxParams } from './helpers';
import lend from './lendHelpers';

// Yield Protocol specific ladle addresses based on chain id
const YIELD_PROTOCOL_LADLES: { [chainId: number]: `0x${string}` } = {
  1: '0x6cb18ff2a33e981d1e38a663ca056c0a5265066a',
  42161: '0x16e25cf364cecc305590128335b8f327975d0560',
};

// should be generalized and only needed as reference once for all components
interface InputProps {
  tokenInSymbol: string;
  tokenOutSymbol: string;
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
  ////////////////DON'T TOUCH//////////////////////////////////////
  // generic weird input handling; can be abstracted out
  if (inputAmount === '*' || inputAmount === '{amount}')
    return (
      <TextResponse
        text={`Please edit your query with an amount you wish to trade on ${toTitleCase(
          projectName
        )}.`}
      />
    );
  if (!tokenOutSymbol)
    return <TextResponse text={`Please enter a valid token to trade on ${toTitleCase}`} />;

  /* generic hook usage (not to be touched when creating from example) */
  const chainId = useChainId();
  const { address } = useAccount();
  const { data: tokenIn, isETH: tokenInIsETH } = useToken(tokenInSymbol);
  const { data: tokenOut, isETH: tokenOutIsETH } = useToken(tokenOutSymbol);
  const label = `
        ${toTitleCase(action)} ${inputAmount} ${tokenInSymbol} on ${toTitleCase(projectName)}`;
  const amount = useInput(inputAmount, tokenInSymbol);
  if (!amount) {
    console.error('amount is undefined');
    return null;
  }
  ////////////////DON'T TOUCH//////////////////////////////////////

  /***************INPUTS******************************************/
  // Yield Protocol specific spender handling
  const ladle = YIELD_PROTOCOL_LADLES[chainId];
  const approvalParams: ApprovalBasicParams = { address: address!, spender: ladle, amount }; // TODO handle no account address more gracefully

  const [txParams, setTxParams] = useState<TxBasicParams>();

  // set tx params
  useEffect(() => {
    (async () => {
      const baseAddress = tokenIn?.address as `0x${string}`;
      if (!baseAddress) return;
      const seriesEntities = SERIES_ENTITIES.get(chainId);
      if (!seriesEntities) return;

      const relevantSeriesEntities = Array.from(seriesEntities.values());

      const poolAddress = relevantSeriesEntities.find((s) => s.baseAddress === baseAddress)
        ?.poolAddress as `0x${string}` | undefined; // Find the first relevant series using base address (TODO not kosher)
      if (!poolAddress) return;

      const lendCallData = lend(address, amount, baseAddress, poolAddress, tokenInIsETH);
      setTxParams(lendCallData ? await getTxParams(lendCallData, ladle) : undefined);
    })();
  }, []);

  /***************INPUTS******************************************/

  return (
    <>
      <HeaderResponse text={label} projectName={projectName} />
      <ResponseRow>
        <DoubleLineResponse
          tokenSymbol={tokenInSymbol}
          tokenValueInUsd={100}
          amount={amount}
          amountValueInUsd={100}
        />
        <IconResponse icon="forward" />
        <DoubleLineResponse
          tokenSymbol={tokenOutSymbol}
          tokenValueInUsd={100}
          amount={100}
          amountValueInUsd={100}
        />
      </ResponseRow>
      <ListResponse
        title="Breakdown"
        data={[
          ['Maturity', 'Some maturity'],
          ['Slippage', 'Some slippage %'],
        ]}
        collapsible
      />
      <ActionResponse label={label} approvalParams={approvalParams} txParams={txParams} />
    </>
  );
};

export default YieldProtocolLend;
