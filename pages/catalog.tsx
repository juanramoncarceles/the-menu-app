import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import Item from '../components/Item';
import Link from 'next/link';
import { GetServerSideProps } from 'next';
import { DispatchContext } from '../contexts/AppContext';
import type { ItemData, AppSettings } from '../types';
import { ActionTypes } from '../types/enums';
import LayoutWithCart from '../components/layouts/LayoutWithCart';

interface IProps {
  items: ItemData[];
  settings: AppSettings;
}

const Catalog = ({ items, settings }: IProps) => {

  const router = useRouter();

  const dispatch = useContext(DispatchContext);

  useEffect(() => {
    dispatch({type: ActionTypes.Store, payload: [items, settings]});
  });

  return (
    <LayoutWithCart>
      <Link href="/menu"><a className="menu-btn">The menu</a></Link>
      <h3 className="catalog-title">This is the catalog for {router.query.name}</h3>
      <div className="items-container">
        {items.map((item: ItemData, i: number) => (
          <Item key={i} id={item.id} title={item.title} price={item.price} />
        ))}
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
    </LayoutWithCart>
  );

};


export const getServerSideProps: GetServerSideProps = async (context) => {

  let items: ItemData[];
  let settings: AppSettings;

  try {
    const res = await Promise.all([
      fetch(`http://localhost:1337/items?category.id=${context.query.id}`),
      fetch('http://localhost:1337/settings')
    ]);
    [items, settings] = await Promise.all(res.map(r => r.json()));
  } catch (error) {
    console.log("An error has happened fetching the data.");
    // Setting default values.
    items = [];
    settings = {currencySymbol: '', priceAmountDecimals: 3};
  }

  return {
    props: {
      items,
      settings,
    }
  }
}


export default Catalog;
