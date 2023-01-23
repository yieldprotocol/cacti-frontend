import Image from "next/image";

export const MessageItem = ({ owner, sender, senderAvatar, message }) => {
  // orient right if I'm sender
  const isSender = owner === sender;
  let messagePosition = owner == sender ? "flex-row-reverse ml-auto" : "";

  return (
    <div className={`flex ${messagePosition}`}>
      <div>
        <img
          src={senderAvatar}
          alt={sender}
          className="h-10 w-10 w-full rounded-full object-cover"
        />
      </div>
      <div
        className="overflow-hidden rounded p-3 text-sm font-bold leading-4"
        dangerouslySetInnerHTML={{ __html: message }}
      ></div>
    </div>
  );
};
