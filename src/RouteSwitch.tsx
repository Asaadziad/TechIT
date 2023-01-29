import { FunctionComponent, useState } from "react";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Cart from "./components/Cart";
import Footer from "./components/footer/Footer";
import Home from "./components/Home";
import Login from "./components/Login";
import Navbar from "./components/navbar/Navbar";
import Products from "./components/Products";
import Profile from "./components/Profile";
import Register from "./components/Register";

interface RouteSwitchProps {}

const RouteSwitch: FunctionComponent<RouteSwitchProps> = () => {
  let [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    JSON.parse(sessionStorage.getItem("userData") as string)?.isLoggedIn ===
      true
      ? true
      : false
  );
  let [isAdmin, setIsAdmin] = useState<boolean>(
    JSON.parse(sessionStorage.getItem("userData") as string)?.isAdmin === true
      ? true
      : false
  );
  let [cartItems, setCartItems] = useState<number>(0);
  return (
    <>
      <BrowserRouter>
        <Navbar
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          cartItems={cartItems}
          setCartItems={setCartItems}
        />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route
            path="/"
            element={
              <Login setIsAdmin={setIsAdmin} setIsLoggedIn={setIsLoggedIn} />
            }
          />
          <Route
            path="/register"
            element={<Register setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route path="/products" element={<Products isAdmin={isAdmin} />} />
          <Route
            path="/cart"
            element={
              <Cart isLoggedIn={isLoggedIn} setCartItems={setCartItems} />
            }
          />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <Footer />
      </BrowserRouter>
      <ToastContainer />
    </>
  );
};

export default RouteSwitch;
