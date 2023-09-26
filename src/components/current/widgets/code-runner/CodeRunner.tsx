import { useEffect, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula as style } from 'react-syntax-highlighter/dist/esm/styles/prism';

// import prettier from 'prettier';

interface CodeRunnerProps {
  codeString: string;
}

const CodeRunner = ({ codeString }: CodeRunnerProps) => {
  const [formattedCode, setFormattedCode] = useState(codeString);

  const executeCode = async () => {
    try {
      // handle async funcs
      const wrappedCode = `(async () => { ${codeString} })()`;

      // Caution: using eval is generally not safe.
      // TODO make sure the codeString can be trusted.
      const result = await eval(wrappedCode);

      if (typeof result === 'function') {
        result();
      }
    } catch (e) {
      console.error('An error occurred:', e);
    }
  };

  useEffect(() => {
    const formatCode = async () => {
      // const formattedCode = await prettier.format(codeString, {
      //   parser: 'babel',
      // });
      setFormattedCode(codeString);
    };

    formatCode();
  }, [codeString]);

  return (
    <div>
      <SyntaxHighlighter language="javascript" style={style}>
        {formattedCode}
      </SyntaxHighlighter>
      <button onClick={executeCode}>Execute</button>
    </div>
  );
};

export default CodeRunner;
