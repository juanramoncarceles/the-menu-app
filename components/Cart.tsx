import { useContext } from 'react';
import { OrderContext } from './CartContext';
import type { OrderItem } from '../types';

const Cart = () => {
  const { state } = useContext(OrderContext);

  return (
    <div className="root">
      <p>This is the cart</p>
      <p>Total: {state.items.length}</p>
      <p>Items selected</p>
      <ul>
        {state.items.map((item: OrderItem) => (
          <li>{item.id}</li>
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