import '../styles/globals.css';
import type { AppProps /*, AppContext */ } from 'next/app';
import Layout from '../components/Layout';
import { OrderProvider } from '../components/CartContext';

const TheMenuApp = ({ Component, pageProps }: AppProps) => {

  return (
    <OrderProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </OrderProvider>
  );
}

export default TheMenuApp;
