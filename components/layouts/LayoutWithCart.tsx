import { ReactNode } from 'react';
import { CSSObject } from 'styled-components';

import LanguageSelect from '../Language';
import ThemeSelect from "../ThemeSelect";
import Cart from '../Cart';

interface IProps {
  children?: ReactNode;
  style?: CSSObject;
}

const LayoutWithCart = ({children, style}: IProps) => {
  return (
    <div style={style}>
      <LanguageSelect />
      <ThemeSelect />
      {children}
      <Cart />
    </div>
  );
}

export default LayoutWithCart;