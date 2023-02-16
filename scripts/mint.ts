import { config } from 'dotenv';
import { ethers } from 'ethers';

config();

const forkId = process.env.NEXT_PUBLIC_TENDERLY_FORK_ID;
const forkRPC = `https://rpc.tenderly.co/fork/${forkId}`;

const provider = new ethers.providers.JsonRpcProvider(forkRPC);
const signer = provider.getSigner();

const params = [
  ['0x637C1Ec1d205a4E7a79c9CE4Bd100CD1d19E6080'],
  ethers.utils.parseEther('10').toHexString(), // hex encoded wei amount
];

const mint = async () => {
  await provider.send('tenderly_addBalance', params);
  console.log('mint ran');
};

mint();
