import { useState } from 'react';
import { HandThumbDownIcon, HandThumbUpIcon } from '@heroicons/react/24/outline';
import { Message, useChatContext } from '@/contexts/ChatContext';

const Button = ({
  label,
  feedback,
  onClick,
}: {
  label: string;
  feedback: string;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className="
       text-white/10 hover:text-white/70 
       enabled:hover:cursor-pointer
        disabled:bg-gray-600 disabled:hover:text-gray-400"
    >
      {label === 'good' && <HandThumbUpIcon className={` ${feedback === 'good' && 'text-green-700' } h-4 w-4 `} />}
      {label === 'bad' && <HandThumbDownIcon className={` ${feedback === 'bad' && 'text-red-700'  } h-4 w-4 `}/>}
    </button>
  );
};

export const FeedbackButton = ({ message }: { message: Message }) => {
  const { messageId, feedback: initialFeedback } = message;
  const [feedback, setFeedback] = useState(initialFeedback);
  const { sendAction } = useChatContext();

  const sendFeedback = (label: string) => {
    const choice = feedback === 'none' ? label : 'none';
    setFeedback(choice);
    sendAction({ actionType: 'feedback', messageId, choice });
  };

  if (feedback === 'n/a') return <></>;
  
  return (
    <div className="flex p-3 gap-2">
      <Button onClick={() => sendFeedback('good')} label="good" feedback={feedback} />
      <Button onClick={() => sendFeedback('bad')} label="bad" feedback={feedback} />
    </div>
  );
};
