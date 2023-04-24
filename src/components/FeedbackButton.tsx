import { useState } from 'react';
import { HandThumbDownIcon, HandThumbUpIcon } from '@heroicons/react/24/outline';
import { Message, useChatContext } from '@/contexts/ChatContext';
import { ActionType } from '@/types/chat';

const Button = ({ label, onClick }: { label: string; feedback: string; onClick: () => void }) => {
  return (
    <div className="flex justify-center text-gray-400">
      <button
        onClick={onClick}
        className="rounded-md p-1 text-gray-100 hover:bg-gray-700 hover:text-gray-200 enabled:hover:cursor-pointer disabled:bg-gray-600 disabled:hover:text-gray-400"
      >
        {label === 'good' ? (
          <HandThumbUpIcon className="h-4 w-4" />
        ) : (
          <HandThumbDownIcon className="h-4 w-4" />
        )}
      </button>
    </div>
  );
};

export const FeedbackButton = ({ message }: { message: Message }) => {
  const { messageId, actor, feedback: initialFeedback } = message;
  const [feedback, setFeedback] = useState(initialFeedback);
  const { sendAction } = useChatContext();

  const sendFeedback = (label: string) => {
    const choice = feedback === 'none' ? label : 'none';
    setFeedback(choice);
    sendAction({ actionType: ActionType.FEEDBACK, messageId, choice });
  };

  return feedback === 'n/a' ? (
    <></>
  ) : (
    <div className="flex justify-between gap-1">
      {(feedback === 'none' || feedback === 'good') && (
        <Button onClick={() => sendFeedback('good')} label="good" feedback={feedback} />
      )}
      {(feedback === 'none' || feedback === 'bad') && (
        <Button onClick={() => sendFeedback('bad')} label="bad" feedback={feedback} />
      )}
    </div>
  );
};
