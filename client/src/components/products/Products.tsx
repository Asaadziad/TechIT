import { FunctionComponent, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { ThemeContext } from "../../hooks/context/ThemeContext";
import { UserContext } from "../../hooks/context/UserContext";
import { sendSuccessMessage } from "../../services/feedBack";
import Product from "../../interfaces/Product";
import { addProductToCart } from "../../services/cartServices";
import { getProducts } from "../../services/productsService";
import ProductCard from "./ProductCard";
import "./products.css";
import AddProduct from "../modals/AddProduct";

interface ProductsProps {}

const Products: FunctionComponent<ProductsProps> = () => {
  let userContext = useContext(UserContext);
  let themeContext = useContext(ThemeContext);
  let [openAddProductModal, setOpenAddProductModal] = useState<boolean>(false);
  let [products, setProducts] = useState<any[]>([]);
  let [productsChanged, setProductsChanged] = useState<boolean>(false);
  let navigate = useNavigate();
  useEffect(() => {
    getProducts()
      .then((res) => {
        setProducts(res.data.products);
      })
      .catch((err) => console.log(err));
  }, [productsChanged]);

  let handleAddToCart = (productId : number) => {
    if (!userContext.isLoggedIn) navigate("/login");
    addProductToCart(productId).then((res) => {
      sendSuccessMessage("Added to cart successfully")
    }).catch(err => {
      console.log(err);
    });
    
  };
  let refresh = () => {
    setProductsChanged(!productsChanged);
  };
  return (
    <>
      <div
        className={`container bg-${
          themeContext.isLight ? "light" : "dark text-light"
        } products`}
      >
        <div className="container mt-5 pt-5">
          {userContext.isAdmin && (
            <button
              className="btn btn-success"
              onClick={() => setOpenAddProductModal(true)}
            >
              <i className="fa-solid fa-plus"></i> Add Product
            </button>
          )}
          <div className="row mt-5 pb-5 d-flex justify-content-center align-content-center">
            {products.length ? (
              products.map((item) => {
                return (
                  <ProductCard
                    key={item._id}
                    product={item}
                    addProductToCart={handleAddToCart}
                  />
                );
              })
            ) : (
              <div className="container d-flex justify-content-center align-content-center">
                <ClipLoader
                  color={"#a855f7"}
                  loading={true}
                  size={150}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <AddProduct
        show={openAddProductModal}
        onHide={() => setOpenAddProductModal(false)}
        refresh={refresh}
      />
    </>
  );
};

export default Products;
