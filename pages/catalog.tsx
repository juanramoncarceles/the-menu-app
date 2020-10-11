import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import Item from "../components/Item";
import Link from "next/link";
import { GetServerSideProps } from "next";
import { DispatchContext, StateContext } from "../contexts/AppContext";
import type { ItemData, AppSettings } from "../types";
import { styled } from "../styles/themes";
import { ActionTypes } from "../types/enums";
import LayoutWithCart from "../components/layouts/LayoutWithCart";

interface IProps {
  items: ItemData[];
  settings: AppSettings;
}

const BackLink = styled.div`
  position: fixed;
  left: 10px;
  top: 10px;
  z-index: 20;
`;

interface CatalogTitleProps {
  small: boolean;
}

const CatalogTitle = styled.div<CatalogTitleProps>`
  position: fixed;
  width: 100%;
  z-index: 10;
  top: 0;
  text-align: center;
  padding-top: ${({small}) => small ? '0.6rem' : '1.4rem'};
  padding-bottom: 2rem;
  background-image: linear-gradient(#fff, rgba(255,255,255,0));
  transition: padding 1s;

  & > h3 {
    font-size: ${({theme}) => theme.typeScale.header1};
    transform-origin: top;
    transform: ${({small}) => small ? 'scale(0.7)' : 'scale(1)'};
    transition: transform 1s;
  }
`;

const ItemsContainer = styled.div`
  display: grid;
  justify-content: center;
  align-content: center;
  margin: 7rem auto 5.5rem;
  max-width: 1000px;
  grid-template-columns: repeat(auto-fit, 250px);
  grid-gap: 20px;
  gap: 20px;
`;

const Catalog = ({ items, settings }: IProps) => {
  const [smallTitle, setSmallTitle] = useState(false);
  const router = useRouter();

  const dispatch = useContext(DispatchContext);
  const { orderItems } = useContext(StateContext);

  useEffect(() => {
    dispatch({ type: ActionTypes.StoreItems, payload: [items, settings] });

    window.addEventListener('scroll', handleScroll);

    return function cleanup() {
      window.removeEventListener('scroll', handleScroll);
    }
  }, [items]);

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setSmallTitle(true);
    } else {
      setSmallTitle(false);
    }
  };

  return (
    <LayoutWithCart>
      <BackLink>
        <Link href="/menu">
          <a>Back to menu</a>
        </Link>
      </BackLink>
      <CatalogTitle small={smallTitle}>
        <h3>{router.query.name}</h3>
      </CatalogTitle>
      <ItemsContainer>
        {items.map((item: ItemData, i: number) => {
          const itemInOrder = orderItems.find(
            (orderItem) => orderItem.id === item.id
          );
          return (
            <Item
              key={i}
              id={item.id}
              title={item.title}
              price={item.price}
              description={item.description}
              imageurl={item.image ? item.image.url : ""}
              amount={itemInOrder ? itemInOrder.qty : 0}
            />
          );
        })}
      </ItemsContainer>
    </LayoutWithCart>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  let items: ItemData[];
  let settings: AppSettings;

  try {
    const res = await Promise.all([
      fetch(
        `${process.env.backendServer}/items?category.id=${context.query.id}`
      ),
      fetch(`${process.env.backendServer}/settings`),
    ]);
    [items, settings] = await Promise.all(res.map((r) => r.json()));
  } catch (error) {
    console.log("An error has happened fetching the data.");
    // Setting default values.
    items = [];
    settings = { currencySymbol: "", priceAmountDecimals: 3 };
  }

  return {
    props: {
      items,
      settings,
    },
  };
};

export default Catalog;
