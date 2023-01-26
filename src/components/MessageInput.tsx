import { useState } from "react";
import { useChatContext } from "@/contexts/ChatContext";

export const MessageInput = ({
}) => {
  const [messageInput, setMessageInput] = useState<string>("");

  const { addMessage } = useChatContext();
  
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (messageInput.length > 0) {
      // TODO: await
      addMessage({ isBot: false, payload: messageInput });
      setMessageInput("");
    }
  };

  const sendButtonIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="h-6 w-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
      />
    </svg>
  );

  return (
    <form onSubmit={handleSendMessage}>
      <div className="flex">
        <input
          type="text"
          onChange={(e) => setMessageInput(e.target.value)}
          className="form-control mr-4 block w-full rounded-full border border-solid border-gray-300 bg-gray-300 bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-gray-300 focus:text-gray-700 focus:outline-none"
          placeholder="Enter your message..."
          tabIndex={0}
          value={messageInput}
        />
        <button
          className="relative float-right box-border h-10 w-10 cursor-pointer select-none rounded-full bg-blue-600 p-2 text-center text-white"
          onClick={handleSendMessage}
        >
          {sendButtonIcon}
        </button>
      </div>
    </form>
  );
};
