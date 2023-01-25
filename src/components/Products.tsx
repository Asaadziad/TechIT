import { FunctionComponent, useEffect, useState } from "react";
import { sendSuccessMessage } from "../interfaces/feedBack";
import Product from "../interfaces/Product";
import { addProductToCart } from "../services/cartServices";
import { deleteProduct, getProducts } from "../services/productsService";
import AddProduct from "./modals/AddProduct";

interface ProductsProps {
  isAdmin: boolean;
}

const Products: FunctionComponent<ProductsProps> = ({ isAdmin }) => {
  let [products, setProducts] = useState<Product[]>([]);
  let [openAddModal, setOpenAddModal] = useState<boolean>(false);
  let [productsChanged, setProductsChanged] = useState<boolean>(false);
  useEffect(() => {
    getProducts()
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, [productsChanged]);
  let handleAddProduct = () => {
    setOpenAddModal(true);
  };
  let handleAddToCart = (productId: number) => {
    addProductToCart(productId)
      .then(() => sendSuccessMessage("Added to cart successfully"))
      .catch((err) => console.log(err));
  };
  let refresh = () => {
    setProductsChanged(!productsChanged);
  };
  return (
    <>
      <div className="container mt-5">
        {isAdmin && (
          <button
            className="btn btn-success"
            onClick={() => handleAddProduct()}
          >
            <i className="fa-solid fa-plus"></i> Add Product
          </button>
        )}
        <div className="row justify-content-center mt-5">
          {products.length ? (
            products.map((item) => {
              return (
                <div
                  className="card m-1 col-md-4"
                  style={{
                    width: "18rem",
                  }}
                  key={item.id}
                >
                  <div className="card-header">{item.category}</div>
                  <img
                    src={item.image}
                    className="card-img-top"
                    style={{ height: "100%" }}
                    alt="..."
                  />
                  <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text">{item.description}</p>
                    <p className="text-success">{item.price}</p>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleAddToCart(item.id as number)}
                    >
                      <i className="fa-solid fa-cart-shopping me-3"></i>Add to
                      cart
                    </button>
                    {isAdmin && (
                      <>
                        <button className="btn btn-warning ms-1">
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
    </>
  );
};

export default Products;
