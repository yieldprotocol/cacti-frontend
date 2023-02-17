import { Button } from '@/components/Button';
import { useChatContext } from '@/contexts/ChatContext';

export const DebugPanel = ({ handleClose }) => {
  const { spoofBotMessage } = useChatContext();
  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Start ETH transfer */}
      <Button
        onClick={(e) => {
          handleClose();
          spoofBotMessage(
            `Sure, let me transfer that ETH. <|transfer("ETH", 0.01, "0x637C1Ec1d205a4E7a79c9CE4Bd100CD1d19E6080")|> Click the above button to make the transfer.`
          );
        }}
      >
        Suggest an ETH transfer
      </Button>
      <div className="flex flex-col justify-center text-xs">
        <p>{`<|transfer("ETH", 0.01, "0x637C1Ec1d205a4E7a79c9CE4Bd100CD1d19E6080")|>`}</p>
      </div>
      {/* Start WETH transfer */}
      <Button
        onClick={(e) => {
          handleClose();
          spoofBotMessage(
            `Sure, let me transfer that wETH. <|transfer("WETH", 0.01, "0x637C1Ec1d205a4E7a79c9CE4Bd100CD1d19E6080")|> Click the above button to make the transfer.`
          );
        }}
      >
        Suggest a WETH transfer
      </Button>
      <div className="flex flex-col justify-center text-xs">
        <p>{`<|transfer("WETH", 0.01, "0x637C1Ec1d205a4E7a79c9CE4Bd100CD1d19E6080")|>`}</p>
      </div>
      {/* Start WETH -> UNI swap */}
      <Button
        onClick={(e) => {
          handleClose();
          spoofBotMessage(
            `Sure, let me swap that WETH into UNI. <|uniswap("WETH", "UNI", "SELLAMOUNT", 0.01)|> Click the above button to make the swap.`
          );
        }}
      >
        Suggest a WETH to UNI token swap on Uniswap
      </Button>
      <div className="flex flex-col justify-center text-xs">
        <p>{`<|uniswap("WETH", "UNI", "SELLAMOUNT", 0.01)|>`}</p>
      </div>
      {/* Start ETH -> UNI swap */}
      <Button
        onClick={(e) => {
          handleClose();
          spoofBotMessage(
            `Sure, let me swap that ETH into UNI. <|uniswap("ETH", "UNI", "SELLAMOUNT", 0.01)|> Click the above button to make the swap.`
          );
        }}
      >
        Suggest a ETH to UNI token swap on Uniswap
      </Button>
      <div className="flex flex-col justify-center text-xs">
        <p>{`<|uniswap("ETH", "UNI", "SELLAMOUNT", 0.01)|>`}</p>
      </div>
      {/* Start NFT dog search */}
      <Button
        onClick={(e) => {
          handleClose();
          spoofBotMessage(`OK, dog NFTs! <|nftsearch("dogs")|>`);
        }}
      >
        Browse some dog NFTs
      </Button>
      <div className="flex flex-col justify-center text-xs">
        <p>{`<|nftsearch("dogs")|>`}</p>
      </div>
    </div>
  );
};
