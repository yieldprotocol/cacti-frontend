import Image from 'next/image';
import { useNetwork } from 'wagmi';
import Skeleton from '@/components/SkeletonWrap';
import useToken from '@/hooks/useToken';

const SwapItem = ({
  tokenSymbol,
  amount,
  amountUSD,
  priceUSD,
}: {
  tokenSymbol: string;
  amount?: string;
  amountUSD?: string;
  priceUSD?: string;
}) => {
  const { chain } = useNetwork();
  const { data: token } = useToken(tokenSymbol);
  return (
    <div className="flex w-full justify-center rounded-sm bg-gray-700 shadow-lg">
      <div className="flex flex-1 gap-2 rounded-l-sm border border-gray-200/25 p-3.5">
        <div className="my-auto flex-none rounded-full bg-gray-200/70 p-[1px] shadow-sm">
          <Image
            src={
              `https://storage.googleapis.com/zapper-fi-assets/tokens/${
                chain?.name.toLowerCase() === 'mainnet fork' ? 'ethereum' : chain?.name
              }/${token?.address.toLowerCase()}.png` ||
              'https://storage.googleapis.com/zapper-fi-assets/tokens/ethereum/0x0000000000000000000000000000000000000000.png'
            }
            alt={tokenSymbol}
            width={30}
            height={30}
          />
        </div>
        <div className="my-auto flex w-full flex-col justify-end text-left">
          <span className="text-xl md:text-3xl">{token?.symbol}</span>
          <div className="flex gap-1 text-sm font-light text-gray-300">
            <span>$</span>
            <span className="flex">{priceUSD || <Skeleton width={50} />}</span>
          </div>
        </div>
      </div>
      <div className="my-auto flex flex-1 justify-end gap-4 rounded-r-sm border border-gray-200/25 bg-gray-900/50 p-3.5">
        <div className="flex w-full flex-col p-1 text-right">
          <span className="text-3xl">{amount || <Skeleton />}</span>
          <span className="flex justify-end gap-1 text-sm font-light text-gray-300">
            <span>$</span>
            <span>{amountUSD || <Skeleton width={50} />}</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default SwapItem;
