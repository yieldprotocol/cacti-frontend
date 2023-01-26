import { DebugButton } from "@/components/DebugButton";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ChatRoom } from "src/pages/ChatRoom";

export const Home = () => {
  return (
    <>
      <div className="flex flex-col h-screen bg-gray-900 px-8">
        <div className="flex justify-end my-4 gap-2">
          <DebugButton />
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
