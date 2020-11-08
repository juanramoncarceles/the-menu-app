import React, { ReactNode } from "react";
import { StyledComponent } from "styled-components";

import LanguageSelect from "../Language";
import ThemeSelect from "../ThemeSelect";
import Cart from "../Cart";
import { styled, Theme } from "../../styles/themes";

const DefaultBg = styled.div`
  background-color: ${({ theme }) => theme.textColor};
`;

const StyledBase = styled.div`
  min-height: 100vh;
`;

interface IProps {
  children?: ReactNode;
  style?: StyledComponent<"div", Theme>;
  showCart?: boolean;
  showThemeSwitcher?: boolean;
  showLangPicker?: boolean;
}

const LayoutWithCart = ({
  children,
  style: Style = DefaultBg,
  showCart = false,
  showThemeSwitcher = false,
  showLangPicker = false,
}: IProps) => {
  return (
    <Style as={StyledBase}>
      {showLangPicker ? <LanguageSelect /> : ""}
      {showThemeSwitcher ? <ThemeSelect /> : ""}
      {children}
      {showCart ? <Cart /> : ""}
    </Style>
  );
};

export default LayoutWithCart;
