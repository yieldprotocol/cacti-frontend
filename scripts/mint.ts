import { config } from 'dotenv';
import { ethers } from 'ethers';

config();

const forkId = process.env.NEXT_PUBLIC_TENDERLY_FORK_ID;
const [, , address] = process.argv;
if (address === undefined || address.substring(0, 2) !== '0x')
  throw new Error('Usage: yarn mint <address>');
const forkRPC = `https://rpc.tenderly.co/fork/${forkId}`;

const provider = new ethers.providers.JsonRpcProvider(forkRPC);

const params = [
  [address],
  ethers.utils.parseEther('10').toHexString(), // hex encoded wei amount
];

const mint = async () => {
  await provider.send('tenderly_addBalance', params);
  console.log('mint ran');
};

mint();
