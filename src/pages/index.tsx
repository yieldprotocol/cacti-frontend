import { Inter } from "@next/font/google";
import { ChatRoom } from "src/pages/ChatRoom/ChatRoom.js";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <ChatRoom />
    </>
  );
}
