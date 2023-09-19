import { useState } from 'react';
import { HandThumbDownIcon, HandThumbUpIcon } from '@heroicons/react/24/outline';
import { IconBtn } from '@/components/shared/IconButton';
import { Message, useChatContext } from '@/contexts/ChatContext';

export const FeedbackButton = ({ message }: { message: Message }) => {
  const { messageId, feedback: initialFeedback } = message;
  const [feedback, setFeedback] = useState(initialFeedback);
  const { sendAction } = useChatContext();

  const sendFeedback = (label: string) => {
    const choice = feedback === 'none' ? label : 'none';
    setFeedback(choice);
    sendAction({ actionType: 'feedback', messageId, choice });
  };

  return feedback === 'n/a' ? (
    <></>
  ) : (
    <div className="flex flex-wrap gap-2 opacity-0 duration-200 group-hover:opacity-100 sm:flex-nowrap">
      {(feedback === 'none' || feedback === 'good') && (
        <IconBtn onClick={() => sendFeedback('good')}>
          {<HandThumbUpIcon className="h-4 w-4" />}
        </IconBtn>
      )}
      {(feedback === 'none' || feedback === 'bad') && (
        <IconBtn onClick={() => sendFeedback('bad')}>
          <HandThumbDownIcon className="h-4 w-4" />
        </IconBtn>
      )}
    </div>
  );
};
