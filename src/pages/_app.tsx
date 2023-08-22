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
import AppErrorBoundary from '@/components/current/errors/AppError';
import Layout from '@/components/current/layout/Layout';
import { SettingsProvider } from '@/contexts/SettingsContext';
import '@/styles/globals.css';

const ChatContextDynamic = dynamic(() => import('@/contexts/ChatContext'), {
  ssr: false,
});

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
    <AppErrorBoundary>
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
            <ChatContextDynamic>
              <ConnectionWrapperDynamic>
                <CenterProvider apiKey={process.env.NEXT_PUBLIC_CENTER_APP_KEY}>
                  <Layout>
                    <Component {...pageProps} />
                  </Layout>
                </CenterProvider>
              </ConnectionWrapperDynamic>
            </ChatContextDynamic>
          </SessionProvider>
        </QueryClientProvider>
      </SettingsProvider>
    </AppErrorBoundary>
  );
}
