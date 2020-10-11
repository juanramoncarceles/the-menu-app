import type { AppProps /*, AppContext */ } from "next/app";
import MainLayout from "../components/layouts/MainLayout";
import { AppContextProvider } from "../contexts/AppContext";

const TheMenuApp = ({ Component, pageProps }: AppProps) => (
  <AppContextProvider>
    <MainLayout>
      <Component {...pageProps} />
    </MainLayout>
  </AppContextProvider>
);

export default TheMenuApp;
