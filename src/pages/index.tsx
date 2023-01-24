import Transfer from "@/components/Transfer";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ChatRoom } from "src/pages/ChatRoom";

export default function Home() {
  return (
    <>
      <div className="h-screen bg-gray-900 pt-32">
        <ChatRoom />
        <div className="mt-10 flex justify-center items-center gap-4">
          <ConnectButton />
          <Transfer
            token="0x187C0F98FEF80E87880Db50241D40551eDd027Bf"
            amount="1000000000000000000"
            receiver="0x637C1Ec1d205a4E7a79c9CE4Bd100CD1d19E6080"
          />
          <Transfer
            token="ETH"
            amount="1000000000000000000"
            receiver="0x637C1Ec1d205a4E7a79c9CE4Bd100CD1d19E6080"
          />
        </div>
      </div>
    </>
  );
}
