import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import Item from "../components/Item";
import Link from "next/link";
import { GetServerSideProps } from "next";
import { DispatchContext } from "../contexts/AppContext";
import type { ItemData, AppSettings } from "../types";
import styled from "styled-components";
import { ActionTypes } from "../types/enums";
import LayoutWithCart from "../components/layouts/LayoutWithCart";

interface IProps {
  items: ItemData[];
  settings: AppSettings;
}

const BackLink = styled.div`
  position: absolute;
  left: 10px;
  top: 10px;
`;

const CatalogTitle = styled.h3`
  text-align: center;
  padding-top: 2rem;
  padding-bottom: 2rem;
  font-size: 3rem;
`;

const ItemsContainer = styled.div`
  display: grid;
  justify-content: center;
  align-content: center;
  grid-template-columns: repeat(auto-fit, 200px);
  grid-template-rows: repeat(auto-fit, 200px);
  grid-gap: 20px;
  gap: 20px;
`;

const Catalog = ({ items, settings }: IProps) => {
  const router = useRouter();

  const dispatch = useContext(DispatchContext);

  useEffect(() => {
    dispatch({ type: ActionTypes.Store, payload: [items, settings] });
  });

  return (
    <LayoutWithCart>
      <BackLink>
        <Link href="/menu">
          <a>The menu</a>
        </Link>
      </BackLink>
      <CatalogTitle>This is the catalog for {router.query.name}</CatalogTitle>
      <ItemsContainer>
        {items.map((item: ItemData, i: number) => (
          <Item
            key={i}
            id={item.id}
            title={item.title}
            price={item.price}
            description={item.description}
            imageurl={item.image ? item.image.url : ""}
          />
        ))}
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
