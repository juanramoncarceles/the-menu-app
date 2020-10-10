import React from "react";
import { render, screen } from "../test-utils";
import { mockNextUseRouter } from "./useRouter-mock-helper";
import Catalog from "../pages/catalog";
import { StateContext } from "../contexts/AppContext";

beforeEach(() => {
  mockNextUseRouter({
    route: "/catalog?name=any",
    pathname: "/catalog",
    query: { name: "any" },
    asPath: "/catalog?name=any",
  });
});

const anyPrice = 1;

test("Catalog renders items", () => {
  const item1 = {
    id: "0",
    title: "A first item",
    price: anyPrice,
    description: "",
    image: { url: "" },
    category: { id: "0", name: "Any category" },
  };

  const item2 = {
    id: "1",
    title: "A second item",
    price: anyPrice,
    description: "",
    image: { url: "" },
    category: { id: "0", name: "Any category" },
  };

  const settings = {
    currencySymbol: "€",
    priceAmountDecimals: 2,
  };

  const items = [item1, item2];

  render(<Catalog items={items} settings={settings} />);

  expect(screen.getByText("A first item")).toBeInTheDocument();
  expect(screen.getByText("A second item")).toBeInTheDocument();
});

test("Catalog renders items with amount from context", () => {
  const item = {
    id: "0",
    title: "An item",
    price: anyPrice,
    description: "",
    image: { url: "" },
    category: { id: "0", name: "Any category" },
  };

  const settings = {
    currencySymbol: "€",
    priceAmountDecimals: 2,
  };

  const state = {
    orderItems: [{ id: "0", data: item, qty: 5 }],
    itemsData: [],
    categoriesData: [],
    settings: settings,
    formatPrice: (f) => f.toString(),
  };

  const items = [item];

  render(
    <StateContext.Provider value={state}>
      <Catalog items={items} settings={settings} />
    </StateContext.Provider>
  );

  expect(Number(screen.getByTestId("item-amount").textContent)).toBe(5);
});
