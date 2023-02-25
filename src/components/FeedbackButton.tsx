import { useState } from 'react';
import { Message, useChatContext } from '@/contexts/ChatContext';
import { Button } from './Button';

export const FeedbackButton = ({ message }: { message: Message }) => {
  const { messageId, actor, feedback: initialFeedback } = message;
  const [feedback, setFeedback] = useState(initialFeedback);
  const { sendAction } = useChatContext();

  const sendFeedback = (label) => {
    const choice = feedback == 'none' ? label : 'none';
    setFeedback(choice);
    sendAction({ messageId, choice });
  };
  return feedback == 'n/a' || actor != 'bot' ? (
    <></>
  ) : (
    <>
      <Button
        key="good"
        onClick={() => sendFeedback('good')}
        disabled={feedback == 'bad'}
        className="disabled:bg-gray-400"
      >
        👍
      </Button>
      <Button
        key="bad"
        onClick={() => sendFeedback('bad')}
        disabled={feedback == 'good'}
        className="disabled:bg-gray-400"
      >
        👎
      </Button>
    </>
  );
};
