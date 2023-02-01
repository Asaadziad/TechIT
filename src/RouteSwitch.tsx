import { FunctionComponent } from "react";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AdminPanel from "./components/AdminPanel";

import Cart from "./components/Cart";
import Footer from "./components/footer/Footer";
import Home from "./components/Home";
import Login from "./components/Login";
import Navbar from "./components/navbar/Navbar";
import ProductPage from "./components/ProductPage";
import Products from "./components/Products";
import Profile from "./components/Profile";
import Register from "./components/Register";
import Test from "./components/Test";
import { UserContextProvider } from "./hooks/context/UserContext";

interface RouteSwitchProps {}

const RouteSwitch: FunctionComponent<RouteSwitchProps> = () => {
  return (
    <>
      <BrowserRouter>
        <UserContextProvider>
          <Navbar />
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/products">
              <Route index element={<Products />} />
              <Route path=":id" element={<ProductPage />} />
            </Route>
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/test" element={<Test />} />
          </Routes>
          <Footer />
        </UserContextProvider>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
};

export default RouteSwitch;
