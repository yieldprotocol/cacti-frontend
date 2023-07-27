import { useAccount, usePrepareContractWrite } from 'wagmi';
import { ActionResponse, HeaderResponse } from '@/components/cactiComponents';
import useInput from '@/hooks/useInput';
import useToken from '@/hooks/useToken';
import ArbSys from './abi/ArbSys';

interface ArbitrumWithdrawProps {
  tokenSymbol: string;
  amtString: string;
}

const ARBSYS_CONTRACT_ADDRESS = '0x0000000000000000000000000000000000000064';

const ArbitrumWithdraw = ({ tokenSymbol, amtString }: ArbitrumWithdrawProps) => {
  const { data: token, isETH } = useToken(tokenSymbol);
  const amount = useInput(amtString, token?.symbol!);
  const { address: account } = useAccount();

  const { data: withdrawEth } = usePrepareContractWrite({
    address: ARBSYS_CONTRACT_ADDRESS,
    abi: ArbSys,
    functionName: 'withdrawEth',
    args: [account!],
    overrides: { value: amount?.value },
  });

  if (!token) <>token not supported</>;
  if (!amount?.value) <>amount specified is invalid</>;

  const sendParams = isETH && withdrawEth ? withdrawEth.request : undefined;

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
        sendParams={sendParams}
      />
    </>
  );
};

export default ArbitrumWithdraw;
