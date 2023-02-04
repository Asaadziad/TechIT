import { createContext, useState } from "react";

interface ThemeContextType {
  isLight: boolean;
  setIsLight: Function;
}

export const ThemeContext = createContext({} as ThemeContextType);

export const ThemeContextProvider = ({ children }: any) => {
  const [isLight, setIsLight] = useState<boolean>(true);
  return (
    <ThemeContext.Provider value={{ isLight, setIsLight }}>
      {children}
    </ThemeContext.Provider>
  );
};
