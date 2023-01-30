import { FunctionComponent } from "react";
import "./footer.css";
interface FooterProps {}

const Footer: FunctionComponent<FooterProps> = () => {
  return (
    <footer className="bg-light">
      <div className="container">
        <span className="brand">TechIT</span>
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
