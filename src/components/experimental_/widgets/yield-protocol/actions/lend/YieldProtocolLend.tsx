import { useEffect, useState } from 'react';
import { Address, useAccount } from 'wagmi';
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

// Yield Protocol specific ladle addresses based on chain id
const YIELD_PROTOCOL_LADLES: { [chainId: number]: Address } = {
  1: '0x6cb18ff2a33e981d1e38a663ca056c0a5265066a',
  42161: '0x16e25cf364cecc305590128335b8f327975d0560',
};

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
  const ladle = contractAddresses.addresses.get(chainId)?.get(ContractNames.LADLE);
  const approvalParams: ApprovalBasicParams = {
    address: tokenIn?.address!,
    spender: ladle!,
    amount,
  }; // TODO handle no token or ladle addresses more gracefully

  const [txParams, setTxParams] = useState<TxBasicParams>();

  // arbitrary protocol operation data
  interface YieldLendRes {
    maturity_: string; // formatted maturity date
  }
  const [data, setData] = useState<YieldLendRes>();

  // set tx params (specific to yield protocol)
  useEffect(() => {
    (async () => {
      const baseAddress = tokenIn?.address as Address | undefined;
      if (!baseAddress) return;
      const seriesEntities = SERIES_ENTITIES.get(chainId);
      if (!seriesEntities) return;

      const relevantSeriesEntities = Array.from(seriesEntities.values());

      const seriesEntity = relevantSeriesEntities.find(
        (s) => s.baseAddress.toLowerCase() === baseAddress.toLowerCase()
      ); // Find the first relevant series using base address (TODO not kosher)

      const poolAddress = seriesEntity?.poolAddress;
      if (!poolAddress) return;

      const lendCallData = lend(address, amount, baseAddress, poolAddress, tokenInIsETH);

      setTxParams(lendCallData ? await getTxParams(lendCallData, ladle) : undefined);
      setData({ maturity_: `${nameFromMaturity(seriesEntity.maturity, 'MMM yyyy')}` });
    })();
  }, []);
  /***************INPUTS******************************************/

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
