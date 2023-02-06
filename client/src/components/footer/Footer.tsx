import { FunctionComponent, useContext } from "react";
import { ThemeContext } from "../../hooks/context/ThemeContext";
import "./footer.css";
import Subscribe from "./Subscribe";
interface FooterProps {}

const Footer: FunctionComponent<FooterProps> = () => {
  const themeContext = useContext(ThemeContext);
  return (
    <footer
      className={`bg-${themeContext.isLight ? "light" : "dark text-light"}`}
    >
      <Subscribe />
      <div className="container">
        <span className="brand">
          © 2023 TechIT. by <i className="fab fa-github"> / </i>Asaadziad
        </span>
        <span className="socials">
          <i className="fab fa-instagram fa-xl"></i>
          <i className="fab fa-linkedin fa-xl"></i>
          <i className="fab fa-twitter fa-xl"></i>
          <i className="fab fa-github fa-xl"></i>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
