import 'react-loading-skeleton/dist/skeleton.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import { CenterProvider } from '@center-inc/react';
import '@rainbow-me/rainbowkit/styles.css';
import { Session } from 'next-auth';
import Layout from '@/components/experimental_/layout/Layout';
import { SettingsProvider } from '@/contexts/SettingsContext';
import '@/styles/globals.css';

/*
const ConnectionWrapperDynamic = dynamic(() => import('@/contexts/ConnectionWrapper'), {
  ssr: false,
});
*/
import ConnectionWrapperDynamic from '@/contexts/ConnectionWrapper';
/*
const ChatContextDynamic = dynamic(() => import('@/contexts/ChatContext'), {
  ssr: false,
});
*/
import ChatContextDynamic from '@/contexts/ChatContext';

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
        <ConnectionWrapperDynamic session={session}>
          <CenterProvider apiKey={process.env.NEXT_PUBLIC_CENTER_APP_KEY}>
            <ChatContextDynamic>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </ChatContextDynamic>
          </CenterProvider>
        </ConnectionWrapperDynamic>
      </QueryClientProvider>
    </SettingsProvider>
  );
}
