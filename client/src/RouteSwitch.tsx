import { FunctionComponent, useContext } from "react";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AdminPanel from "./components/adminpanel/AdminPanel";

import Cart from "./components/Cart";
import Footer from "./components/footer/Footer";
import Home from "./components/Home";
import Login from "./components/Login";
import Navbar from "./components/navbar/Navbar";
import Products from "./components/products/Products";
import Profile from "./components/profile/Profile";
import Register from "./components/Register";
import {
  ThemeContext,
  ThemeContextProvider,
} from "./hooks/context/ThemeContext";
import { UserContextProvider } from "./hooks/context/UserContext";

interface RouteSwitchProps {}

const RouteSwitch: FunctionComponent<RouteSwitchProps> = () => {
  let themeContext = useContext(ThemeContext);
  return (
    <>
      <BrowserRouter>
        <ThemeContextProvider>
          <UserContextProvider>
            <Navbar />
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/products">
                <Route index element={<Products />} />
              </Route>
              <Route path="/cart" element={<Cart />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/admin" element={<AdminPanel />} />
            </Routes>
            <Footer />
            <ToastContainer theme={themeContext.isLight ? "light" : "dark"} />
          </UserContextProvider>
        </ThemeContextProvider>
      </BrowserRouter>
    </>
  );
};

export default RouteSwitch;
