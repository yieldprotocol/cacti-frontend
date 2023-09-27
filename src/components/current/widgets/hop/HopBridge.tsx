import React, { useEffect, useState } from 'react';
import { Hop } from '@hop-protocol/sdk';
import { config } from '@hop-protocol/sdk/dist/src/config';
import { CanonicalToken, ChainSlug } from '@hop-protocol/sdk/dist/src/constants';
import { Interface, UnsignedTransaction } from 'ethers/lib/utils';
import { erc20ABI } from 'wagmi';
import {
  ActionResponse,
  ErrorResponse,
  HeaderResponse,
  SingleLineResponse,
} from '@/components/cactiComponents';
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
  const _fromChain = fromChain === 'ethereum-mainnet' ? 'mainnet' : fromChain.toLowerCase();
  const _toChain = toChain === 'ethereum-mainnet' ? 'mainnet' : toChain.toLowerCase();

  const signer = useSigner();
  const { data: tokenIn } = useToken(tokenSymbol);
  const input = useInput(inputString, tokenIn?.symbol!);
  const [approvalParams, setApprovalParams] = useState<ApprovalBasicParams>();
  const [sendParams, setSendParams] = useState<UnsignedTransaction>();
  const [error, setError] = useState<string | null>(null);

  // TODO simple check to see if the chain is potentially supported; not all chains with chain slugs are supported within hop though (i.e.: zksync is unsupported)
  const isSupportedChain = (name: string) =>
    name === 'mainnet' ||
    Object.keys(ChainSlug)
      .map((s) => s.toLowerCase())
      .includes(name.toLowerCase());

  const isSupportedToken = (symbol: string) =>
    Object.keys(CanonicalToken).includes(symbol.toUpperCase());

  useEffect(() => {
    (async () => {
      setError(null);

      if (!isSupportedChain(_fromChain)) {
        return setError(
          `Unsupported from chain. Available chains: ${Object.keys(ChainSlug).join(', ')}`
        );
      }

      if (!isSupportedChain(_toChain)) {
        return setError(
          `Unsupported to chain. Available chains: ${Object.keys(ChainSlug).join(', ')}`
        );
      }

      if (!isSupportedToken(tokenSymbol)) {
        return setError(
          `Unsupported token. Available tokens: ${Object.keys(CanonicalToken).join(', ')}`
        );
      }

      if (!input?.value) {
        setError('Please provide a value to bridge');
        return console.error('No value to bridge');
      }

      try {
        // mainnet is the network we use for all bridge operations
        const hop = new Hop('mainnet', signer);
        const bridge = hop.bridge(tokenSymbol);

        const needsApproval = await bridge.needsApproval(input.value, _fromChain);

        if (needsApproval) {
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

        const req = await bridge.populateSendTx(input.value, _fromChain, _toChain);
        setSendParams({ ...req, gasLimit: 10_000_000 }); // TODO figure out a better way to handle gas limits on forks
      } catch (e) {
        setError((e as Error).message);
        console.error(e);
      }
    })();
  }, [_fromChain, input?.value, _toChain, tokenIn?.address, tokenSymbol]); // TODO signer is causing infinite loop

  // find the chain id of the from chain using the hop sdk config
  // using the `fromSlug`(returns the Chain) property of Chain doesn't return the chain id, so using the below methodology instead
  const fromChainId = config.chains.mainnet[_fromChain].chainId as number | undefined;

  return (
    <>
      <HeaderResponse
        text={`Bridge ${tokenSymbol} from ${_fromChain} to ${_toChain} using Hop Protocol`}
        altUrl={`https://app.hop.exchange/`}
      />
      {error && (
        <ErrorResponse text={`An error occurred while preparing the transaction`} error={error} />
      )}
      <SingleLineResponse tokenSymbol={tokenSymbol} value={input?.formatted} />
      <ActionResponse
        label={`Bridge ${input?.formatted || ''} ${tokenSymbol} from ${_fromChain} to ${_toChain}`}
        approvalParams={approvalParams}
        txParams={undefined}
        sendParams={sendParams}
        chainId={fromChainId}
      />
    </>
  );
};

export default HopBridge;
