import { parseMessage } from '@/utils/parse-message';
import { TransferButton } from './TransferButton';

const widgetize = (widget: Widget) => {
  const { fnName, args } = widget;
  switch (fnName) {
    case 'transfer':
      return <TransferButton {...{ amount: '10000', receiver: 'vitalik.eth' }} />;
    default:
      return <div className="bg-red-800 p-5 text-white">No acceptable widget found</div>;
  }
};

export const MessageTranslator = ({ message }: { message: string }) => {
  const stringsAndWidgets = parseMessage(message);
  return (
    <>
      {stringsAndWidgets.map((item) => {
        // if it's a string, just return the string in a fragment
        if (typeof item === 'string') return <>{item}</>;
        // otherwise, let's try to translate the widget
        return widgetize(item);
      })}
    </>
  );
};
