import { createGlobalStyle } from "styled-components";
import { font } from "./typography";
import { defaultTheme } from "./themes";

export const GlobalStyle = createGlobalStyle`
  html {
    font-size: 16px;
    box-sizing: border-box;
    color: ${defaultTheme.textColor};
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  h1, h2, h3, h4, h5, p {
    margin-top: 0;
    margin-bottom: 0;
  }

  a {
    text-decoration: none;
  }

  body {
    margin: 0;
    font-family: ${font.primary};
  }
`;
