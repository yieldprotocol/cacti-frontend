import React, { ReactNode } from 'react';
import ReactMarkdown from 'react-markdown';

//======================================
export const Markdown = ({ children }: { children: string }) => {
  // regex to match URLs in text that arent already formatted as links in markdown
  const urlRegex = /(?<!\]\()https?:\/\/[^\s]+(?!\))/g;

  // add markdown syntax to format links in text if they aren't already marked
  const processedText = children.replace(urlRegex, (url) => `[${url}](${url})`);

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
      {processedText}
    </ReactMarkdown>
  );
};
