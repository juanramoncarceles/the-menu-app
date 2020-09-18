import '../styles/globals.css';
import type { AppProps /*, AppContext */ } from 'next/app';
import MainLayout from '../components/layouts/MainLayout';
import { ThemeProvider } from 'styled-components';
import { AppContextProvider } from '../contexts/AppContext';

const theme = {
  colors: {
    primary: 'pink',
  }
}

const TheMenuApp = ({ Component, pageProps }: AppProps) => {

  return (
    <AppContextProvider>
      <ThemeProvider theme={theme}>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </ThemeProvider>
    </AppContextProvider>
  );
}

export default TheMenuApp;
