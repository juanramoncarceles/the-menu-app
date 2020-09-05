import { ReactNode } from 'react';
import Head from 'next/head';
import theme from '../../styles/theme';
import LanguageSelect from '../Language';

interface IProps {
  children?: ReactNode;
}

const MainLayout = ({children}: IProps) => {
  return (
    <div className="page-layout">
      <Head>
        <title>The Restaurant</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LanguageSelect />
      {children}
      <style jsx global>{`
        :root {
          color: ${theme.colors.dark};
        }
      `}</style>
    </div>
  )
}

export default MainLayout;
