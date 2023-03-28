import { QueryClient, QueryClientProvider } from 'react-query';
import type { AppProps } from 'next/app';
import { CenterProvider } from '@center-inc/react';
import { ChatContextProvider } from '@/contexts/ChatContext';
import ConnectionWrapper from '@/contexts/ConnectionWrapper';
import { ModalContextProvider } from '@/contexts/ModalContext';

import '@rainbow-me/rainbowkit/styles.css';
import '@/styles/globals.css';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ConnectionWrapper>
        <CenterProvider>
          <ModalContextProvider>
            <ChatContextProvider>
              <Component {...pageProps} />
            </ChatContextProvider>
          </ModalContextProvider>
        </CenterProvider>
      </ConnectionWrapper>
    </QueryClientProvider>
  );
}
