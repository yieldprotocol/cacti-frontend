import { ChatBox } from "@/components/ChatBox";
import useWebSocket, { ReadyState } from "react-use-websocket";

export const ChatRoom = () => {
  // const [isTyping, setTyping] = useState([]);

  /* adds a new message to the chatroom */
  // const sendMessage = (sender, senderAvatar, message) => {
  //   setTimeout(() => {
  //     let messageFormat = detectURL(message);
  //     let newMessageItem = {
  //       id: messages.length + 1,
  //       sender: sender,
  //       senderAvatar: senderAvatar,
  //       message: messageFormat,
  //     };
  //     wsSendMessage(message);
  //     setMessages([...messages, newMessageItem]);
  //     resetTyping(sender);
  //   }, 400);
  // };
  // /* updates the writing indicator if not already displayed */
  // const typing = (writer) => {
  //   if (!isTyping[writer]) {
  //     isTyping[writer] = true;
  //     setTyping(isTyping);
  //   }
  // };
  // /* hide the writing indicator */
  // const resetTyping = (writer) => {
  //   isTyping[writer] = false;
  //   setTyping(isTyping);
  // };


  return (
    <div className="flex justify-center h-full">
      <ChatBox/>
    </div>
  );
};

export default ChatRoom;
