export const MessageItem = ({ owner, sender, senderAvatar, message }) => {
  // orient right if I'm sender
  const isSender = owner === sender;

  return (
    <div className={`flex  ${isSender ? "flex-row-reverse ml-auto" : ""}`}>
      <img src={senderAvatar} alt={sender} className="rounded-full w-10 h-10" />
      <div
        className={`overflow-hidden rounded-md mx-2 p-2 text-sm ${
          isSender ? "text-white bg-blue-600" : "text-black bg-gray-200"
        }`}
        dangerouslySetInnerHTML={{ __html: message }}
      ></div>
    </div>
  );
};
