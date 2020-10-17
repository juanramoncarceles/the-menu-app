import Link from "next/link";

import { locales, languageNames } from "../translations/config";

const Home = () => {
  return (
    <div>
      <main>
        <h1>Welcome to the restaurant</h1>
        {locales.map(locale => (
          <Link href={`/${locale}/menu`} key={locale}>
            <a>{languageNames[locale]}</a>
          </Link>)
        )}
      </main>
      <img src="/restaurant_menu-24px.svg" alt="Vercel Logo" />
    </div>
  );
};

export default Home;
