import { TransferButton } from "@/components/TransferButton";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ChatRoom } from "src/pages/ChatRoom";

export const Home = () => {
  return (
    <>
      <div className="h-screen bg-gray-900 pt-10">
        <div className="flex justify-end pt-2 pr-2">
          <ConnectButton />
        </div>
        <div className="h-full">
          <ChatRoom />
        </div>
      </div>
    </>
  );
};

export default Home;
