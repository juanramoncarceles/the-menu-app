import type { AppProps /*, AppContext */ } from "next/app";
import MainLayout from "../components/layouts/MainLayout";
import { ThemeProvider } from "styled-components";
import { AppContextProvider } from "../contexts/AppContext";
import { primary, typeScale } from "../styles";

const theme = {
  primary,
  typeScale,
};

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
};

export default TheMenuApp;
