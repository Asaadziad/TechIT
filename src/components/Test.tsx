import { FunctionComponent } from "react";
import "./test.css";

interface TestProps {}

const Test: FunctionComponent<TestProps> = () => {
  return (
    <>
      <div className="container bg-light">
        <div className="container mt-5 py-5 d-flex justify-content-center align-content-center">
          <div className="productCard">
            <div className="product-img">
              <button className="btn btn-primary">Add to cart</button>
            </div>
            <div className="product-info">
              <h1>prod name</h1>
              <p>prod price</p>
              <p>prod desc</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Test;
