import 'react-loading-skeleton/dist/skeleton.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import { CenterProvider } from '@center-inc/react';
import '@rainbow-me/rainbowkit/styles.css';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import Layout from '@/components/experimental_/layout/Layout';

/*
// disabled dynamic because this causes the query.id useEffect hook to fire twice
const ChatContextDynamic = dynamic(() => import('@/contexts/ChatContext'), {
  ssr: false,
});
*/
import ChatContext from '@/contexts/ChatContext';
import { SettingsProvider } from '@/contexts/SettingsContext';
import '@/styles/globals.css';

const ConnectionWrapperDynamic = dynamic(() => import('@/contexts/ConnectionWrapper'), {
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
        <SessionProvider refetchInterval={0} session={session}>
          <ChatContext>
            <ConnectionWrapperDynamic>
              <CenterProvider apiKey={process.env.NEXT_PUBLIC_CENTER_APP_KEY}>
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              </CenterProvider>
            </ConnectionWrapperDynamic>
          </ChatContext>
        </SessionProvider>
      </QueryClientProvider>
    </SettingsProvider>
  );
}
