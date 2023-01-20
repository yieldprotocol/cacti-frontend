export const MessageItem = ({ owner, sender, senderAvatar, message }) => {
  // orient right if I'm sender
  const isSender = owner === sender;
  // let messagePosition = owner == sender ? "text-right" : "";
  return (
    <div className={isSender ? "float-right text-right" : ""}>
      <img
        src={senderAvatar}
        alt={sender}
        className={`h-10 w-10 select-none ${isSender ? "" : ""}`}
      />
      <div
        className="relative box-border overflow-hidden rounded p-3 text-sm font-bold leading-4"
        dangerouslySetInnerHTML={{ __html: message }}
      ></div>
    </div>
  );
};
