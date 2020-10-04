import React from "react";
import "@testing-library/jest-dom";
import { render, fireEvent, screen } from "../test-utils";
import Item from "../components/Item";

const anyPrice = 1;

test("increase item counter", () => {
  const initialAmount = 0;
  render(
    <Item
      id=""
      title=""
      imageurl=""
      price={anyPrice}
      description=""
      amount={initialAmount}
    />
  );
  const addBtn = screen.getByTestId("add-item-btn");
  const amount = screen.getByTestId("item-amount");
  fireEvent.click(addBtn);
  expect(Number(amount.textContent)).toBe(initialAmount + 1);
});

test("decrease item counter", () => {
  const initialAmount = 1;
  render(
    <Item
      id=""
      title=""
      imageurl=""
      price={anyPrice}
      description=""
      amount={initialAmount}
    />
  );
  const removeBtn = screen.getByTestId("remove-item-btn");
  const amount = screen.getByTestId("item-amount");
  fireEvent.click(removeBtn);
  expect(Number(amount.textContent)).toBe(initialAmount - 1);
});

test("amount is never negative", () => {
  const initialAmount = 1;
  render(
    <Item
      id=""
      title=""
      imageurl=""
      price={anyPrice}
      description=""
      amount={initialAmount}
    />
  );
  const removeBtn = screen.getByTestId("remove-item-btn");
  const amount = screen.getByTestId("item-amount");
  for (let i = 0; i < 4; i++) fireEvent.click(removeBtn);
  expect(Number(amount.textContent)).toBeGreaterThanOrEqual(0);
});
