import { ReactNode } from 'react';
import Cart from '../Cart';

interface IProps {
  children?: ReactNode;
}

const LayoutWithCart = ({children}: IProps) => {
  return (
    <div>
      {children}
      <Cart />
    </div>
  );
}

export default LayoutWithCart;