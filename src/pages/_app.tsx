import 'react-loading-skeleton/dist/skeleton.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import { CenterProvider } from '@center-inc/react';
import '@rainbow-me/rainbowkit/styles.css';
import { SettingsProvider } from '@/contexts/SettingsContext';
import { Session } from 'next-auth';
import '@/styles/globals.css';

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
    <SettingsProvider>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <QueryClientProvider client={queryClient}>
        <ConnectionWrapperDynamic {...pageProps}>
          <CenterProvider>
            <ChatContextDynamic>
              <Component {...pageProps} />
            </ChatContextDynamic>
          </CenterProvider>
        </ConnectionWrapperDynamic>
      </QueryClientProvider>
    </SettingsProvider>
  );
}
