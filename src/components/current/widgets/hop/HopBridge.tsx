import React, { useEffect, useState } from 'react';
import { Hop } from '@hop-protocol/sdk';
import { Interface, UnsignedTransaction } from 'ethers/lib/utils';
import { erc20ABI } from 'wagmi';
import {
  ActionResponse,
  HeaderResponse,
  IconResponse,
  SingleLineResponse,
} from '@/components/cactiComponents';
import { ResponseRow } from '@/components/cactiComponents/helpers/layout';
import { ApprovalBasicParams } from '@/components/cactiComponents/hooks/useApproval';
import useInput from '@/hooks/useInput';
import useSigner from '@/hooks/useSigner';
import useToken from '@/hooks/useToken';

interface HopBridgeProps {
  inputString: string;
  tokenSymbol: string;
  fromChain: string;
  toChain: string;
}

const HopBridge = ({ inputString, tokenSymbol, toChain, fromChain }: HopBridgeProps) => {
  const _fromChain = fromChain === 'ethereum-mainnet' ? 'mainnet' : fromChain;
  const signer = useSigner();
  const { data: tokenIn } = useToken(tokenSymbol);
  const input = useInput(inputString, tokenIn?.symbol!);
  const [approvalParams, setApprovalParams] = useState<ApprovalBasicParams>();
  const [sendParams, setSendParams] = useState<UnsignedTransaction>();

  useEffect(() => {
    (async () => {
      if (!input?.value) return console.error('No value to bridge');

      try {
        const hop = new Hop(_fromChain, signer);
        const bridge = hop.bridge(tokenSymbol);

        const needsApproval = await bridge.needsApproval(input.value, _fromChain);
        if (needsApproval) {
          // TODO wip

          const { data } = await bridge.populateSendApprovalTx(input.value, _fromChain);

          const erc20Interface = new Interface(erc20ABI);

          const parsed = erc20Interface.parseTransaction({ data });
          const spender = parsed.args[0];

          setApprovalParams({
            approvalAmount: input.value,
            tokenAddress: tokenIn?.address!,
            spender,
          });
        }

        // TODO get the relevant to chain from hop
        const req = await bridge.populateSendTx(input?.value, _fromChain, toChain);
        setSendParams({ ...req, gasLimit: 10_000_000 }); // TODO figure out a better way to handle gas limits on forks
      } catch (e) {
        console.error('An error occurred:', e);
      }
    })();
  }, [_fromChain, input?.value, toChain, tokenIn?.address, tokenSymbol]); // TODO signer is causing infinite loop

  return (
    <>
      <HeaderResponse text={`Bridge ${tokenSymbol} using Hop Protocol`} />
      <SingleLineResponse tokenSymbol={tokenSymbol} value={input?.formatted} />
      <ActionResponse
        label={`Bridge ${input?.formatted || ''} ${tokenSymbol} from ${_fromChain} to ${toChain}`}
        approvalParams={approvalParams}
        txParams={undefined}
        sendParams={sendParams}
      />
    </>
  );
};

export default HopBridge;
