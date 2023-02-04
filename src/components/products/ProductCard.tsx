import { FunctionComponent, useContext } from "react";
import "./productcard.css";
import { ThemeContext } from "../../hooks/context/ThemeContext";
import Product from "../../interfaces/Product";
interface ProductCardProps {
  product: Product;
}

const ProductCard: FunctionComponent<ProductCardProps> = ({ product }) => {
  const themeContext = useContext(ThemeContext);
  return (
    <>
      <div className="col-md-3">
        <div
          className={`product-card ${!themeContext.isLight && "dark"} my-2`}
          key={product.id}
        >
          <span className="fav">
            <i className="fa fa-heart"></i>
          </span>
          <div className="img-top onsale">
            <img src={product.image} alt="test" />
          </div>

          <div className="product-info">
            <h4 className="product-name">{product.name}</h4>
            <span className="price">
              <p className="product-price onsale">200$</p>
              <p>{product.price}</p>
            </span>
            <span className="rating">
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
            </span>
            <span className="actions mb-3">
              <button className="btn addToCart btn-5">
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
