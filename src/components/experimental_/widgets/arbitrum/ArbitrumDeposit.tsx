import { useEffect, useState } from 'react';
import { Erc20Bridger, getL2Network } from '@arbitrum/sdk';
import { BigNumber, UnsignedTransaction } from 'ethers';
import { useAccount, usePrepareContractWrite, useProvider } from 'wagmi';
import { ActionResponse, HeaderResponse } from '@/components/cactiComponents';
import useInput from '@/hooks/useInput';
import useToken from '@/hooks/useToken';
import Inbox from './abi/Inbox';

interface ArbitrumDepositETHProps {
  tokenSymbol: string;
  amtString: string;
}

// the proxy contract address, not the actual implementation address
const INBOX_CONTRACT_ADDRESS = '0x4Dbd4fc535Ac27206064B68FfCf827b0A60BAB3f';
const L2_CHAIN_ID = 42161;

const ArbitrumDeposit = ({ tokenSymbol, amtString }: ArbitrumDepositETHProps) => {
  const l1Provider = useProvider({ chainId: 1 });
  const l2Provider = useProvider({ chainId: L2_CHAIN_ID });
  const { data: token, isETH } = useToken(tokenSymbol.toUpperCase());
  const { address: account } = useAccount();
  const amount = useInput(amtString, token?.symbol!);

  const [erc20SendParams, setErc20SendParams] = useState<UnsignedTransaction>();

  const { data: depositEth } = usePrepareContractWrite({
    address: INBOX_CONTRACT_ADDRESS,
    abi: Inbox,
    functionName: 'depositEth',
    overrides: { value: amount?.value },
    enabled: isETH,
  });

  if (!token) <>token not supported</>;
  if (!amount?.value) <>amount specified is invalid</>;

  // handle erc20 (wip)
  useEffect(() => {
    (async () => {
      if (isETH) return;

      const arbitrumOne = await getL2Network(
        L2_CHAIN_ID /** <-- chain id of target Arbitrum chain */
      );

      const erc20Bridger = new Erc20Bridger(arbitrumOne);

      try {
        const req = await erc20Bridger.getDepositRequest({
          l1Provider,
          l2Provider,
          erc20L1Address: token?.address!,
          amount: amount?.value!,
          from: account!,
          retryableGasOverrides: {
            gasLimit: {
              min: BigNumber.from(100000000000),
            },
          },
        });

        setErc20SendParams(req.txRequest);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [account, amount?.value, isETH, l1Provider, l2Provider, token?.address]);

  const sendParams = isETH ? depositEth?.request : erc20SendParams;

  return (
    <>
      <HeaderResponse
        text={`Deposit ${amount?.formatted} ${tokenSymbol} to Arbitrum`}
        projectName="arbitrum"
      />
      <ActionResponse
        label={`Deposit ${amount?.formatted || ''} ${tokenSymbol} to Arbitrum`}
        txParams={undefined}
        approvalParams={undefined}
        sendParams={sendParams}
      />
    </>
  );
};

export default ArbitrumDeposit;
