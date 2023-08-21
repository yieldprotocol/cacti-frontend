import { Contract } from 'ethers';
import { Address } from 'wagmi';

export enum ContractNames {
  CAULDRON = 'Cauldron',
  LADLE = 'Ladle',
  WRAP_ETHER_MODULE = 'WrapEtherModule',
}

export type ContractMap = Map<ContractNames, Contract>;

interface ContractAddresses {
  addresses: Map<number, Map<ContractNames, Address>>;
}

const contractAddresses: ContractAddresses = {
  addresses: new Map([
    [
      1,
      new Map([
        [ContractNames.CAULDRON, '0xc88191F8cb8e6D4a668B047c1C8503432c3Ca867' as Address],
        [ContractNames.LADLE, '0x6cb18ff2a33e981d1e38a663ca056c0a5265066a' as Address],
        [ContractNames.WRAP_ETHER_MODULE, '0x22768fcafe7bb9f03e31cb49823d1ece30c0b8ea' as Address],
      ]),
    ],
    [
      42161,
      new Map([
        [ContractNames.CAULDRON, '0x23cc87FBEBDD67ccE167Fa9Ec6Ad3b7fE3892E30' as Address],
        [ContractNames.LADLE, '0x16e25cf364cecc305590128335b8f327975d0560' as Address],
        [ContractNames.WRAP_ETHER_MODULE, '0x4cd01ed221d6d198e2656c16c32803bf78134568' as Address],
      ]),
    ],
  ]),
};

export default contractAddresses;
