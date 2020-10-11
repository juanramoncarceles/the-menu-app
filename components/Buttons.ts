import { styled } from "../styles";

const BaseButton = styled.button`
  border-style: none;
  cursor: pointer;
  background-color: transparent;
  transition: background-color 0.2s linear, color 0.2s linear;

  &:focus {
    box-shadow: 0 0 0 3px ${({theme}) => theme.primaryActiveColor};
  }

  &:disabled {
    background-color: ${({theme}) => theme.disabled} !important;
    border-color: transparent;
    cursor: not-allowed;
  }
`;

// BASE BUTTON FOR BUTTONS WITH TEXT

export const BaseTextButton = styled(BaseButton)`
  padding: 6px 24px;
  border-radius: 12px;
  font-family: inherit;
  font-size: ${({theme}) => theme.typeScale.paragraph};

  &:disabled {
    color: ${({theme}) => theme.textOnDisabled};
  }
`;

// BASE FOR THE PRIMARY, SECONDARY AND TERTIARY BUTTONS

const StandardTextButton = styled(BaseTextButton)`
  &:hover {
    background-color: ${({theme}) => theme.primaryHoverColor};
  }

  &:active {
    background-color: ${({theme}) => theme.primaryActiveColor};
    border-color: transparent;
  }
`;

export const PrimaryButton = styled(StandardTextButton)`
  color: ${({theme}) => theme.textColorInverted};
  border: 3px solid ${({theme}) => theme.primaryBorderColor};
  background-color: ${({theme}) => theme.primaryColor};
`;

export const SecondaryButton = styled(StandardTextButton)`
  border: 3px solid ${({theme}) => theme.primaryColor};

  &:hover,
  &:focus,
  &:active {
    color: ${({theme}) => theme.textColorInverted};
    border-color: transparent;
  }

  &:focus {
    background-color: ${({theme}) => theme.primaryColor};
  }
`;

export const TertiaryButton = styled(StandardTextButton)`
  border: 1px solid ${({theme}) => theme.primaryColor};

  &:hover,
  &:focus,
  &:active {
    color: ${({theme}) => theme.textColorInverted};
    border-color: transparent;
  }

  &:focus {
    background-color: ${({theme}) => theme.primaryColor};
  }
`;

// STATE BUTTONS: SUCCESS, WARNING AND ERROR

export const SuccessButton = styled(BaseTextButton)`
  background-color: ${({theme}) => theme.status.successColor};

  &:hover,
  &:focus,
  &:active {
    color: ${({theme}) => theme.textColorInverted};
  }

  &:hover {
    background-color: ${({theme}) => theme.status.successColorHover};
  }

  &:active {
    background-color: ${({theme}) => theme.status.successColorActive};
  }
`;

export const WarningButton = styled(BaseTextButton)`
  background-color: ${({theme}) => theme.status.warningColor};

  &:hover {
    background-color: ${({theme}) => theme.status.warningColorHover};
  }

  &:active {
    background-color: ${({theme}) => theme.status.warningColorActive};
  }
`;

export const ErrorButton = styled(BaseTextButton)`
  background-color: ${({theme}) => theme.status.errorColor};

  &:hover,
  &:focus,
  &:active {
    color: ${({theme}) => theme.textColorInverted};
  }

  &:hover {
    background-color: ${({theme}) => theme.status.errorColorHover};
  }

  &:active {
    background-color: ${({theme}) => theme.status.errorColorActive};
  }
`;

// ONLY ICON BUTTON

export const IconButton = styled(BaseButton)`
  width: 40px;
  height: 40px;
  padding: 0;
  border-radius: 50%;
  border: 1px solid ${({theme}) => theme.primaryColor};
  fill: ${({theme}) => theme.primaryColor};

  & > svg {
    display: block;
    margin: auto;
  }

  &:hover {
    fill: ${({theme}) => theme.textColorInverted};
    background-color: ${({theme}) => theme.primaryHoverColor};
  }

  &:active {
    border-color: transparent;
    background-color: ${({theme}) => theme.primaryActiveColor};
  }

  &:disabled {
    fill: ${({theme}) => theme.textOnDisabled};
  }
`;
