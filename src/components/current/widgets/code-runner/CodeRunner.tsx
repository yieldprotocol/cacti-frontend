import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula as style } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useProvider } from 'wagmi';
import { Button } from '@/components/shared/Button';
import useSigner from '@/hooks/useSigner';

interface CodeRunnerProps {
  codeString: string;
}

const CodeRunner = ({ codeString }: CodeRunnerProps) => {
  const provider = useProvider();
  const signer = useSigner();

  const executeCode = async () => {
    try {
      // handle async funcs
      const wrappedCode = `(async (provider, signer) => { return ${codeString}; })(provider, signer)`;
      // Caution: using eval is generally not safe.
      // TODO make sure the codeString can be trusted.
      const result = await eval(wrappedCode);

      if (typeof result === 'function') {
        const res = await result(provider, signer);
        console.log('🦄 ~ file: CodeRunner.tsx:26 ~ executeCode ~ res:', res);
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
      <Button onClick={executeCode}>Submit</Button>
    </div>
  );
};

export default CodeRunner;
