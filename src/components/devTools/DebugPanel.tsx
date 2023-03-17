import { Button } from '@/components/Button';
import { useChatContext } from '@/contexts/ChatContext';
import { shortenAddress } from '@/utils';

const spoofPrompts : [string,string][] = [
  ['Suggest an ETH transfer', `Sure, let me transfer that ETH. <|transfer("ETH", 0.01, "0x637C1Ec1d205a4E7a79c9CE4Bd100CD1d19E6080")|> Click the above button to make the transfer.`],
  ['Suggest a DAI transfer', 'Sure, let me transfer that DAI. <|transfer("DAI", 0.01, "0x637C1Ec1d205a4E7a79c9CE4Bd100CD1d19E6080")|> Click the above button to make the transfer.' ],
  ['Suggest a DAI to UNI token swap on Uniswap', `Sure, let me swap that DAI into UNI. <|uniswap("DAI", "UNI", "SELLAMOUNT", 0.01)|> Click the above button to make the swap.` ],
  ['Suggest a ETH to DAI token swap on Uniswap', 'Sure, let me swap that ETH into DAI. <|uniswap("ETH", "DAI", "SELLAMOUNT", 0.01)|> Click the above button to make the swap.' ],
  ['Browse some dog NFTs', '<|nftsearch("dogs")|>'],
  ['Get price of ETH in USDC', '<|price("ETH", "USDC")|>'],
  [`Get traits for NFT ${shortenAddress('0x23581767a106ae21c074b2276d25e5c3e136a68b')}:8566`, '<|nfttraits("0x23581767a106ae21c074b2276d25e5c3e136a68b", "8566")|>' ],
  [`Get traits for NFT collection ${shortenAddress('0x23581767a106ae21c074b2276d25e5c3e136a68b')}:5869` , '<|nftcollectiontraits("0x23581767a106ae21c074b2276d25e5c3e136a68b")|>'],
  [`Get traits for NFT collection ${shortenAddress('0x23581767a106ae21c074b2276d25e5c3e136a68b')}`, '<|nftsbytraits("0x23581767a106ae21c074b2276d25e5c3e136a68b", "Headwear", "Moon Hat")|>' ], 
]

export const DebugPanel = ({ handleClose }) => {
  const { spoofBotMessage } = useChatContext();

  const debugMessage = (spoofLabel: string, spoofText: string) => {
    const regex = new RegExp(/<\|([\w\-]*)\(([^\n]*)\)\|>/g);
    return (
      <>
        <Button
          onClick={(e) => {
            e.preventDefault();
            handleClose();
            spoofBotMessage(spoofText);
          }}
        >
          {spoofLabel}
        </Button>

        <div className="flex flex-col justify-center break-words text-xs font-mono">
          <span>{spoofText.match(regex)}</span>
        </div>
      </>
    );
  };

  return (
    <div className="grid grid-cols-2 gap-4 p-4">

      {spoofPrompts.map((spoof) => {
        return debugMessage(spoof[0], spoof[1]);
      })}
    
    </div> 
  );
};
