import { FunctionComponent, useState } from "react";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./components/Home";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Products from "./components/Products";
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
  return (
    <>
      <BrowserRouter>
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
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
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
};

export default RouteSwitch;
