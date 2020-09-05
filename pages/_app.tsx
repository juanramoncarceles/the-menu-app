import '../styles/globals.css';
import type { AppProps /*, AppContext */ } from 'next/app';
import MainLayout from '../components/layouts/MainLayout';
import { AppContextProvider } from '../contexts/AppContext';

const TheMenuApp = ({ Component, pageProps }: AppProps) => {

  return (
    <AppContextProvider>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </AppContextProvider>
  );
}

export default TheMenuApp;
