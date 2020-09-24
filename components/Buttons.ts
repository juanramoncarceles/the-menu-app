import styled from "styled-components";
import { defaultTheme, typeScale } from "../styles";

const BaseButton = styled.button`
  border-style: none;
  cursor: pointer;
  background-color: transparent;
  transition: background-color 0.2s linear, color 0.2s linear;

  &:disabled {
    background-color: ${defaultTheme.disabled} !important;
    cursor: not-allowed;
  }
`;

// BASE BUTTON FOR BUTTONS WITH TEXT

const BaseTextButton = styled.button`
  padding: 6px 24px;
  border-radius: 12px;
  font-family: inherit;
  font-size: ${typeScale.paragraph};

  &:focus {
    box-shadow: 0 0 0 3px ${defaultTheme.primaryActiveColor};
  }

  &:disabled {
    color: ${defaultTheme.textOnDisabled};
  }
`;

// BASE FOR THE PRIMARY, SECONDARY AND TERTIARY BUTTONS

const StandardTextButton = styled(BaseTextButton)`
  &:hover {
    background-color: ${defaultTheme.primaryHoverColor};
  }

  &:active {
    background-color: ${defaultTheme.primaryActiveColor};
    border-color: transparent;
  }

  &:disabled {
    border-color: transparent;
  }
`;

export const PrimaryButton = styled(StandardTextButton)`
  color: ${defaultTheme.textColorInverted};
  border: 3px solid ${defaultTheme.primaryBorderColor};
  background-color: ${defaultTheme.primaryColor};
`;

export const SecondaryButton = styled(StandardTextButton)`
  border: 3px solid ${defaultTheme.primaryColor};

  &:hover,
  &:focus,
  &:active {
    color: ${defaultTheme.textColorInverted};
    border-color: transparent;
  }

  &:focus {
    background-color: ${defaultTheme.primaryColor};
  }
`;

export const TertiaryButton = styled(StandardTextButton)`
  border: 1px solid ${defaultTheme.primaryColor};

  &:hover,
  &:focus,
  &:active {
    color: ${defaultTheme.textColorInverted};
    border-color: transparent;
  }

  &:focus {
    background-color: ${defaultTheme.primaryColor};
  }
`;

// STATE BUTTONS: SUCCESS, WARNING AND ERROR

export const SuccessButton = styled(BaseTextButton)`
  background-color: ${defaultTheme.status.successColor};

  &:hover,
  &:focus,
  &:active {
    color: ${defaultTheme.textColorInverted};
  }

  &:hover {
    background-color: ${defaultTheme.status.successColorHover};
  }

  &:active {
    background-color: ${defaultTheme.status.successColorActive};
  }
`;

export const WarningButton = styled(BaseTextButton)`
  background-color: ${defaultTheme.status.warningColor};

  &:hover {
    background-color: ${defaultTheme.status.warningColorHover};
  }

  &:active {
    background-color: ${defaultTheme.status.warningColorActive};
  }
`;

export const ErrorButton = styled(BaseTextButton)`
  background-color: ${defaultTheme.status.errorColor};

  &:hover,
  &:focus,
  &:active {
    color: ${defaultTheme.textColorInverted};
  }

  &:hover {
    background-color: ${defaultTheme.status.errorColorHover};
  }

  &:active {
    background-color: ${defaultTheme.status.errorColorActive};
  }
`;

// ONLY ICON BUTTON

export const IconButton = styled(BaseButton)`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid ${defaultTheme.primaryColor};

  &:hover {
    background-color: ${defaultTheme.primaryHoverColor};
  }
`;
