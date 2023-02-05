import { FunctionComponent, useContext } from "react";
import { NavLink } from "react-router-dom";
import { ThemeContext } from "../../hooks/context/ThemeContext";
import { UserContext } from "../../hooks/context/UserContext";
import { deleteFromCartById } from "../../services/cartServices";
import { sendSuccessMessage } from "../../services/feedBack";

interface DropDownCartProps {}

const DropDownCart: FunctionComponent<DropDownCartProps> = () => {
  let themeContext = useContext(ThemeContext);
  let userContext = useContext(UserContext);
  return (
    <div className="cartDropDown">
      <NavLink
        className="btn btn-primary mx-2 position-relative myCart"
        to="/cart"
      >
        <span className="cart">
          <span className="cart-icon">
            <i className="fa-solid fa-cart-shopping me-3 my-1"></i>
          </span>
          {userContext.cartItems > 0 && (
            <span className="cartNew">{userContext.cartItems}</span>
          )}

          <span className="cart-text">Cart</span>
        </span>
      </NavLink>

      <ul
        className={`dropdown-cart ${
          themeContext.isLight ? "bg-light" : "bg-dark text-light"
        }`}
      >
        {userContext.cartProducts.length ? (
          <div className="navCart">
            {userContext.cartProducts.map((item) => {
              return (
                <div className="cart-card">
                  <div className="cart-card product-img">
                    <img
                      src={item.image}
                      width="100%"
                      height="100%"
                      alt="product"
                    />
                  </div>
                  <div className="cart-card product-info">
                    <span>{item.name}</span>
                    <span>{item.price}</span>
                    <span className="quantity">
                      <span className="flexbox center-all-items">
                        <i className="fa fa-plus flex"></i>
                      </span>
                      <span className="flexbox center-all-items">
                        {item.quantity ? item.quantity : 1}
                      </span>

                      <span className="flexbox center-all-items">
                        <i className="fa fa-minus flex"></i>
                      </span>
                    </span>
                  </div>
                  <div className="cart-card product-delete">
                    <i
                      className="fa-sharp fa-solid fa-x"
                      onClick={() =>
                        deleteFromCartById(item.id as number)
                          .then(() => {
                            userContext.setCartItems(userContext.cartItems - 1);
                            sendSuccessMessage("Item deleted successfully");
                          })
                          .catch((err) => console.log(err))
                      }
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p>No items in cart</p>
        )}
      </ul>
    </div>
  );
};

export default DropDownCart;
