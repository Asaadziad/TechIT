import { FunctionComponent, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../hooks/context/UserContext";
import { sendErrorMessage, sendSuccessMessage } from "../../services/feedBack";
import Product from "../../interfaces/Product";
import { addProductToCart } from "../../services/cartServices";
import { getProductById } from "../../services/productsService";
import Multimedia from "../multimedia/Multimedia";
import "./productpage.css";
interface ProductPageProps {}

const ProductPage: FunctionComponent<ProductPageProps> = () => {
  let userContext = useContext(UserContext);
  let [product, setProduct] = useState<Product>();
  let [suggestions, setSuggestions] = useState<Product[]>([]);
  let [quantity, setQuantity] = useState<number>(1);
  let { id } = useParams();
  let updateQuantity = (type: string) => {
    switch (type as string) {
      case "inc":
        setQuantity(quantity + 1);
        break;
      case "dec":
        setQuantity(quantity - 1);
        break;
    }
  };
  let handleAddToCart = (product: Product) => {
    addProductToCart(product)
      .then(() => {
        sendSuccessMessage("Added to cart successfully");
        userContext.setCartItems(userContext.cartItems + 1);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getProductById(parseInt(id as string))
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <div className="container bg-light">
        <div className="container mt-5 py-5">
          {product ? (
            <>
              <div className="row">
                <div className="col-md-6 productMultimedia">
                  <Multimedia images={product.image} />
                </div>
                <div className="col-md-6 productInfo">
                  <h3>{product.name}</h3>
                  <h4 className="my-5">{product.price}</h4>
                  <h5>Quantity</h5>
                  <span className="q-functions">
                    <i
                      className="fa-solid fa-circle-minus px-2"
                      onClick={() => {
                        quantity > 1
                          ? updateQuantity("dec")
                          : sendErrorMessage("Error");
                      }}
                    ></i>
                    <span className="w-16">{quantity}</span>
                    <i
                      className="fa-solid fa-circle-plus px-2"
                      onClick={() => updateQuantity("inc")}
                    ></i>
                  </span>
                  <span>
                    <button
                      className="btn btn-primary addToCart"
                      onClick={() => handleAddToCart(product as Product)}
                    >
                      Add to Cart
                    </button>
                  </span>
                </div>
              </div>
            </>
          ) : (
            <p>There's no such product</p>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductPage;
