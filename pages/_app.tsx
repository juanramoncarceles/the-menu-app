import type { AppProps /*, AppContext */ } from "next/app";
import { useState } from "react";
import MainLayout from "../components/layouts/MainLayout";
import { ThemeProvider } from "styled-components";
import { AppContextProvider } from "../contexts/AppContext";
import { defaultTheme, darkTheme } from "../styles";

const TheMenuApp = ({ Component, pageProps }: AppProps) => {
  const [theme, setTheme] = useState(defaultTheme);

  const changeTheme = (themeKeyword: string) => {
    switch (themeKeyword) {
      case 'light':
        setTheme(defaultTheme);
        break;
      case 'dark':
        setTheme(darkTheme);
        break;
      default:
        setTheme(defaultTheme);
        break;
    }
  }

  return (
    <AppContextProvider>
      <ThemeProvider theme={theme}>
        <MainLayout changeTheme={changeTheme}>
          <Component {...pageProps} />
        </MainLayout>
      </ThemeProvider>
    </AppContextProvider>
  );
};

export default TheMenuApp;
