import { useContext } from 'react';
import { OrderContext } from '../components/CartContext';

interface IProps {
  id: string;
  title: string;
  image?: string;
  price: number;
}

const Item = ({id, title, image = '', price}: IProps) => {

  const { dispatch } = useContext(OrderContext);

  return (
    <div className="root">
      <img src={image} />
      <h4>{title}</h4>
      <p>{price}</p>
      <p>{id}</p>
      <button onClick={() => dispatch({ type: 'add', payload: id })}>Add</button>
      <button onClick={() => dispatch({ type: 'remove', payload: id })}>Remove</button>
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