import { useState } from 'react';
import { Button } from '@/components/Button';
import { useChatContext } from '@/contexts/ChatContext';
import { shortenAddress } from '@/utils';

const CUSTOM_PROMPT = 'Custom Prompt';

export const DebugPanel = ({ handleClose }) => {
  const { spoofBotMessage } = useChatContext();
  const [customMessage, setCustomMessage] = useState<string>('');

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

        <div className="flex flex-col justify-center break-words font-mono text-xs">
          {spoofLabel === CUSTOM_PROMPT ? (
            <input
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
              id="customPrompt"
              type="text"
              placeholder="Prompt"
            ></input>
          ) : (
            <span>{spoofText.match(regex)}</span>
          )}
        </div>
      </>
    );
  };

  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {debugMessage(CUSTOM_PROMPT, customMessage)}
      <div />
      <div />
      {spoofPrompts.map((spoof) => {
        return debugMessage(spoof[0], spoof[1]);
      })}
    </div>
  );
};

const spoofPrompts: [string, string][] = [
  [
    'Suggest an ETH transfer',
    `Sure, let me transfer that ETH. <|transfer("ETH", 0.01, "0x637C1Ec1d205a4E7a79c9CE4Bd100CD1d19E6080")|> Click the above button to make the transfer.`,
  ],
  [
    'Suggest a DAI transfer',
    'Sure, let me transfer that DAI. <|transfer("DAI", 0.01, "0x637C1Ec1d205a4E7a79c9CE4Bd100CD1d19E6080")|> Click the above button to make the transfer.',
  ],
  [
    'Suggest a DAI to UNI token swap on Uniswap',
    `Sure, let me swap that DAI into UNI. <|uniswap("DAI", "UNI", "SELLAMOUNT", 0.01)|> Click the above button to make the swap.`,
  ],
  [
    'Suggest a ETH to DAI token swap on Uniswap',
    'Sure, let me swap that ETH into DAI. <|uniswap("ETH", "DAI", "SELLAMOUNT", 0.01)|> Click the above button to make the swap.',
  ],
  ['Browse some dog NFTs', '<|nftsearch("dogs")|>'],
  ['Get price of ETH in USDC', '<|price("ETH", "USDC")|>'],
  [
    `Get traits for NFT ${shortenAddress('0x23581767a106ae21c074b2276d25e5c3e136a68b')}:8566`,
    '<|nfttraits("0x23581767a106ae21c074b2276d25e5c3e136a68b", "8566")|>',
  ],
  [
    `Get traits for NFT collection ${shortenAddress(
      '0x23581767a106ae21c074b2276d25e5c3e136a68b'
    )}:5869`,
    '<|nftcollectiontraits("0x23581767a106ae21c074b2276d25e5c3e136a68b")|>',
  ],
  [
    `Get traits for NFT collection ${shortenAddress('0x23581767a106ae21c074b2276d25e5c3e136a68b')}`,
    '<|nftsbytraits("0x23581767a106ae21c074b2276d25e5c3e136a68b", "Headwear", "Moon Hat")|>',
  ],
];
