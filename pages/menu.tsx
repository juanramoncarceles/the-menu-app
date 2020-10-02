import { useContext, useEffect } from "react";
import Link from "next/link";
import { GetStaticProps } from "next";
import { DispatchContext } from "../contexts/AppContext";
import { CategoryData } from "../types";
import { ActionTypes } from "../types/enums";
import LayoutWithCart from "../components/layouts/LayoutWithCart";

interface IProps {
  categories: CategoryData[];
}

const Menu = ({ categories }: IProps) => {
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
                pathname: "/catalog",
                query: { id: category.id, name: category.name },
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

export const getStaticProps: GetStaticProps = async (context) => {
  let categories: CategoryData[];
  try {
    const res = await fetch(`${process.env.backendServer}/categories`);
    categories = await res.json();
  } catch (error) {
    console.error(error);
    categories = [{ id: "0", name: "Test" }];
  }
  return {
    props: {
      categories,
    },
  };
};

export default Menu;
