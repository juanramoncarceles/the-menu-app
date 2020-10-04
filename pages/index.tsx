import Link from "next/link";

const Home = () => {
  return (
    <div>
      <main>
        <h1>Welcome to the restaurant</h1>
        <Link href="/menu">
          <a>Go to the menu</a>
        </Link>
      </main>
      <img src="/restaurant_menu-24px.svg" alt="Vercel Logo" />
    </div>
  );
};

export default Home;
