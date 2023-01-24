import { FunctionComponent, useEffect, useState } from "react";
import Product from "../interfaces/Product";
import { getProducts } from "../services/productsService";

interface ProductsProps {
  isAdmin: boolean;
}

const Products: FunctionComponent<ProductsProps> = ({ isAdmin }) => {
  let [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    getProducts()
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <div className="container d-flex justify-content-md-center align-items-md-center mt-5">
        {isAdmin && <button className="btn btn-success">Add Product</button>}
        <div className="row justify-content-center">
          {products.length ? (
            products.map((item) => {
              return (
                <div
                  className="card m-1 col-md-4"
                  style={{
                    width: "18rem",
                  }}
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
                    <button className="btn btn-primary">
                      <i className="fa-solid fa-cart-shopping me-3"></i>Add to
                      cart
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <p>no products</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Products;
