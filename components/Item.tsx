import { useContext } from 'react';
import styled from 'styled-components';
import { DispatchContext, StateContext } from '../contexts/AppContext';
import { ActionTypes } from '../types/enums';
import { PrimaryButton } from './Buttons';

interface IProps {
  id: string;
  title: string;
  image?: string;
  price: number;
}

const Root = styled.div`
  height: 200px;
  background-color: #ccbfbf;
`;

const ItemTitle = styled.h4`
  color: ${({theme}) => theme.colors.primary};
`;

const Item = ({id, title, image = '', price}: IProps) => {

  const dispatch = useContext(DispatchContext);
  const { formatPrice } = useContext(StateContext);

  return (
    <Root>
      <img src={image} />
      <ItemTitle>{title}</ItemTitle>
      <p>{formatPrice(price)}</p>
      <p>{id}</p>
      <PrimaryButton onClick={() => dispatch({ type: ActionTypes.Add, payload: id })}>Add</PrimaryButton>
      <button onClick={() => dispatch({ type: ActionTypes.Remove, payload: id })}>Remove</button>
    </Root>
  );
}

export default Item;