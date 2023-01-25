import { FunctionComponent } from "react";
import { NavLink, useNavigate } from "react-router-dom";

interface NavbarProps {
  isLoggedIn: boolean;
  setIsLoggedIn: Function;
}

const Navbar: FunctionComponent<NavbarProps> = ({
  isLoggedIn,
  setIsLoggedIn,
}) => {
  let navigate = useNavigate();
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
                  <i className="fa-solid fa-cart-shopping me-3 my-3"></i>Cart
                </NavLink>

                <button
                  className="btn btn-outline-danger"
                  onClick={() => {
                    setIsLoggedIn(false);
                    sessionStorage.setItem(
                      "userData",
                      JSON.stringify({ isLoggedIn: false, isAdmin: false })
                    );
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
