import { createContext, useState } from "react";

interface ThemeContextType {
  isLight: boolean;
  setIsLight: Function;
}

export const ThemeContext = createContext({} as ThemeContextType);

export const ThemeContextProvider = ({ children }: any) => {
  const [isLight, setIsLight] = useState<boolean>(
    JSON.parse(localStorage.getItem("theme") as string) === true ? true : false
  );
  return (
    <ThemeContext.Provider value={{ isLight, setIsLight }}>
      {children}
    </ThemeContext.Provider>
  );
};
