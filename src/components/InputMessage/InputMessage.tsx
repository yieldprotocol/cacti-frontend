import { useState } from "react";

export const InputMessage = ({
  sendMessageLoading,
  typing,
  resetTyping,
  isLoading,
  owner,
  ownerAvatar,
  sendMessage,
}) => {
  const [messageInput, setMessageInput] = useState<string>("");
  const [ownerInput, setOwnerInput] = useState<string>(owner);
  const [ownerAvatarInput, setOwnerAvatarInput] = useState<string>(ownerAvatar);

  const handleSendMessage = (event) => {
    event.preventDefault();
    /* Disable sendMessage if the message is empty */
    if (messageInput.length > 0) {
      sendMessageLoading(ownerInput, ownerAvatarInput, messageInput);
      /* Reset input after send*/
      setMessageInput("");
    }
  };
  const handleTyping = (event) => {
    /* Tell users when another user has at least started to write */
    if (messageInput.length > 0) {
      typing(ownerInput);
    } else {
      /* When there is no more character, the user no longer writes */
      resetTyping(ownerInput);
    }
  };

  /* If the chatbox state is loading, loading class for display */
  var loadingClass = isLoading ? "input-message-button--loading" : "";
  let sendButtonIcon = (
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
      <input
        type="hidden"
        onChange={(e) => setOwnerInput(e.target.value)}
        value={ownerInput}
      />
      <input
        type="hidden"
        onChange={(e) => setOwnerAvatarInput(e.target.value)}
        value={ownerAvatarInput}
      />
      <input
        type="text"
        onChange={(e) => setMessageInput(e.target.value)}
        className="float-left box-border h-10 bg-gray-300 text-sm font-bold"
        placeholder="Text message"
        onKeyDown={handleTyping}
        onKeyUp={handleTyping}
        tabIndex={0}
        value={messageInput}
      />
      <div
        className="relative float-right box-border h-10 w-10 cursor-pointer select-none bg-indigo-600 p-2 text-center text-white"
        onClick={handleSendMessage}
      >
        {sendButtonIcon}
      </div>
    </form>
  );
};
