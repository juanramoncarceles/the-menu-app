import { useState, useContext } from "react";
import { StateContext } from "../contexts/AppContext";
import type { OrderItem, CategoryData } from "../types";
import { styled } from "../styles";
import { PrimaryButton, BaseTextButton } from "./Buttons";

const dockedHeight = 60;

const Root = styled.div<{ open: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 15;
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
  color: ${({theme}) => theme.textColorInverted};
  border-top: 5px solid ${({ theme }) => theme.primaryBorderColor};
  background-color: ${({theme}) => theme.primaryColor};

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

const OpenCartBtn = styled(BaseTextButton)`
  position: absolute;
  transform: translateY(-50%);
  font-size: ${({theme}) => theme.typeScale.header4};
  color: ${({theme}) => theme.textColorInverted};
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const FullView = styled.div<{ open: boolean }>`
  padding: 20px;
  position: relative;
  overflow: hidden;
  transition-property: width, max-height, background-color, opacity;
  transition-duration: 1s, 1s, 1s, 0s;

  ${({ open, theme }) =>
    open
      ? `width: 400px;
      max-height: 90%;
      opacity: 1;
      transition-delay: 0s, 0s, 0s, 0s;
      background-color: ${theme.secondaryNeutralColor};
      box-shadow: 0px 4px 10px 5px rgba(0,0,0,0.25);`
      : `width: 100%;
      max-height: ${dockedHeight}px;
      opacity: 0;
      transition-delay: 0s, 0s, 0s, 2s;
      background-color: ${theme.primaryColor};`}
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

const OrderButton = styled(PrimaryButton)`
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
  const { orderItems, categoriesData, formatPrice } = useContext(StateContext);

  const totalPrice = orderItems.reduce(
    (acc: number, current: OrderItem) => acc + current.data.price * current.qty,
    0
  );

  /**
   * Creates the JSX for the title of a section in the cart order.
   * If no sectionId is provided the sectionTitle is used as key.
   */
  const createOrderSectionJSX = (sectionTitle: string, sectionId?: string) => {
    return (
      <tr key={sectionId ? sectionId : sectionTitle}>
        <OrderSection colSpan={3} scope="colgroup">
          {sectionTitle}
        </OrderSection>
      </tr>
    );
  };

  /**
   * Creates the JSX for an item in the cart order.
   */
  const createOrderItemJSX = (item: OrderItem) => {
    return (
      <tr key={item.id}>
        <OrderItemName scope="row">{item.data.title}</OrderItemName>
        <td>&times; {item.qty}</td>
        <OrderItemPrice>
          {formatPrice(item.data.price * item.qty)}
        </OrderItemPrice>
      </tr>
    );
  };

  /**
   * Creates the JSX for the body of the order table.
   * If the items are organized by categories an array of their categories should be provided.
   */
  const createOrderTableJSX = (
    orderItems: OrderItem[],
    categories: CategoryData[]
  ) => {
    // Create an object with the order items organized by category.
    const orderContents: { [key: string]: OrderItem[] } = {};
    orderItems.forEach((item) => {
      if (orderContents.hasOwnProperty(item.data.category.id)) {
        orderContents[item.data.category.id].push(item);
      } else {
        orderContents[item.data.category.id] = [item];
      }
    });
    // Sort the contents according to how categories are stored.
    const sortedOrderContents = Object.entries(orderContents)
      .sort((a, b) => categoriesData.findIndex(c => c.id === a[0]) - categoriesData.findIndex(c => c.id === b[0]));
    // Create the array of JSX elements that will be returned.
    const orderJSX: JSX.Element[] = [];
    for (const [sectionId, items] of sortedOrderContents) {
      const categoryData = categories.find(
        (category) => category.id === sectionId
      );
      if (categoryData) {
        orderJSX.push(
          createOrderSectionJSX(categoryData.name, categoryData.id)
        );
      }
      orderJSX.push(...items.map((item) => createOrderItemJSX(item)));
    }
    return orderJSX;
  };

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
            <tbody data-testid="order-body">
              {createOrderTableJSX(orderItems, categoriesData)}
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
                  Total
                </th>
                <OrderTotalPrice>{formatPrice(totalPrice)}</OrderTotalPrice>
              </tr>
            </tfoot>
          </table>
          <OrderButton>Order</OrderButton>
        </OrderContent>
      </FullView>
      <DockedView open={isOpen}>
        <div>{orderItems.reduce((acc, curr) => acc + curr.qty, 0)} items</div>
        <OpenCartBtnContainer>
          <OpenCartBtn
            onClick={() => setIsOpen(!isOpen)}
            data-testid="open-order-btn"
          >
            View order
          </OpenCartBtn>
        </OpenCartBtnContainer>
        <div>{formatPrice(totalPrice)}</div>
      </DockedView>
    </Root>
  );
};

export default Cart;
