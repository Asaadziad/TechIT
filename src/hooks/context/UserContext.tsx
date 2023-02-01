import { createContext, useState } from "react";

interface UserContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: Function;
  isAdmin: boolean;
  setIsAdmin: Function;
  cartItems: number;
  setCartItems: Function;
}

export const UserContext = createContext({} as UserContextType);

export const UserContextProvider = ({ children }: any) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    JSON.parse(sessionStorage.getItem("userData") as string)?.isLoggedIn ===
      true
      ? true
      : false
  );
  const [isAdmin, setIsAdmin] = useState<boolean>(
    JSON.parse(sessionStorage.getItem("userData") as string)?.isAdmin === true
      ? true
      : false
  );

  const [cartItems, setCartItems] = useState<number>(0);
  return (
    <UserContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        isAdmin,
        setIsAdmin,
        cartItems,
        setCartItems,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
