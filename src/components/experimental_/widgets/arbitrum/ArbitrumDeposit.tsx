import { useEffect, useMemo, useState } from 'react';
import { Erc20Bridger, getL2Network } from '@arbitrum/sdk';
import { BigNumber, UnsignedTransaction } from 'ethers';
import { Interface } from 'ethers/lib/utils.js';
import { erc20ABI, useAccount, usePrepareContractWrite} from 'wagmi';
import { ActionResponse, HeaderResponse } from '@/components/cactiComponents';
import { ApprovalBasicParams } from '@/components/cactiComponents/hooks/useApproval';
import useInput from '@/hooks/useInput';
import useToken from '@/hooks/useToken';
import Inbox from './abi/Inbox';
import { unsignedTxToTxRequestBase, useEthersProvider } from '@/utils/ethersAdapter';

interface ArbitrumDepositETHProps {
  tokenSymbol: string;
  amtString: string;
}

// the proxy contract address, not the actual implementation address
const INBOX_CONTRACT_ADDRESS = '0x4Dbd4fc535Ac27206064B68FfCf827b0A60BAB3f';
export const L2_CHAIN_ID = 42161;

const ArbitrumDeposit = ({ tokenSymbol, amtString }: ArbitrumDepositETHProps) => {
  const l1Provider = useEthersProvider({ chainId: 1 });
  const l2Provider = useEthersProvider({ chainId: L2_CHAIN_ID });

  const { data: token, isETH } = useToken(tokenSymbol.toUpperCase());
  const { address: account } = useAccount();
  const amount = useInput(amtString, token?.symbol!);

  const [erc20ApprovalParams, setErc20ApprovalParams] = useState<ApprovalBasicParams>();
  const [erc20SendParams, setErc20SendParams] = useState<UnsignedTransaction>();
  const [error, setError] = useState('');

  const { data: depositEth } = usePrepareContractWrite({
    address: INBOX_CONTRACT_ADDRESS,
    abi: Inbox,
    functionName: 'depositEth',
    value: amount?.value,
    enabled: isETH,
  });

  // handle erc20 (wip)
  useEffect(() => {
    (async () => {
      if (isETH) return;
      if (!l1Provider) return setError('No L1 provider detected');
      if (!l2Provider) return setError('No L2 provider detected');
      if (!token?.address) return setError('No token address detected');
      if (!amount?.value) return setError('No amount detected');
      if (!account) return setError('No account detected');

      const arbitrumOne = await getL2Network(
        L2_CHAIN_ID /** <-- chain id of target Arbitrum chain */
      );

      const erc20Bridger = new Erc20Bridger(arbitrumOne);

      // get approval params
      try {
        const { data } = await erc20Bridger.getApproveTokenRequest({
          l1Provider,
          erc20L1Address: token.address,
          amount: BigNumber.from(amount.value),
        });

        // get the spender address
        const iface = new Interface(erc20ABI);
        const parsed = iface.parseTransaction({ data: data.toString() });
        const spender = parsed.args[0];

        setErc20ApprovalParams({
          approvalAmount: amount.value,
          tokenAddress: token.address,
          spender,
          skipApproval: false,
        });
      } catch (error) {
        console.error(error);
        setError('There was an error initiating the transaction');
      }

      try {
        // get the send params
        const req = await erc20Bridger.getDepositRequest({
          l1Provider,
          l2Provider,
          erc20L1Address: token.address,
          amount: BigNumber.from(amount.value),
          from: account,
        });

        setErc20SendParams(req.txRequest);
      } catch (error) {
        console.error(error);
        setError('There was an error initiating the transaction');
      }
    })();
  }, [account, amount?.value, isETH, l1Provider, l2Provider, token?.address]);

  const sendParams = useMemo(
    () => (isETH ? depositEth?.request : erc20SendParams),
    [depositEth?.request, erc20SendParams, isETH]
  );

  return (
    <>
      <HeaderResponse
        text={`Deposit ${amount?.formatted} ${tokenSymbol} to Arbitrum`}
        projectName="arbitrum"
      />
      <ActionResponse
        label={`Deposit ${amount?.formatted || ''} ${tokenSymbol} to Arbitrum`}
        txParams={undefined}
        approvalParams={erc20ApprovalParams}
        sendParams={ unsignedTxToTxRequestBase(sendParams as UnsignedTransaction, account!) }
      />
    </>
  );
};

export default ArbitrumDeposit;
