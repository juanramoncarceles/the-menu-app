import { useContext } from 'react';
import { DispatchContext, StateContext } from '../components/CartContext';
import { ActionTypes } from '../types/enums';

interface IProps {
  id: string;
  title: string;
  image?: string;
  price: number;
}

const Item = ({id, title, image = '', price}: IProps) => {

  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);

  return (
    <div className="root">
      <img src={image} />
      <h4>{title}</h4>
      <p>{price}</p>
      <p>{id}</p>
      <button onClick={() => dispatch({ type: ActionTypes.Add, payload: id })}>Add</button>
      <button onClick={() => dispatch({ type: ActionTypes.Remove, payload: id })}>Remove</button>
      <style jsx>{`
        .root {
          height: 200px;
          background-color: #ccbfbf;
        }
      `}</style>
    </div>
  );
}

export default Item;