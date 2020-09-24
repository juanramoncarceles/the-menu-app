import { useContext } from "react";
import styled from "styled-components";
import { DispatchContext, StateContext } from "../contexts/AppContext";
import { ActionTypes } from "../types/enums";
import { PrimaryButton } from "./Buttons";

interface IProps {
  id: string;
  title: string;
  imageurl: string;
  price: number;
  description: string;
}

const radius = 25;

const Root = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 200px;
  margin: 15px;
`;

const Img = styled.img`
  width: 100%;
  margin-bottom: -${radius}px;
  border-radius: ${radius}px ${radius}px 0 0;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  min-height: 180px;
  border-radius: ${radius}px;
  background-color: #9b9b9b;
`;

const ItemTitle = styled.h4`
  margin: 0;
  color: ${({ theme }) => theme.colors.primary};
`;

const Description = styled.p`
  flex-grow: 1;
`;

const PriceAndAmount = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Amount = styled.span`
  margin-right: 10px;
  margin-left: 10px;
`;

const Item = ({ id, title, imageurl, price, description }: IProps) => {
  const dispatch = useContext(DispatchContext);
  const { formatPrice } = useContext(StateContext);

  return (
    <Root data-id={id}>
      <Img src={process.env.backendServer + imageurl} />
      <Info>
        <ItemTitle>{title}</ItemTitle>
        <Description>{description}</Description>
        <PriceAndAmount>
          <span>{formatPrice(price)}</span>
          <span>
            <PrimaryButton
              onClick={() =>
                dispatch({ type: ActionTypes.Remove, payload: id })
              }
            >
              Remove
            </PrimaryButton>
            <Amount>4</Amount>
            <PrimaryButton
              onClick={() => dispatch({ type: ActionTypes.Add, payload: id })}
            >
              Add
            </PrimaryButton>
          </span>
        </PriceAndAmount>
      </Info>
    </Root>
  );
};

export default Item;
