import { useContext, useEffect } from "react";
import Link from "next/link";
import { GetStaticPaths, GetStaticProps } from "next";

import { styled } from "../../styles";
import { CategoryData } from "../../types";
import { ActionTypes } from "../../types/enums";
import { locales } from "../../translations/config";
import { Locale } from "../../translations/types";
import { DispatchContext } from "../../contexts/AppContext";
import LayoutWithCart from "../../components/layouts/LayoutWithCart";

const MainContainer = styled.main`
  height: calc(100vh - 60px); // TODO Set the 60 as a variable with the cart height to use at build time.
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  padding: 1rem;
  // TODO Only when cart is open... set in context a value to know when cart is open.
  scrollbar-color: rgba(0,0,0,0) rgba(0,0,0,0);
`;

const CategoryTitle = styled.h2`
  padding: 3.5rem 0;
  font-size: ${({theme}) => theme.typeScale.header2};
  font-family: ${({theme}) => theme.headingFont};
  text-shadow: 0px 6px 12px rgba(0, 0, 0, 0.5);

  :first-child {
    padding-top: 6rem;
  }

  :last-child {
    padding-bottom: 6rem;
  }

  > a {
    color: ${({theme}) => theme.textColorInverted};
  }
`;

interface IProps {
  lang: Locale,
  categories: CategoryData[];
}

const Menu = ({ lang, categories }: IProps) => {
  const dispatch = useContext(DispatchContext);

  useEffect(() => {
    dispatch({ type: ActionTypes.StoreCategories, payload: categories });
  }, [categories]);

  return (
    <LayoutWithCart style={{ backgroundImage: 'linear-gradient(rgba(70, 15, 48, 0.9), #000)', height: '100vh' }}>
      <MainContainer>
        {categories.map((category: CategoryData, i: number) => (
          <CategoryTitle key={i}>
            <Link
              href={{
                pathname: "/[lang]/catalog/[slug]",
                query: { lang, slug: category.slug },
              }}
            >
              <a>{category.name}</a>
            </Link>
          </CategoryTitle>
        ))}
      </MainContainer>
    </LayoutWithCart>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = locales.map(locale => ({ params: { lang: locale }}));

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  let categories: CategoryData[];
  try {
    // TODO Add to the fetch path the params.lang value to get the data by language when Strapi supports it.
    const res = await fetch(`${process.env.backendServer}/categories`);
    categories = await res.json();
  } catch (error) {
    console.error(error);
    // Since Menu page has to be pre built, catch with default values may not make sense.
    categories = [{ id: "0", name: "Test", slug: "test" }];
  }
  return {
    props: {
      lang: params?.lang,
      categories,
    },
  };
};

export default Menu;
