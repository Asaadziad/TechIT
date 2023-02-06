import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import "./multimedia.css";

interface MultimediaProps {
  images: string;
}

const Multimedia: FunctionComponent<MultimediaProps> = ({ images }) => {
  return (
    <>
      <div
        className="d-flex justify-content-center align-content-center"
        style={{ maxHeight: "500px" }}
      >
        <img src={images} width="100%" alt="product" />
      </div>
    </>
  );
};

export default Multimedia;
