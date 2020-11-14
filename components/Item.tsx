import { useContext, useState } from "react";
import Image from "next/image";

import { DispatchContext, StateContext } from "../contexts/AppContext";
import { ActionTypes } from "../types/enums";
import { IconButton } from "./Buttons";
import { styled } from "../styles";
import { AddIcon, SubtractIcon } from "./Icons";

interface IProps {
  id: string;
  title: string;
  imageurl: string;
  price: number;
  description: string;
  amount: number;
}

const radius = 25;

const activeBorderOffset = 6;

interface RootProps {
  active: boolean;
}

const Root = styled.div<RootProps>`
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 1;
  border-radius: ${radius}px;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.15);

  &:after {
    content: "";
    position: absolute;
    width: calc(100% + ${2 * activeBorderOffset}px);
    height: calc(100% + ${2 * activeBorderOffset}px);
    border-radius: ${radius + activeBorderOffset}px;
    border: 3px solid ${({ theme }) => theme.primaryColor};
    z-index: -1;
    left: -${activeBorderOffset}px;
    top: -${activeBorderOffset}px;
    opacity: ${({ active }) => (active ? 1 : 0)};
    transition: opacity 0.8s;
  }
`;

const Img = styled(Image)`
  width: 100%;
  margin-bottom: -${radius}px;
  border-radius: ${radius}px ${radius}px 0 0;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
  padding: 0.5rem;
  text-align: center;
  border-radius: ${radius}px;
  background-color: #fff;
`;

const ItemTitle = styled.h4`
  margin-bottom: 0.8rem;
  font-size: ${({ theme }) => theme.typeScale.header5};
`;

const Description = styled.p`
  flex-grow: 1;
`;

const PriceAndAmount = styled.div`
  width: 100%;
  display: flex;
  margin-top: 0.8rem;
  justify-content: space-between;
  align-items: center;
`;

const Price = styled.span`
  padding: 0 8px;
  font-size: ${({ theme }) => theme.typeScale.header5};
`;

const CounterBlock = styled.span`
  display: flex;
  align-items: center;
`;

const Amount = styled.span`
  display: inline-block;
  width: 1.5rem;
  margin-right: 10px;
  margin-left: 10px;
  font-size: ${({ theme }) => theme.typeScale.header5};
`;

const Item = ({
  id,
  title,
  imageurl,
  price,
  description,
  amount: initialAmount,
}: IProps) => {
  const [amount, setAmount] = useState(initialAmount);
  const dispatch = useContext(DispatchContext);
  const { formatPrice } = useContext(StateContext);

  return (
    <Root data-id={id} active={amount > 0}>
      <Img // TODO mark the two or three first images as priority={true}?
        src={
          imageurl
            ? process.env.backendServer + imageurl
            : "/food_img_placeholder.svg"
        }
        width={340}
        height={340}
        unoptimized={true}
      />
      <Info>
        <ItemTitle>{title}</ItemTitle>
        <Description>{description}</Description>
        <PriceAndAmount>
          <Price>{formatPrice(price)}</Price>
          <CounterBlock>
            <IconButton
              data-testid="remove-item-btn"
              onClick={() => {
                dispatch({ type: ActionTypes.RemoveItem, payload: id });
                setAmount(amount < 1 ? 0 : amount - 1);
              }}
            >
              <SubtractIcon />
            </IconButton>
            <Amount data-testid="item-amount">{amount}</Amount>
            <IconButton
              data-testid="add-item-btn"
              onClick={() => {
                dispatch({ type: ActionTypes.AddItem, payload: id });
                setAmount(amount + 1);
              }}
            >
              <AddIcon />
            </IconButton>
          </CounterBlock>
        </PriceAndAmount>
      </Info>
    </Root>
  );
};

export default Item;
