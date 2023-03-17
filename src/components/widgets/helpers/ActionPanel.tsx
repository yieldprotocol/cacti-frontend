interface Props {
  header: string;
  msg: string;
  direction?: 'col' | 'row';
  children?: JSX.Element;
}

export const ActionPanel = ({ header, msg, children, direction }: Props) => {
  return (
    <div className="bg-gray-500 shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className={`sm:flex sm:justify-between flex-${direction || 'row'}`}>
          <div>
            <h3 className="break-all text-lg font-medium leading-6 text-white">{header}</h3>
            <div className="mt-2 max-w-xl break-all text-sm text-white">
              <p>
                <code className="text-xs">{msg}</code>
              </p>
            </div>
          </div>
          <div className="flex grow items-center">{children}</div>
        </div>
      </div>
    </div>
  );
};
