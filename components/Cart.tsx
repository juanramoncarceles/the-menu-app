import { useContext } from "react";
import { StateContext } from "../contexts/AppContext";
import type { OrderItem } from "../types";
import styled from "styled-components";

const Root = styled.div`
  min-height: 50px;
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: #7cbb7c;
`;

const Cart = () => {
  const { orderItems, formatPrice } = useContext(StateContext);

  const totalPrice = orderItems.reduce(
    (acc: number, current: OrderItem) => acc + current.data.price * current.qty,
    0
  );

  return (
    <Root>
      <p>This is the cart</p>
      <p>Total of items: {orderItems.length}</p>
      <p>Total price: {formatPrice(totalPrice)}</p>
      <p>Items selected</p>
      <ul>
        {orderItems.map((item: OrderItem, i: number) => (
          <li key={i}>{item.id}</li>
        ))}
      </ul>
    </Root>
  );
};

export default Cart;
