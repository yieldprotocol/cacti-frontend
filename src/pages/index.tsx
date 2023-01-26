import { Modal } from "@/components/Modal";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useState } from "react";
import { ChatRoom } from "src/pages/ChatRoom";

export const Home = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <div className="flex flex-col h-screen bg-gray-900 px-8">
        <div className="flex justify-end my-4 gap-2">
          <button
            onClick={() => setOpenModal(true)}
            className="align-center inline-block font-bold rounded-xl bg-gray-700 px-6 py-2.5 text-md leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-gray-800 hover:shadow-lg focus:bg-gray-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-800 active:shadow-lg"
          >
            Debug <ArrowTopRightOnSquareIcon className="h-5 w-5 inline" />
          </button>
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
