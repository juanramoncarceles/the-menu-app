import { ReactNode } from 'react';
import Head from 'next/head';
import theme from '../styles/theme';

interface IProps {
  children?: ReactNode;
}

const Layout = ({children}: IProps) => {
  return (
    <div className="page-layout">
      <Head>
        <title>The Restaurant</title>
      </Head>
      {children}
      <style jsx global>{`
        :root {
          color: ${theme.colors.dark};
        }
      `}</style>
    </div>
  )
}

export default Layout;
