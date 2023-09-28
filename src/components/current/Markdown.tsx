import ReactMarkdown from 'react-markdown';

//======================================
export const Markdown = ({ children }: { children: string }) => {
  return (
    <ReactMarkdown
      components={{
        ul: (props) => <ul className="list-disc" {...props} />,
        a: (props) => (
          <a className="testerino text-blue-400 underline" target="_blank" {...props} />
        ),
        code: (props) => <code className="text-orange-300" {...props} />,
      }}
    >
      {children}
    </ReactMarkdown>
  );
};
