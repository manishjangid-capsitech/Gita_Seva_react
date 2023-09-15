import React from "react";
import i18n from "../i18n";

export type Locales = "hi" | "en";
interface ILocaleContextProps {
  locale: Locales;
  setLocale: React.Dispatch<React.SetStateAction<Locales>>;
}

const LocaleContext = React.createContext<ILocaleContextProps>({} as any);
export function LocaleProvider(props: { children: any }) {
  const [locale, setLocale] = React.useState<Locales>("hi");

  React.useEffect(() => {
    i18n.on("languageChanged", (lng) => setLocale(lng as any));
  }, []);

  return <LocaleContext.Provider value={{ locale, setLocale }} {...props} />;
}
export function useLocale() {
  const context = React.useContext(LocaleContext);
  if (context === undefined) {
    throw new Error(`useLocale must be used within a LocaleProvider`);
  }
  return context;
}
export const userId = localStorage.getItem("UserId");

