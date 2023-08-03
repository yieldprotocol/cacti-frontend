import { ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

const ChatErrorBoundary = ({ children }: { children: ReactNode }) => {
    return (
      <ErrorBoundary
        FallbackComponent={() => {
          return <div>There appears to have been an error interpreting the chat.</div>;
        }}
      >
        {children}
      </ErrorBoundary>
    );
  };

export default ChatErrorBoundary;