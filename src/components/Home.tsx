import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import BrandInfo from "./BrandInfo";
import "./home.css";
import Multimedia from "./multimedia/Multimedia";
import TopSellers from "./TopSellers";

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
  return (
    <>
      <section className="banner">
        <h1 className="mb-5">TechIT</h1>
        <p className="mb-5">
          Dive into the tech scene with our fresh selection of gear
        </p>
        <div className="bannerMedia">
          <Link to="/products" className="btn btn-outline-secondary fw-bolder">
            Shop now
          </Link>
        </div>
      </section>
      <section className="about">
        <div className="container intro">
          <h3 className="display-5 pt-2 pb-5">Who are we?</h3>
          <p className="w-50">
            TechIT is an e-commerce platform that specializes in providing the
            latest and greatest in technology gear and gadgets. We offer a wide
            selection of products from the top brands in the industry, and are
            committed to providing our customers with the best shopping
            experience possible.
          </p>
        </div>
        <TopSellers />
      </section>
      <section className="multimedia mt-5">
        <Multimedia />
      </section>
      <section className="brandInfo mt-5">
        <BrandInfo />
      </section>
    </>
  );
};

export default Home;
