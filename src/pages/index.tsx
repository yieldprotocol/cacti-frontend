import { Inter } from "@next/font/google";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ChatRoom } from "src/pages/ChatRoom/ChatRoom";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <div className="h-screen bg-gray-900 pt-32">
        <ChatRoom />
      </div>
    </>
  );
}
