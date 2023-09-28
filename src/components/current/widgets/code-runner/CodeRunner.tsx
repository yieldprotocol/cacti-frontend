import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula as style } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Button } from '@/components/shared/Button';

interface CodeRunnerProps {
  codeString: string;
}

const CodeRunner = ({ codeString }: CodeRunnerProps) => {
  const executeCode = async () => {
    try {
      // handle async funcs
      const wrappedCode = `(async () => { ${codeString} })()`;

      // Caution: using eval is generally not safe.
      // TODO make sure the codeString can be trusted.
      const result = await eval(wrappedCode);

      if (typeof result === 'function') {
        const res = result();
        console.log('res', res);
      }
    } catch (e) {
      console.error('An error occurred:', e);
    }
  };

  return (
    <div>
      <SyntaxHighlighter language="javascript" style={style}>
        {codeString.trim()}
      </SyntaxHighlighter>
      <Button action={executeCode}>Submit</Button>
    </div>
  );
};

export default CodeRunner;
