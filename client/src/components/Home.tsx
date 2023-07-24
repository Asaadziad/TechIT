import { FunctionComponent, useContext } from "react";
import { ThemeContext } from "../hooks/context/ThemeContext";
import "./home.css";

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
  const themeContext = useContext(ThemeContext);
  return (
    <>
    
      <div
        className={`container bg-${
          themeContext.isLight ? "light" : "dark text-light"
        }`}
      >
        <div className="container mt-5 py-5">
          <section className="about">
            <div className="container intro">
              <h3 className="display-5 pt-2 pb-5">Who are we?</h3>
              <p className="w-50">
                TechIT is an e-commerce platform that specializes in providing
                the latest and greatest in technology gear and gadgets. We offer
                a wide selection of products from the top brands in the
                industry, and are committed to providing our customers with the
                best shopping experience possible.
              </p>
            </div>
            
          </section>

          <section className="brandInfo mt-5">
            
          </section>
        </div>
      </div>
    </>
  );
};

export default Home;
