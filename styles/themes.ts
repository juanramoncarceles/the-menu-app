import { primary, neutral, success, warning, error } from "./colors";
import { font } from "./typography";

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
  headingFont: font.secondary,
  bodyFont: font.primary,
  status: {
    successColor: success[100],
    successColorHover: success[200],
    successColorActive: success[300],
    warningColor: warning[100],
    warningColorHover: warning[200],
    warningColorActive: warning[300],
    errorColor: error[100],
    errorColorHover: error[200],
    errorColorActive: error[300]    
  }
};
