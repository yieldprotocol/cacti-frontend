import { QueryClient, QueryClientProvider } from 'react-query';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import { CenterProvider } from '@center-inc/react';
import '@rainbow-me/rainbowkit/styles.css';
import { ChatContextProvider } from '@/contexts/ChatContext';
import { ModalContextProvider } from '@/contexts/ModalContext';
import '@/styles/globals.css';

const ConnectionWrapperDynamic = dynamic(() => import('@/contexts/ConnectionWrapper'), {
  ssr: false,
});
const ChatContextDynamic = dynamic(() => import('@/contexts/ChatContext'), {
  ssr: false,
});
const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ConnectionWrapperDynamic>
        <CenterProvider>
          <ModalContextProvider>
            <ChatContextDynamic>
              <Component {...pageProps} />
            </ChatContextDynamic>
          </ModalContextProvider>
        </CenterProvider>
      </ConnectionWrapperDynamic>
    </QueryClientProvider>
  );
}
