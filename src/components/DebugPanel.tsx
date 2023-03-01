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
      <div className="flex flex-col justify-center break-words text-xs">
        <p>{`<|transfer("ETH", 0.01, "0x637C1Ec1d205a4E7a79c9CE4Bd100CD1d19E6080")|>`}</p>
      </div>
      {/* Start DAI transfer */}
      <Button
        onClick={(e) => {
          handleClose();
          spoofBotMessage(
            `Sure, let me transfer that DAI. <|transfer("DAI", 0.01, "0x637C1Ec1d205a4E7a79c9CE4Bd100CD1d19E6080")|> Click the above button to make the transfer.`
          );
        }}
      >
        Suggest a DAI transfer
      </Button>
      <div className="flex flex-col justify-center break-words text-xs">
        <p>{`<|transfer("DAI", 0.01, "0x637C1Ec1d205a4E7a79c9CE4Bd100CD1d19E6080")|>`}</p>
      </div>
      {/* Start DAI -> UNI swap */}
      <Button
        onClick={(e) => {
          handleClose();
          spoofBotMessage(
            `Sure, let me swap that DAI into UNI. <|uniswap("DAI", "UNI", "SELLAMOUNT", 0.01)|> Click the above button to make the swap.`
          );
        }}
      >
        Suggest a DAI to UNI token swap on Uniswap
      </Button>
      <div className="flex flex-col justify-center break-words text-xs">
        <p>{`<|uniswap("DAI", "UNI", "SELLAMOUNT", 0.01)|>`}</p>
      </div>
      {/* Start ETH -> DAI swap */}
      <Button
        onClick={(e) => {
          handleClose();
          spoofBotMessage(
            `Sure, let me swap that ETH into DAI. <|uniswap("ETH", "DAI", "SELLAMOUNT", 0.01)|> Click the above button to make the swap.`
          );
        }}
      >
        Suggest a ETH to DAI token swap on Uniswap
      </Button>
      <div className="flex flex-col justify-center break-words text-xs">
        <p>{`<|uniswap("ETH", "DAI", "SELLAMOUNT", 0.01)|>`}</p>
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
      <div className="flex flex-col justify-center break-words text-xs">
        <p>{`<|nftsearch("dogs")|>`}</p>
      </div>
      {/* Start ETH price in terms of USDC */}
      <Button
        onClick={(e) => {
          handleClose();
          spoofBotMessage(`Sure let me pull that price. <|price("ETH", "USDC")|>`);
        }}
      >
        Get price of ETH in USDC
      </Button>
      <div className="flex flex-col justify-center break-words text-xs">
        <p>{`<|price("ETH", "USDC")|>`}</p>
      </div>
    </div>
  );
};
