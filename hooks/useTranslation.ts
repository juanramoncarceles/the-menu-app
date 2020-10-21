import { useContext } from "react";

import { StateContext } from "../contexts/AppContext";
import strings from "../translations/strings";
import { locales } from "../translations/config";

const useTranslation = () => {
  const { locale } = useContext(StateContext);

  const t = (key: string) => {
    if (!strings[locale][key]) {
      console.warn(`Translation "${key}" for locale "${locale}" not found.`);
    }
    return strings[locale][key] || strings[locales[0]][key] || "";
  }

  return {
    t,
    locale,
  }
}

export default useTranslation;
