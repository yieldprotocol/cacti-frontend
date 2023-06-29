import { useEffect, useMemo, useState } from 'react';
import { UnsignedTransaction } from 'ethers';
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
import useYieldProtocol from '../../hooks/useYieldProtocol';
import { nameFromMaturity } from '../../utils';

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
  const { address: account } = useAccount();
  const { lend } = useYieldProtocol();
  const { data: tokenIn, isETH: tokenInIsETH } = useToken(tokenInSymbol);
  const { data: tokenInToUse } = useToken(tokenInIsETH ? 'WETH' : tokenInSymbol);
  const label = `
        ${toTitleCase(action)} ${inputAmount} ${tokenInSymbol} on ${toTitleCase(projectName)}`;
  const { value: amount } = useInput(inputAmount, tokenInSymbol);

  /***************INPUTS******************************************/
  // Yield Protocol specific spender handling
  const ladle = contractAddresses.addresses.get(chainId)?.get(ContractNames.LADLE);

  const approvalParams = useMemo((): ApprovalBasicParams | undefined => {
    if (!tokenIn || !amount || !ladle) return undefined;

    return {
      tokenAddress: tokenIn.address,
      spender: ladle,
      approvalAmount: amount,
    };
  }, [amount, ladle, tokenIn]);

  const [sendParams, setSendParams] = useState<UnsignedTransaction>();
  const [data, setData] = useState<YieldLendRes>();

  // set tx params (specific to yield protocol)
  useEffect(() => {
    (async () => {
      if (!tokenInToUse) return console.error('tokenInToUse is undefined');
      if (!amount) return console.error('amount is undefined');

      const baseAddress = tokenInToUse.address;
      const seriesEntities = SERIES_ENTITIES.get(chainId);
      if (!seriesEntities) return console.error('seriesEntities is undefined');

      const relevantSeriesEntities = Array.from(seriesEntities.values());

      const seriesEntity = relevantSeriesEntities.find(
        (s) => s.baseAddress.toLowerCase() === baseAddress.toLowerCase()
      ); // Find the first relevant series using base address (TODO not kosher)

      const poolAddress = seriesEntity?.poolAddress;
      if (!poolAddress) return console.error('poolAddress is undefined');

      const sendParams = await lend({
        account,
        input: amount,
        baseAddress,
        poolAddress,
        isEthBase: tokenInIsETH,
      });
      console.log('🦄 ~ file: YieldProtocolLend.tsx:97 ~ sendParams:', sendParams);

      setSendParams(sendParams?.request);
      setData({ maturity_: `${nameFromMaturity(seriesEntity.maturity, 'MMM yyyy')}` });
    })();
  }, [account, amount, chainId, lend, tokenInIsETH, tokenInToUse]);
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
        tokenValueInUsd={100} // TODO handle actual
        amount={amount}
        amountValueInUsd={100} // TODO handle actual
      />
      <ListResponse
        title="Breakdown"
        data={[
          ['Maturity', data?.maturity_],
          ['Slippage', 'Some slippage %'],
        ]}
        collapsible
      />
      <ActionResponse
        label={label}
        approvalParams={approvalParams}
        sendParams={sendParams}
        txParams={undefined}
      />
    </>
  );
};

export default YieldProtocolLend;
