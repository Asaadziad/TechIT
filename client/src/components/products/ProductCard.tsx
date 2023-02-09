import { FunctionComponent, useContext } from "react";
import "./productcard.css";
import { ThemeContext } from "../../hooks/context/ThemeContext";
import Product from "../../interfaces/Product";
import { Rating } from "react-simple-star-rating";

interface ProductCardProps {
  product: Product;
  addProductToCart: Function;
}

const ProductCard: FunctionComponent<ProductCardProps> = ({
  product,
  addProductToCart,
}) => {
  const themeContext = useContext(ThemeContext);
  return (
    <>
      <div className="col-md-3">
        <div className={`product-card ${!themeContext.isLight && "dark"} my-2`}>
          <div className="img-top onsale"></div>

          <div className="product-info">
            <span className="product-info-header">
              <h5 className="ms-1">{product.name}</h5>
              <i className="fa fa-heart mb-1 me-2"></i>
            </span>

            <span className="price">
              <p className="product-price onsale">200$</p>
              <p>{product.price}</p>
            </span>

            <span className="rating">
              <Rating
                initialValue={product.rating ? product.rating : 0}
                readonly={true}
                allowFraction={true}
              />
            </span>

            <span className="actions mb-3">
              <button
                className="btn addToCart btn-5"
                onClick={() => addProductToCart(product)}
              >
                <i className="fa-solid fa-cart-shopping me-3"></i>
                Add to Cart
              </button>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
