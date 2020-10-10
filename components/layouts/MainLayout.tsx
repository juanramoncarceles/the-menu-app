import { ReactNode } from 'react';
import Head from 'next/head';
import LanguageSelect from '../Language';
import ThemeSelect from "../ThemeSelect";
import { GlobalStyle } from '../../styles';

interface IProps {
  changeTheme: (key: string) => void;
  children?: ReactNode;
}

const MainLayout = ({changeTheme, children}: IProps) => {
  return (
    <div className="page-layout">
      <Head>
        <title>The Restaurant</title>
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Bellota+Text&family=Bellota:wght@700&display=swap" rel="stylesheet"></link>
      </Head>
      <LanguageSelect />
      <ThemeSelect changeTheme={changeTheme} />
      {children}
      <GlobalStyle />
    </div>
  )
}

export default MainLayout;
