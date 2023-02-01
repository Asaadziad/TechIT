import axios from "axios";
import { FunctionComponent, useContext, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../hooks/context/UserContext";
import Product from "../../interfaces/Product";
import "./navbar.css";

interface NavbarProps {}

const Navbar: FunctionComponent<NavbarProps> = () => {
  let userContext = useContext(UserContext);
  let navigate = useNavigate();
  let getCart = async () => {
    try {
      // get userId from sessionStorage
      let userId: number = JSON.parse(
        sessionStorage.getItem("userData") as string
      ).userId;
      let products: Product[] = [];
      // get user cart (response object) according to his userId
      let cartRes = await axios.get(
        `${process.env.REACT_APP_API}/carts?userId=${userId}`
      );

      // get user cart (products numbers array)
      let productsIds: number[] = cartRes.data[0].products;
      for (let id of productsIds) {
        let productRes = await axios.get(
          `http://localhost:8000/products/${id}`
        );
        products.push(productRes.data);
      }
      // get user cart (products numbers array)
      let productsNum = products.length;
      userContext.setCartItems(productsNum);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCart();
  }, [userContext.isLoggedIn, userContext.cartItems]);
  return (
    <>
      <nav className="navbar navbar-light navbar-expand-lg bg-light">
        <div className="container">
          <NavLink className="navbar-brand logo" to="/home">
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
              {userContext.isAdmin && (
                <li className="nav-item">
                  <NavLink className="nav-link text-warning" to="/admin">
                    Admin Panel
                  </NavLink>
                </li>
              )}
            </ul>
            {userContext.isLoggedIn ? (
              <div className="d-flex text-dark">
                <NavLink className="nav-link me-3" to="/cart">
                  <span className="cart">
                    <span className="cart-icon">
                      <i className="fa-solid fa-cart-shopping me-3 my-3"></i>
                    </span>

                    <span className="cart-text">Cart</span>
                    <span className="cart-quantity ms-3 p-1">
                      {userContext.cartItems}
                    </span>
                  </span>
                </NavLink>

                <button
                  className="btn btn-outline-danger"
                  onClick={() => {
                    userContext.setIsLoggedIn(false);
                    userContext.setIsAdmin(false);
                    sessionStorage.setItem(
                      "userData",
                      JSON.stringify({ isLoggedIn: false, isAdmin: false })
                    );
                    userContext.setCartItems(0);
                    navigate("/");
                  }}
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="d-flex">
                <button
                  className="btn btn-outline-primary"
                  onClick={() => navigate("/")}
                >
                  Login
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
