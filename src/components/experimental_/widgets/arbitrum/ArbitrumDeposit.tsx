import { usePrepareContractWrite } from 'wagmi';
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

const ArbitrumDeposit = ({ tokenSymbol, amtString }: ArbitrumDepositETHProps) => {
  const { data: token, isETH } = useToken(tokenSymbol);
  const amount = useInput(amtString, token?.symbol!);

  const { data: depositEth } = usePrepareContractWrite({
    address: INBOX_CONTRACT_ADDRESS,
    abi: Inbox,
    functionName: 'depositEth',
    overrides: { value: amount?.value },
  });

  if (!token) <>token not supported</>;
  if (!amount?.value) <>amount specified is invalid</>;

  const sendParams = isETH && depositEth ? depositEth.request : undefined;

  return (
    <>
      <HeaderResponse
        text={`Deposit ${amount?.formatted} ETH to Arbitrum`}
        projectName="arbitrum"
      />
      <ActionResponse
        label={`Deposit ${amount?.formatted || ''} ETH to Arbitrum`}
        txParams={undefined}
        approvalParams={undefined}
        sendParams={sendParams}
      />
    </>
  );
};

export default ArbitrumDeposit;
