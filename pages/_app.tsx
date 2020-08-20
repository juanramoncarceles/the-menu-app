import '../styles/globals.css';
import type { AppProps /*, AppContext */ } from 'next/app';
import Layout from '../components/Layout';

const TheMenuApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default TheMenuApp;
