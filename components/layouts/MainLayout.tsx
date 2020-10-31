import { ReactNode, useContext, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from "next/router";

import { StateContext } from "../../contexts/AppContext";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from '../../styles';
import { ActionTypes } from "../../types/enums";
import { DispatchContext } from "../../contexts/AppContext";
import { isLocale } from "../../translations/types";

interface IProps {
  children?: ReactNode;
}

const MainLayout = ({children}: IProps) => {
  const { theme, locale } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const { query } = useRouter();

  useEffect(() => {
    if (typeof query.lang === "string" && isLocale(query.lang) && locale !== query.lang) {
      dispatch({ type: ActionTypes.ChangeLanguage, payload: query.lang });
    }
  }, [query.lang, locale]);

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>The Restaurant</title>
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Bellota+Text&family=Bellota:wght@700&display=swap" rel="stylesheet" />
      </Head>
      {children}
      <GlobalStyle />
    </ThemeProvider>
  )
}

export default MainLayout;
