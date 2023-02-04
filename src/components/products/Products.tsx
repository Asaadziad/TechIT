import { FunctionComponent, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../hooks/context/ThemeContext";
import { UserContext } from "../../hooks/context/UserContext";
import { sendSuccessMessage } from "../../interfaces/feedBack";
import Product from "../../interfaces/Product";
import { addProductToCart } from "../../services/cartServices";
import { deleteProduct, getProducts } from "../../services/productsService";
import AddProduct from "../modals/AddProduct";
import UpdateProduct from "../modals/UpdateProduct";
import ProductCard from "./ProductCard";
import "./products.css";

interface ProductsProps {}

const Products: FunctionComponent<ProductsProps> = () => {
  let userContext = useContext(UserContext);
  let themeContext = useContext(ThemeContext);
  let [products, setProducts] = useState<Product[]>([]);
  let [openAddModal, setOpenAddModal] = useState<boolean>(false);
  let [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);
  let [productsChanged, setProductsChanged] = useState<boolean>(false);
  let [productId, setProductId] = useState<number>(0);
  let navigate = useNavigate();
  useEffect(() => {
    getProducts()
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, [productsChanged]);
  let handleAddProduct = () => {
    userContext.setCartItems(userContext.cartItems + 1);
    setOpenAddModal(true);
  };
  let handleUpdateProduct = (productId: number) => {
    setOpenUpdateModal(true);
    setProductId(productId);
  };
  let handleAddToCart = (product: Product) => {
    addProductToCart(product)
      .then(() => {
        sendSuccessMessage("Added to cart successfully");
        userContext.setCartItems(userContext.cartItems + 1);
      })
      .catch((err) => console.log(err));
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
              onClick={() => handleAddProduct()}
            >
              <i className="fa-solid fa-plus"></i> Add Product
            </button>
          )}
          <div className="row mt-5 pb-5">
            {products.length ? (
              products.map((item) => {
                return (
                  <>
                    <ProductCard product={item} />
                  </>
                );
              })
            ) : (
              <p>no products</p>
            )}
          </div>
        </div>
        <AddProduct
          show={openAddModal}
          onHide={() => setOpenAddModal(false)}
          refresh={refresh}
        />
        <UpdateProduct
          show={openUpdateModal}
          onHide={() => setOpenUpdateModal(false)}
          refresh={refresh}
          productId={productId}
        />
      </div>
    </>
  );
};

export default Products;
