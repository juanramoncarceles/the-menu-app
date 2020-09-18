import styled from 'styled-components';
import { defaultTheme, typeScale } from '../styles';

// BASE BUTTON

const BaseButton = styled.button`
  padding: 6px 24px;
  border-radius: 12px;
  border-style: none;
  font-family: inherit;
  font-size: ${typeScale.paragraph};
  cursor: pointer;
  transition: background-color 0.2s linear, color 0.2s linear;

  &:focus {
    box-shadow: 0 0 0 3px ${defaultTheme.primaryActiveColor};
  }

  &:disabled {
    background-color: ${defaultTheme.disabled} !important;
    color: ${defaultTheme.textOnDisabled};
    cursor: not-allowed;
  }
`;

// BASE FOR THE PRIMARY, SECONDARY AND TERTIARY BUTTONS

const StandardButton = styled(BaseButton)`
  background-color: transparent;

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

export const PrimaryButton = styled(StandardButton)`
  color: ${defaultTheme.textColorInverted};
  border: 3px solid ${defaultTheme.primaryBorderColor};
  background-color: ${defaultTheme.primaryColor};
`;

export const SecondaryButton = styled(StandardButton)`
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

export const TertiaryButton = styled(StandardButton)`
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

export const SuccessButton = styled(BaseButton)`
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

export const WarningButton = styled(BaseButton)`
  background-color: ${defaultTheme.status.warningColor};

  &:hover {
    background-color: ${defaultTheme.status.warningColorHover};
  }

  &:active {
    background-color: ${defaultTheme.status.warningColorActive};
  }
`;

export const ErrorButton = styled(BaseButton)`
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
