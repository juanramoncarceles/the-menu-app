import { useState, useContext, useEffect } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import Link from "next/link";

import type { ItemData, CategoryData, AppSettings } from "../../../types";
import { ActionTypes } from "../../../types/enums";
import { styled } from "../../../styles/themes";
import { locales } from "../../../translations/config";
import { DispatchContext, StateContext } from "../../../contexts/AppContext";
import Item from "../../../components/Item";
import LayoutWithCart from "../../../components/layouts/LayoutWithCart";

interface IProps {
  lang: string,
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

const Catalog = ({ lang, items, settings }: IProps) => {
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
        <Link href={`/${lang}/menu`}>
          <a>Back to menu</a>
        </Link>
      </BackLink>
      <CatalogTitle small={smallTitle}>
        <h3>{items[0].category.name}</h3>
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

export const getStaticPaths: GetStaticPaths = async () => {
  // This data is already fetched in Menu, is there a way to reuse it that is not storing it in the filesystem?
  const res = await fetch(`${process.env.backendServer}/categories`);
  const categories: CategoryData[] = await res.json();

  const paths = locales.map(lang => {
    return categories.map(category => {
      return { params: { lang, slug: category.slug } };
    });
  }).flat();

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  let items: ItemData[];
  let settings: AppSettings;

  try {
    const res = await Promise.all([
      fetch(
        // TODO Add to the fetch path the params.lang value to get the data by language when Strapi supports it.
        `${process.env.backendServer}/items?category.slug=${params?.slug}`
      ),
      fetch(`${process.env.backendServer}/settings`),
    ]);
    [items, settings] = await Promise.all(res.map((r) => r.json()));
  } catch (error) {
    console.error("An error has happened fetching for a catalog.", error);
    // Since Category page has to be pre built, catch with default values may not make sense.
    items = [];
    settings = { currencySymbol: "", priceAmountDecimals: 3 };
  }

  return {
    props: {
      lang: params?.lang,
      items,
      settings,
    },
  };
};

export default Catalog;
