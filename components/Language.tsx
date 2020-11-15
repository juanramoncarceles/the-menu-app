import { useContext } from "react";
import { useRouter } from "next/router";

import { locales, languageNames } from "../translations/config";
import { ActionTypes } from "../types/enums";
import { Locale, isLocale } from "../translations/types";
import { DispatchContext } from "../contexts/AppContext";
import { styled } from "../styles";

const Root = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
  z-index: 20;
`;

const Select = styled.select`
  appearance: none;
  border: 1px solid transparent;
  padding: 4px 12px;
  font-family: inherit;
  font-size: 1rem;
  color: ${({ theme }) => theme.textColorInverted};
  cursor: pointer;
  background: none;

  :hover,
  :focus {
    border: 1px solid ${({ theme }) => theme.secondaryNeutralColor};
  }

  > option {
    color: ${({ theme }) => theme.textColor};
  }
`;

const LanguageSelect = () => {
  const dispatch = useContext(DispatchContext);

  const router = useRouter();

  const createLangOptions = (languagesData: { [key in Locale]: string }) => {
    const options = [];
    for (const [key, value] of Object.entries(languagesData)) {
      options.push(
        <option value={key} key={key}>
          {value}
        </option>
      );
    }
    return options;
  };

  return (
    <Root>
      <label htmlFor="lang">LANG</label>
      <Select
        name="lang"
        id="lang"
        value={router.query.lang}
        onChange={(e) => {
          // Creates the new path by replacing the locale in the current path for the new locale.
          const langPath = router.asPath.replace(
            `/${router.query.lang}/`,
            `/${e.target.value}/`
          );
          router.push(langPath);
          dispatch({
            type: ActionTypes.ChangeLanguage,
            payload: isLocale(e.target.value) ? e.target.value : locales[0],
          });
        }}
      >
        {createLangOptions(languageNames)}
      </Select>
    </Root>
  );
};

export default LanguageSelect;
