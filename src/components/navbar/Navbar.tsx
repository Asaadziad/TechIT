import axios from "axios";
import { FunctionComponent, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./navbar.css";
interface NavbarProps {
  isLoggedIn: boolean;
  setIsLoggedIn: Function;
  cartItems: number;
  setCartItems: Function;
}

const Navbar: FunctionComponent<NavbarProps> = ({
  isLoggedIn,
  setIsLoggedIn,
  cartItems,
  setCartItems,
}) => {
  let navigate = useNavigate();
  let getCart = async () => {
    try {
      // get userId from sessionStorage
      let userId: number = JSON.parse(
        sessionStorage.getItem("userData") as string
      ).userId;
      let cartRes = await axios.get(
        `${process.env.REACT_APP_API}/carts?userId=${userId}`
      );
      // get user cart (products numbers array)
      let productsNum = cartRes.data[0].products.length;
      console.log(productsNum);
      setCartItems(productsNum);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCart();
  }, [isLoggedIn]);
  return (
    <>
      <nav className="navbar navbar-dark navbar-expand-lg bg-dark">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/home">
            TechIT
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" to="/products">
                  Products
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" to="/profile">
                  Profile
                </NavLink>
              </li>
            </ul>
            {isLoggedIn && (
              <div className="d-flex text-light">
                <NavLink className="nav-link me-3" to="/cart">
                  <span className="cart">
                    <span className="cart-icon">
                      <i className="fa-solid fa-cart-shopping me-3 my-3"></i>
                    </span>

                    <span className="cart-text">Cart</span>
                    <span className="cart-quantity ms-3 p-1">{cartItems}</span>
                  </span>
                </NavLink>

                <button
                  className="btn btn-outline-danger"
                  onClick={() => {
                    setIsLoggedIn(false);
                    sessionStorage.setItem(
                      "userData",
                      JSON.stringify({ isLoggedIn: false, isAdmin: false })
                    );
                    setCartItems(0);
                    navigate("/");
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
