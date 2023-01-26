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
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5 inline"
            >
              <path
                fillRule="evenodd"
                d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z"
                clipRule="evenodd"
              />
              <path
                fillRule="evenodd"
                d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z"
                clipRule="evenodd"
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
