import '../styles/globals.css';
import type { AppProps /*, AppContext */ } from 'next/app';
import Layout from '../components/Layout';
import { AppContextProvider } from '../components/AppContext';

const TheMenuApp = ({ Component, pageProps }: AppProps) => {

  return (
    <AppContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppContextProvider>
  );
}

export default TheMenuApp;
