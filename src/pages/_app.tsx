import 'react-loading-skeleton/dist/skeleton.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import { CenterProvider } from '@center-inc/react';
import '@rainbow-me/rainbowkit/styles.css';
import { Session } from 'next-auth';
import { ModalContextProvider } from '@/contexts/ModalContext';
import '@/styles/globals.css';
import { getToken } from 'next-auth/jwt';


const ConnectionWrapperDynamic = dynamic(() => import('@/contexts/ConnectionWrapper'), {
  ssr: false,
});
const ChatContextDynamic = dynamic(() => import('@/contexts/ChatContext'), {
  ssr: false,
});
const queryClient = new QueryClient();

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{
  session: Session;
}>) {
  return (
    <QueryClientProvider client={queryClient}>
      <ConnectionWrapperDynamic {...pageProps}>
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
