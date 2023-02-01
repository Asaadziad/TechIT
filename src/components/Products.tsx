import { FunctionComponent, useContext, useEffect, useState } from "react";
import { UserContext } from "../hooks/context/UserContext";
import { sendSuccessMessage } from "../interfaces/feedBack";
import Product from "../interfaces/Product";
import { addProductToCart } from "../services/cartServices";
import { deleteProduct, getProducts } from "../services/productsService";
import AddProduct from "./modals/AddProduct";
import UpdateProduct from "./modals/UpdateProduct";

interface ProductsProps {}

const Products: FunctionComponent<ProductsProps> = () => {
  let userContext = useContext(UserContext);
  let [products, setProducts] = useState<Product[]>([]);
  let [openAddModal, setOpenAddModal] = useState<boolean>(false);
  let [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);
  let [productsChanged, setProductsChanged] = useState<boolean>(false);
  let [productId, setProductId] = useState<number>(0);
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
  let handleAddToCart = (productId: number) => {
    addProductToCart(productId)
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
      <div className="container bg-light">
        <div className="container mt-md-5 pt-5">
          {userContext.isAdmin && (
            <button
              className="btn btn-success"
              onClick={() => handleAddProduct()}
            >
              <i className="fa-solid fa-plus"></i> Add Product
            </button>
          )}
          <div className="row justify-content-center mt-5 pb-5">
            {products.length ? (
              products.map((item) => {
                return (
                  <div
                    className="card m-1 col-md-4"
                    style={{
                      width: "18rem",
                      padding: "0",
                    }}
                    key={item.id}
                  >
                    <div className="card-header">{item.category}</div>
                    <div className="card-img-top">
                      <img src={item.image} alt="..." />
                    </div>

                    <div className="card-body">
                      <h5 className="card-title bold">{item.name}</h5>
                      <p className="card-text">{item.description}</p>
                      <p className="text-success">{item.price}</p>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleAddToCart(item.id as number)}
                      >
                        <i className="fa-solid fa-cart-shopping me-3"></i>Add to
                        cart
                      </button>
                      {userContext.isAdmin && (
                        <>
                          <button
                            className="btn btn-warning ms-1"
                            onClick={() =>
                              handleUpdateProduct(item.id as number)
                            }
                          >
                            <i className="fa-solid fa-pen-to-square"></i>
                          </button>
                          <button
                            className="btn btn-danger ms-1"
                            onClick={() => {
                              deleteProduct(item.id as number);
                              refresh();
                            }}
                          >
                            <i className="fa-solid fa-trash-can"></i>
                          </button>
                        </>
                      )}
                    </div>
                  </div>
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
