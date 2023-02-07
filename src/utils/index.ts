import { utils } from 'ethers';

export const shortenAddress = (address: string) => address.slice(0, 6) + '...' + address.slice(-4);
export const formatToEther = (amount: string) => utils.formatEther(amount);
export const formatToWei = (amount: string) => utils.parseEther(amount).toString();
