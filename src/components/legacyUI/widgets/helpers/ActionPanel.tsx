import { useChatContext } from '@/contexts/ChatContext';

interface Props {
  header: string;
  msg: string;
  direction?: 'col' | 'row';
  gap?: 'gap-1' | 'gap-2' | 'gap-3';
  centerTitle?: boolean;
  children?: JSX.Element;
}

export const ActionPanel = ({ header, msg, children, direction, gap, centerTitle }: Props) => {
  const { showDebugMessages } = useChatContext();
  const centerTitleCss = centerTitle ? 'flex flex-col items-center justify-center' : '';
  return (
    <div className="bg-gray-500 shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className={`sm:flex sm:justify-between flex-${direction || 'row'} ${gap}`}>
          <div className={`${centerTitleCss}`}>
            <h3 className="text-lg font-medium leading-6 text-white">{header}</h3>
            {showDebugMessages && (
              <div className="mt-2 max-w-xl break-all text-sm text-white">
                <p>
                  <code className="text-xs">{msg}</code>
                </p>
              </div>
            )}
          </div>
          <div className="flex grow items-center">{children}</div>
        </div>
      </div>
    </div>
  );
};
