import { ReactNode, useContext } from 'react';
import Head from 'next/head';
import { StateContext } from "../../contexts/AppContext";
import { ThemeProvider } from "styled-components";
import LanguageSelect from '../Language';
import ThemeSelect from "../ThemeSelect";
import { GlobalStyle } from '../../styles';

interface IProps {
  children?: ReactNode;
}

const MainLayout = ({children}: IProps) => {
  const { theme } = useContext(StateContext);

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>The Restaurant</title>
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Bellota+Text&family=Bellota:wght@700&display=swap" rel="stylesheet" />
      </Head>
      <LanguageSelect />
      <ThemeSelect />
      {children}
      <GlobalStyle />
    </ThemeProvider>
  )
}

export default MainLayout;
