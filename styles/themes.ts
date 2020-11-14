import baseStyled, { ThemedStyledInterface } from "styled-components";
import { primary, neutral, success, warning, error } from "./colors";
import { font, typeScale } from "./typography";

export const defaultTheme = {
  primaryColor: primary[100],
  primaryHoverColor: primary[200],
  primaryBorderColor: primary[300],
  primaryActiveColor: primary[400],
  textColorOnPrimary: neutral[100],
  textColor: neutral[700],
  textColorInverted: neutral[100],
  disabled: neutral[300],
  textOnDisabled: neutral[100],
  formElementBackground: primary[500],
  textOnFormElementBackground: neutral[500],
  secondaryNeutralColor: neutral[200],
  backgroundColor: neutral[100],
  headingFont: font.secondary,
  bodyFont: font.primary,
  typeScale,
  status: {
    successColor: success[100],
    successColorHover: success[200],
    successColorActive: success[300],
    warningColor: warning[100],
    warningColorHover: warning[200],
    warningColorActive: warning[300],
    errorColor: error[100],
    errorColorHover: error[200],
    errorColorActive: error[300],
  },
};

export const darkTheme: Theme = {
  primaryColor: "#000",
  primaryHoverColor: "#000",
  primaryBorderColor: "#000",
  primaryActiveColor: "#000",
  textColorOnPrimary: "#000",
  textColor: "#000",
  textColorInverted: "#000",
  disabled: "#000",
  textOnDisabled: "#000",
  formElementBackground: "#000",
  textOnFormElementBackground: "#000",
  secondaryNeutralColor: "#000",
  backgroundColor: neutral[700],
  headingFont: "#000",
  bodyFont: "#000",
  typeScale,
  status: {
    successColor: "#000",
    successColorHover: "#000",
    successColorActive: "#000",
    warningColor: "#000",
    warningColorHover: "#000",
    warningColorActive: "#000",
    errorColor: "#000",
    errorColorHover: "#000",
    errorColorActive: "#000",
  },
};

export type Theme = typeof defaultTheme;

export const styled = baseStyled as ThemedStyledInterface<Theme>;
