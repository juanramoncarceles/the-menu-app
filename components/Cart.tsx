import { useContext } from 'react';
import { StateContext } from '../contexts/AppContext';
import type { OrderItem } from '../types';

const Cart = () => {
  const { items } = useContext(StateContext);

  return (
    <div className="root">
      <p>This is the cart</p>
      <p>Total of items: { items.length }</p>
      <p>Total price: { items.reduce((acc: number, current: OrderItem) => acc + (current.data.price * current.qty), 0) }</p>
      <p>Items selected</p>
      <ul>
        {items.map((item: OrderItem, i: number) => (
          <li key={i}>{item.id}</li>
        ))}
      </ul>

      <style jsx>{`
        .root {
          min-height: 50px;
          position: absolute;
          bottom: 0;
          right: 0;
          left: 0;
          background-color: #7cbb7c;
        }
      `}</style>
    </div>
  );
}

export default Cart;