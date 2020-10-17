import { useContext, useEffect } from "react";
import Link from "next/link";
import { GetStaticPaths, GetStaticProps } from "next";

import { CategoryData } from "../../types";
import { ActionTypes } from "../../types/enums";
import { locales } from "../../translations/config";
import { DispatchContext } from "../../contexts/AppContext";
import LayoutWithCart from "../../components/layouts/LayoutWithCart";

interface IProps {
  lang: string,
  categories: CategoryData[];
}

const Menu = ({ lang, categories }: IProps) => {
  const dispatch = useContext(DispatchContext);

  useEffect(() => {
    dispatch({ type: ActionTypes.StoreCategories, payload: categories });
  }, [categories]);

  return (
    <LayoutWithCart>
      <div className="container">
        {categories.map((category: CategoryData, i: number) => (
          <h3 key={i}>
            <Link
              href={{
                pathname: "/[lang]/catalog/[slug]",
                query: { lang, slug: category.slug },
              }}
            >
              <a>{category.name}</a>
            </Link>
          </h3>
        ))}
      </div>
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
