import { DebugButton } from "@/components/DebugButton";
import { ChatBox } from "@/components/ChatBox";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export const Home = () => {
  return (
    <>
      <div className="flex flex-col h-screen bg-gray-900 px-8">
        <div className="flex justify-end my-4 gap-2">
          <DebugButton />
          <ConnectButton />
        </div>
        <div className="h-full">
          <ChatBox />
        </div>
      </div>
    </>
  );
};

export default Home;
