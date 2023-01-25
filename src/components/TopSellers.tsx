import { FunctionComponent, useEffect, useState } from "react";
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

  return (
    <>
      {" "}
      <div className="container justify-content-md-center align-content-md-center">
        <h2 className="my-3">Our best sellers</h2>

        <div className="row">
          {products.length ? (
            products
              .filter((item) => {
                return item.purchases != 0;
              })
              .sort((item: Product, item2: Product) => {
                return item2.purchases - item.purchases;
              })
              .slice(0, 4)
              .map((item) => {
                return (
                  <div className="col-md-3 my-1">
                    <div
                      className="card"
                      style={{ width: "18rem", height: "100%" }}
                    >
                      <img
                        src={item.image}
                        className="card-img-top"
                        style={{ height: "100%" }}
                        alt="..."
                      />
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
