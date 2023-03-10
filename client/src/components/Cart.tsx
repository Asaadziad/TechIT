import axios from "axios";
import { FunctionComponent, useContext, useEffect, useState } from "react";
import { UserContext } from "../hooks/context/UserContext";
import Product from "../interfaces/Product";
import { updateProduct } from "../services/productsService";
import "./cart.css";
interface CartProps {}

const Cart: FunctionComponent<CartProps> = () => {
  let userContext = useContext(UserContext);
  let [products, setProducts] = useState<Product[]>([]);
  let [total, setTotal] = useState<number>(0);
  let [productsChanged, setProductsChanged] = useState<boolean>(false);
  let refresh = () => {
    setProductsChanged(!productsChanged);
  };
  useEffect(() => {
    getProducts();
  }, [productsChanged]);

  let getProducts = async () => {
    try {
      // get userId from sessionStorage
      let userId: number = JSON.parse(
        sessionStorage.getItem("userData") as string
      ).userId;

      // get user cart (response object) according to his userId
      let cartRes = await axios.get(
        `${process.env.REACT_APP_API}/carts?userId=${userId}`
      );

      // get user cart (products numbers array)
      let products: Product[] = cartRes.data[0].products;

      let total = 0;
      for (let item of products) {
        console.log(item);
        total += parseInt(
          (item.price * (item.quantity > 0 ? item.quantity : 1)) as any
        );
      }
      setTotal(total);
      userContext.setCartItems(products.length);
      setProducts(products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container bg-light py-5">
        <h2 className="text-center text-uppercase mt-5">Your cart</h2>
        <div className="container d-flex justify-content-between mb-5">
          <button className="btn btn-secondary text-uppercase">
            Continue shopping
          </button>

          <button className="btn btn-primary text-uppercase">
            Checkout now
          </button>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-8 d-flex flex-column">
              {products.length ? (
                products.map((item: Product) => {
                  return (
                    <div className="itemCard" key={item.id}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="itemImg"
                      />
                      <div className="itemInfo ms-3">
                        <h3>{item.name}</h3>
                        <p>{item.description}</p>
                      </div>
                      <div className="orderInfo">
                        <p>
                          <i
                            className="fa-solid fa-plus me-2"
                            onClick={() => {
                              updateProduct(item.id as number, {
                                ...item,
                                quantity: item.quantity ? item.quantity + 1 : 2,
                              });
                              refresh();
                            }}
                          ></i>
                          {item.quantity ? item.quantity : 1}
                          <i
                            className="fa-solid fa-minus ms-2"
                            onClick={() => {
                              updateProduct(item.id as number, {
                                ...item,
                                quantity: item.quantity ? item.quantity - 1 : 1,
                              });
                              refresh();
                            }}
                          ></i>
                        </p>
                        <p>{item.price}</p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-danger">There is no products</p>
              )}
            </div>
            <div className="col-md-4">
              <div className="orderSummary">
                <h2 className="text-uppercase my-2">Order summary</h2>
                <span className="text-success text-uppercase w-100 px-4 py-4 d-flex justify-content-between">
                  <span>Subtotal:</span> <span>{total}</span>
                </span>
                <span className="text-success text-uppercase w-100 px-4 py-4 d-flex justify-content-between">
                  <span>Estimated shipping:</span> <span>{total}</span>
                </span>
                <span className="text-danger text-uppercase w-100 px-4 py-4 d-flex justify-content-between">
                  <span>Shipping Discount:</span> <span>{total}</span>
                </span>
                <h3 className="text-uppercase py-4">total: {total}</h3>
                <button className="btn btn-primary text-uppercase my-3 w-75">
                  checkout now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
