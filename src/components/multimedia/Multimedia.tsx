import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import "./multimedia.css";

interface MultimediaProps {}

const Multimedia: FunctionComponent<MultimediaProps> = () => {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <div className="imgContainer">
              <img
                src="https://thumbs.dreamstime.com/b/laptop-computer-banner-background-above-black-wood-37921311.jpg"
                alt="lap"
                style={{ width: "100%", height: "100%" }}
              />
              <div className="img-overlay">
                <Link to="/">Click here for more {"->"}</Link>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="row" style={{ minHeight: "300px" }}>
              <div className="imgContainer">
                <img
                  src="https://hotstore.hotmobile.co.il/media/catalog/product/cache/a73c0d5d6c75fbb1966fe13af695aeb7/p/i/pixlr-bg-result_21_.png"
                  alt="test"
                  style={{ width: "100%", height: "100%" }}
                />
                <div className="img-overlay">
                  <Link to="/">Click here for more {"->"}</Link>
                </div>
              </div>
            </div>
            <div className="row" style={{ minHeight: "300px" }}>
              <div className="imgContainer">
                <img
                  src="https://hotstore.hotmobile.co.il/media/catalog/product/cache/a73c0d5d6c75fbb1966fe13af695aeb7/n/h/nhqgyec004_nitro5-an515-58-redkb-black-gall.png"
                  alt="test"
                  style={{ width: "100%", height: "100%" }}
                />
                <div className="img-overlay">
                  <Link to="/">Click here for more {"->"}</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Multimedia;
