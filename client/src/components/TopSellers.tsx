import { FunctionComponent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Product from "../interfaces/Product";
import { getProducts } from "../services/productsService";

interface TopSellersProps {}

const TopSellers: FunctionComponent<TopSellersProps> = () => {
  let [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    getProducts()
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);
  let navigate = useNavigate();
  return (
    <>
      {" "}
      <div className="container justify-content-md-center align-content-md-center">
        <h2 className="my-3">Our best sellers</h2>

        <div className="row">
          {products.length ? (
            products
              .filter((item) => {
                return item.purchases !== 0;
              })
              .sort((item: Product, item2: Product) => {
                return item2.purchases - item.purchases;
              })
              .slice(0, 4)
              .map((item) => {
                return (
                  <div className="col-md-3 my-1" key={item.id}>
                    <div
                      className="card text-danger"
                      style={{ height: "100%" }}
                    >
                      <div className="card-header">
                        <span>{item.category}</span>
                        <i className="fa-regular fa-heart"></i>
                      </div>
                      <div className="card-img-top">
                        <img
                          src={item.image}
                          alt="..."
                          onClick={() => navigate(`/products/${item.id}`)}
                        />
                      </div>
                      <div className="card-footer d-flex justify-content-between">
                        <span>{item.price}$</span>
                        <span>{item.purchases} purchases</span>
                      </div>
                    </div>
                  </div>
                );
              })
          ) : (
            <p>no products yet</p>
          )}
        </div>
      </div>
    </>
  );
};

export default TopSellers;
