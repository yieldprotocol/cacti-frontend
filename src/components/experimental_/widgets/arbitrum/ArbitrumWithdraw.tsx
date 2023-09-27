import { useEffect, useMemo, useState } from 'react';
import { Erc20Bridger, getL1Network, getL2Network } from '@arbitrum/sdk';
import { BigNumber, UnsignedTransaction } from 'ethers';
import { useAccount, usePrepareContractWrite } from 'wagmi';
import { ActionResponse, HeaderResponse } from '@/components/cactiComponents';
import { ApprovalBasicParams } from '@/components/cactiComponents/hooks/useApproval';
import useInput from '@/hooks/useInput';
import useToken from '@/hooks/useToken';
import { L2_CHAIN_ID } from './ArbitrumDeposit';
import ArbSys from './abi/ArbSys';
import { unsignedTxToTxRequestBase, useEthersProvider } from '@/utils/ethersAdapter';

interface ArbitrumWithdrawProps {
  tokenSymbol: string;
  amtString: string;
}

const ARBSYS_CONTRACT_ADDRESS = '0x0000000000000000000000000000000000000064';

const ArbitrumWithdraw = ({ tokenSymbol, amtString }: ArbitrumWithdrawProps) => {
  const l1Provider = useEthersProvider({ chainId: 1 });
  const l2Provider = useEthersProvider({ chainId: L2_CHAIN_ID });
  const { data: token, isETH } = useToken(tokenSymbol);
  const amount = useInput(amtString, token?.symbol!);
  const { address: account } = useAccount();
  const [erc20ApprovalParams, setErc20ApprovalParams] = useState<ApprovalBasicParams>();
  const [erc20SendParams, setErc20SendParams] = useState<UnsignedTransaction>();

  const { data: withdrawEth } = usePrepareContractWrite({
    address: ARBSYS_CONTRACT_ADDRESS,
    abi: ArbSys,
    functionName: 'withdrawEth',
    args: [account!],
    value: amount?.value,
  });

  // handle erc20 withdraw
  useEffect(() => {
    (async () => {
      if (isETH) return;
      if (!token?.address) return;
      if (!amount?.value) return;
      if (!account) return;

      const arbitrumOne = await getL2Network(L2_CHAIN_ID /** <-- chain id of Arbitrum chain */);

      const erc20Bridger = new Erc20Bridger(arbitrumOne);

      try {
        const req = await erc20Bridger.getWithdrawalRequest({
          erc20l1Address: token.address,
          amount: BigNumber.from(amount.value),
          destinationAddress: account,
          from: account,
        });

        setErc20SendParams(req.txRequest);
      } catch (e) {
        console.error(e);
        console.error('Error initiating transaction');
      }
    })();
  }, [account, amount?.value, isETH, token?.address]);

  if (!token) <>token not supported</>;
  if (!amount?.value) <>amount specified is invalid</>;

  const sendParams = useMemo(
    () => (isETH ? withdrawEth?.request : erc20SendParams),
    [erc20SendParams, isETH, withdrawEth?.request]
  );

  return (
    <>
      <HeaderResponse
        text={`Withdraw ${amount?.formatted} ${tokenSymbol} from Arbitrum`}
        projectName="arbitrum"
      />
      <ActionResponse
        label={`Withdraw ${amount?.formatted} ${tokenSymbol} from Arbitrum`}
        txParams={undefined}
        approvalParams={undefined}
        sendParams={ unsignedTxToTxRequestBase(sendParams as UnsignedTransaction, account!) }
      />
    </>
  );
};

export default ArbitrumWithdraw;
