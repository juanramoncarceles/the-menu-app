import { useRouter } from 'next/router';
import LanguageSelect from '../components/Language';
import Item from '../components/Item';
import Link from 'next/link';

const Catalog = () => {

  const router = useRouter();

  return (
    <div>
      <LanguageSelect />
      <Link href="/menu"><a className="menu-btn">The menu</a></Link>
      <h3 className="catalog-title">This is the catalog for {router.query.section}</h3>
      <div className="items-container">
        <Item title="Fish" price={6.5} />
        <Item title="Chips" price={2.5} />
        <Item title="Hummus" price={3.5} />
        <Item title="Fruit" price={8.5} />
        <Item title="Meat" price={1.5} />
      </div>

      <style jsx>{`
        .menu-btn {
          position: absolute;
          left: 10px;
          top: 10px;
        }

        .catalog-title {
          text-align: center;
          padding-top: 2rem;
          padding-bottom: 2rem;
          font-size: 3rem;
        }

        .items-container {
          display: grid;
          justify-content: center;
          align-content: center;
          grid-template-columns: repeat(auto-fit, 200px);
          grid-template-rows: repeat(auto-fit, 200px);
          grid-gap: 20px;
          gap: 20px;
        }
      `}</style>
    </div>
  );

};

export default Catalog;
