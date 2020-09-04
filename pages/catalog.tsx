import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import LanguageSelect from '../components/Language';
import Item from '../components/Item';
import Cart from '../components/Cart';
import Link from 'next/link';
import { GetServerSideProps } from 'next';
import { DispatchContext } from '../components/AppContext';
import type { ItemData } from '../types';
import { ActionTypes } from '../types/enums';

interface IProps {
  items: ItemData[];
}

const Catalog = ({ items }: IProps) => {

  const router = useRouter();

  const dispatch = useContext(DispatchContext);

  useEffect(() => {
    dispatch({type: ActionTypes.Store, payload: items});
  });

  return (
    <div>
      <LanguageSelect />
      <Link href="/menu"><a className="menu-btn">The menu</a></Link>
      <h3 className="catalog-title">This is the catalog for {router.query.name}</h3>
      <div className="items-container">
        {items.map((item: ItemData, i: number) => (
          <Item key={i} id={item.id} title={item.title} price={item.price} />
        ))}
      </div>
      <Cart />

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


export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch(`http://localhost:1337/items?category.id=${context.query.id}`);
  const items: ItemData[] = await res.json();
  return {
    props: {
      items
    }
  }
}


export default Catalog;
