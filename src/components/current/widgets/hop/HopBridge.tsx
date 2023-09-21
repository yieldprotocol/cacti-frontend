import React, { useEffect, useState } from 'react';
import { Hop } from '@hop-protocol/sdk';
import { TransactionRequestBase, decodeFunctionData } from 'viem';
import { erc20ABI, usePublicClient } from 'wagmi';
import { ActionResponse, HeaderResponse, SingleLineResponse } from '@/components/cactiComponents';
import { ApprovalBasicParams } from '@/components/cactiComponents/hooks/useApproval';
import useInput from '@/hooks/useInput';
import useToken from '@/hooks/useToken';

interface HopBridgeProps {
  inputString: string;
  tokenSymbol: string;
  fromChain: string;
  toChain: string;
}

const HopBridge = ({ inputString, tokenSymbol, toChain, fromChain }: HopBridgeProps) => {
  const _fromChain = fromChain === 'ethereum-mainnet' ? 'mainnet' : fromChain;
  const publicClient = usePublicClient();
  const { data: tokenIn } = useToken(tokenSymbol);
  const input = useInput(inputString, tokenIn?.symbol!);
  const [approvalParams, setApprovalParams] = useState<ApprovalBasicParams>();
  const [sendParams, setSendParams] = useState<TransactionRequestBase>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    (async () => {
      if (!input?.value) return console.error('No value to bridge');

      try {
        const hop = new Hop(_fromChain, publicClient as any); // TODO fix this
        const bridge = hop.bridge(tokenSymbol);

        const needsApproval = await bridge.needsApproval(input.value, _fromChain);
        if (needsApproval) {
          const { data } = await bridge.populateSendApprovalTx(input.value, _fromChain);
          const { args } = decodeFunctionData({ abi: erc20ABI, data });
          const spender = args?.[0]!;

          setApprovalParams({
            approvalAmount: input.value,
            tokenAddress: tokenIn?.address!,
            spender,
          });
        }

        // TODO get the relevant to chain from hop
        const req = await bridge.populateSendTx(input?.value, _fromChain, toChain);
        setSendParams({ ...req, gas: 10_000_000 }); // TODO figure out a better way to handle gas limits on forks
      } catch (e) {
        setError(e as string);
        console.error('An error occurred:', e);
      }
    })();
  }, [_fromChain, input?.value, toChain, tokenIn?.address, tokenSymbol]); // TODO signer is causing infinite loop

  return (
    <>
      <HeaderResponse
        text={`Bridge ${tokenSymbol} from ${_fromChain} to ${toChain} using Hop Protocol`}
      />
      <SingleLineResponse tokenSymbol={tokenSymbol} value={input?.formatted} />
      <ActionResponse
        label={
          error ??
          `Bridge ${input?.formatted || ''} ${tokenSymbol} from ${_fromChain} to ${toChain}`
        }
        approvalParams={approvalParams}
        txParams={undefined}
        sendParams={sendParams}
        disabled={!!error}
      />
    </>
  );
};

export default HopBridge;
