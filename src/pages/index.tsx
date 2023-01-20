import { Inter } from "@next/font/google";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ChatRoom } from "src/pages/ChatRoom/ChatRoom.js";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <div className="h-screen bg-gray-900">
        <div className="flex justify-end pr-2 pt-2">
          <ConnectButton />
        </div>
        <ChatRoom />
      </div>
    </>
  );
}
