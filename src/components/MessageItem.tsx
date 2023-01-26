import { Message, useChatContext } from "@/contexts/ChatContext";

export const MessageItem = ({ message }: { message: Message }) => {
  const { isBot, payload } = message;
  const { getAvatar } = useChatContext();

  const avatar = getAvatar(isBot)
  return (
    <div className={`flex  ${isBot ? "" : "flex-row-reverse ml-auto"}`}>
      <img src={avatar} alt={isBot ? "Bot avatar" :  "My avatar"} className="rounded-full w-10 h-10"/>
      <div
        className={`overflow-hidden rounded-md mx-2 p-2 text-sm ${
          isBot ? "text-black bg-gray-200" : "text-white bg-blue-600"
        }`}
        dangerouslySetInnerHTML={{ __html: payload }}
      ></div>
    </div>
  );
};
