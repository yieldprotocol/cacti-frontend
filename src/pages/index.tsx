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
          <button
            onClick={() => setOpenModal(true)}
            className="align-center inline-block font-bold rounded-xl bg-gray-700 px-6 py-2.5 text-md leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-gray-800 hover:shadow-lg focus:bg-gray-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-800 active:shadow-lg"
          >
            Debug{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 inline"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
              />
            </svg>
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
