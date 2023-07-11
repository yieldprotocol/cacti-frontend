import { AddressZero } from '@ethersproject/constants';
import { parseUnits } from 'ethers/lib/utils.js';
import { erc20ABI, useAccount, useEnsAddress } from 'wagmi';
import wethAbi from '@/abi/weth.json';
import { ActionResponse, HeaderResponse } from '@/components/cactiComponents';
import { SEND_ETH_FNNAME, TxBasicParams } from '@/components/cactiComponents/hooks/useSubmitTx';
import useToken from '@/hooks/useToken';
import { ConnectFirst } from '../helpers/ConnectFirst';

// interface TransferWidgetProps {
//   tokenSymbol: string;
//   amtString: string;
//   receiver: string;
// }

const WrapEth = ({ amtString }: any) => {
  const amount = parseUnits(amtString, 18);

  /* tx parameters to transfer ETH */
  const tx: TxBasicParams = {
    address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', //weth addrss
    abi: wethAbi, // weth abi
    functionName: 'deposit', //wrapEth
    args: [],
    overrides: { value: amount },
  };

  /* TODO Transfer NFT */
  /* TODO Transfer ERC721 */

  return (
    <ConnectFirst>
      <HeaderResponse text={`Wrap ${amtString} Ether ***`} projectName="weth" />
      <ActionResponse
        label={`Wrap ${amtString || ''} ETH`}
        txParams={tx}
        approvalParams={undefined}
        sendParams={undefined}
      />
    </ConnectFirst>
  );
};

export default WrapEth;
