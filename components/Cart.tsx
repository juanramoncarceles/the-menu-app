import { useState, useContext } from "react";
import { StateContext } from "../contexts/AppContext";
import type { OrderItem } from "../types";
import styled from "styled-components";

const dockedHeight = 60;

const Root = styled.div<{ open: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  transition: top 1s;

  ${({ open }) =>
    open
      ? `top: 0;
      background-color: rgba(0,0,0,0.4);`
      : `top: calc(100vh - ${dockedHeight}px);`}
`;

const DockedView = styled.div<{ open: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  position: absolute;
  right: 0px;
  left: 0px;
  bottom: 0px;
  background-color: pink;

  ${({ open }) =>
    open
      ? `opacity: 0;
    height: 0px;
    `
      : `opacity: 1;
    height: ${dockedHeight}px;
    transition: opacity 1s 1s;`}
`;

const OpenCartBtnContainer = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
`;

const OpenCartBtn = styled.button`
  position: absolute;
  transform: translateY(-50%);
`;

const FullView = styled.div<{ open: boolean }>`
  padding: 20px;
  position: relative;
  overflow: hidden;
  transition-property: width, max-height, background-color, opacity;
  transition-duration: 1s, 1s, 1s, 0s;

  ${({ open }) =>
    open
      ? `width: 400px;
      max-height: 90%;
      opacity: 1;
      transition-delay: 0s, 0s, 0s, 0s;
      background-color: gray;`
      : `width: 100%;
      max-height: ${dockedHeight}px;
      opacity: 0;
      transition-delay: 0s, 0s, 0s, 2s;
      background-color: pink;`}
`;

const CloseBtn = styled.button`
  position: absolute;
  right: 20px;
`;

const OrderContent = styled.div<{ open: boolean }>`
  ${({ open }) =>
    open
      ? `
      opacity: 1;    
      transition: opacity 0.3s 1s;
    `
      : `
      opacity: 0;
      transition: opacity 0.3s 0s;
    `}
`;

const TableCaption = styled.caption`
  margin-bottom: 10px;
  font-weight: bold;
  font-size: 1.5rem;
`;

const OrderSection = styled.th`
  text-align: left;
  border-bottom: 1px solid;
  padding-top: 10px;
`;

const OrderItemName = styled.th`
  text-align: left;
  width: 60%;
  font-weight: normal;
`;

const OrderButton = styled.button`
  display: block;
  margin: 15px auto 0;
`;

const OrderItemPrice = styled.td`
  text-align: right;
`;

const OrderTotalPrice = styled.td`
  text-align: right;
  font-weight: bold;
`;

const Cart = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { orderItems, formatPrice } = useContext(StateContext);

  const totalPrice = orderItems.reduce(
    (acc: number, current: OrderItem) => acc + current.data.price * current.qty,
    0
  );

  return (
    <Root open={isOpen}>
      <FullView open={isOpen}>
        <OrderContent open={isOpen}>
          <CloseBtn onClick={() => setIsOpen(!isOpen)}>X</CloseBtn>
          <table style={{ width: "100%" }}>
            <TableCaption>Your order</TableCaption>
            <thead style={{ visibility: "hidden", position: "absolute" }}>
              <tr>
                <th scope="col">Food item</th>
                <th scope="col">Amount</th>
                <th scope="col">Price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <OrderSection colSpan={3} scope="colgroup">
                  Main courses
                </OrderSection>
              </tr>
              <tr>
                <OrderItemName scope="row">Fish</OrderItemName>
                <td>x 1</td>
                <OrderItemPrice>8,40€</OrderItemPrice>
              </tr>
              <tr>
                <OrderItemName scope="row">Pizza</OrderItemName>
                <td>x 1</td>
                <OrderItemPrice>6,70€</OrderItemPrice>
              </tr>
              <tr>
                <OrderSection colSpan={3} scope="colgroup">
                  Snacks
                </OrderSection>
              </tr>
              <tr>
                <OrderItemName scope="row">Chips</OrderItemName>
                <td>x 1</td>
                <OrderItemPrice>3,50€</OrderItemPrice>
              </tr>
              <tr>
                <OrderSection colSpan={3} scope="colgroup">
                  Drinks
                </OrderSection>
              </tr>
              <tr>
                <OrderItemName scope="row">Coke</OrderItemName>
                <td>x 2</td>
                <OrderItemPrice>1,90€</OrderItemPrice>
              </tr>
              <tr>
                <OrderItemName scope="row">Water</OrderItemName>
                <td>x 1</td>
                <OrderItemPrice>1,00€</OrderItemPrice>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td
                  colSpan={3}
                  style={{ borderBottom: "1px solid", paddingTop: "10px" }}
                ></td>
              </tr>
              <tr>
                <th colSpan={2} scope="row" style={{ visibility: "hidden" }}>
                  Totals
                </th>
                <OrderTotalPrice>23,40€</OrderTotalPrice>
              </tr>
            </tfoot>
          </table>
          <OrderButton>Order</OrderButton>
        </OrderContent>
      </FullView>
      <DockedView open={isOpen}>
        <div>{orderItems.length} items</div>
        <OpenCartBtnContainer>
          <OpenCartBtn onClick={() => setIsOpen(!isOpen)}>
            View order
          </OpenCartBtn>
        </OpenCartBtnContainer>
        <div>{formatPrice(totalPrice)}</div>
      </DockedView>
    </Root>
  );
};

export default Cart;
