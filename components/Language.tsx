import { useContext } from "react";
import { useRouter } from "next/router";

import { locales, languageNames } from "../translations/config";
import { ActionTypes } from "../types/enums";
import { Locale, isLocale } from "../translations/types";
import { DispatchContext } from "../contexts/AppContext";

const LanguageSelect = () => {
  const dispatch = useContext(DispatchContext);

  const router = useRouter();

  const createLangOptions = (languagesData: {[key in Locale]: string}) => {
    const options = [];
    for (const [key, value] of Object.entries(languagesData)) {
      options.push(<option value={key} key={key}>{value}</option>);
    }
    return options;
  };

  return (
    <div className="root">
      <label htmlFor="lang">LANG</label>
      <select name="lang" id="lang" onChange={(e) => {
        // Creates the new path by replacing the locale in the current path for the new locale.
        const langPath = router.asPath.replace(`/${router.query.lang}/`, `/${e.target.value}/`);
        router.push(langPath);
        dispatch({ type: ActionTypes.ChangeLanguage, payload: isLocale(e.target.value) ? e.target.value : locales[0] });
      }}>
        {createLangOptions(languageNames)}
      </select>

      <style jsx>{`
        .root {
          position: absolute;
          right: 10px;
          top: 10px;
        }
      `}</style>
    </div>
  );
};

export default LanguageSelect;
