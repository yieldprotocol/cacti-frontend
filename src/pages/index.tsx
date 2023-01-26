import { Button } from "@/components/Button";
import { Modal } from "@/components/Modal";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useState } from "react";
import { ChatRoom } from "src/pages/ChatRoom";

export const Home = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <div className="flex flex-col h-screen bg-gray-900 px-8">
        <div className="flex justify-end my-4 gap-2">
          <Button onClick={() => setOpenModal(true)}>Debug</Button>
          <Modal
            openState={openModal}
            handleClose={() => setOpenModal(false)}
          />
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
