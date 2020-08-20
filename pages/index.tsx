import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Welcome to the restaurant</h1>
        <Link href="/menu"><a>Go to the menu</a></Link>
      </main>          
      <img src="/restaurant_menu-24px.svg" alt="Vercel Logo" />
    </div>
  );
}
