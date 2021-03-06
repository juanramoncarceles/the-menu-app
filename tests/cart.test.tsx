import React from "react";
import Cart from "../components/Cart";
import { StateContext } from "../contexts/AppContext";
import { render, screen } from "../test-utils";
import { defaultTheme } from "../styles";
import { locales } from "../translations/config";


test("Total price is calculated successfully", () => {
  const item1 = {
    id: "0",
    title: "A first item",
    price: 1.50,
    description: "",
    image: { url: "" },
    category: { id: "0", name: "Any category", slug: "any-category" },
  };

  const item2 = {
    id: "1",
    title: "A second item",
    price: 2.50,
    description: "",
    image: { url: "" },
    category: { id: "0", name: "Any category", slug: "any-category" },
  };

  const settings = {
    currencySymbol: "€",
    priceAmountDecimals: 2,
  };

  const state = {
    orderItems: [
      { id: "0", data: item1, qty: 3 },
      { id: "1", data: item2, qty: 2 }
    ],
    itemsData: [],
    categoriesData: [],
    settings: settings,
    formatPrice: (f: number) => f.toString(),
    theme: defaultTheme,
    locale: locales[0],
  };

  render(
    <StateContext.Provider value={state}>
      <Cart />
    </StateContext.Provider>
  );

  expect(screen.getAllByText("9.5")).toHaveLength(2);
});
