import { FunctionComponent } from "react";

interface SubscribeProps {}

const Subscribe: FunctionComponent<SubscribeProps> = () => {
  return (
    <div className="container-fluid subscribe">
      <div className="container">
        <div className="row w-100">
          <div className="col-md-3 footerInfo">
            <h1>test</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta
              vero numquam repellat voluptates amet consequatur fuga soluta
              ratione culpa nobis eaque aut ex laudantium atque, delectus
              temporibus quibusdam natus! Minima?
            </p>
          </div>
          <div className="col-md-3 footerInfo">
            <h1>test</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta
              vero numquam repellat voluptates amet consequatur fuga soluta
              ratione culpa nobis eaque aut ex laudantium atque, delectus
              temporibus quibusdam natus! Minima?
            </p>
          </div>
          <div className="col-md-3 footerInfo">
            <h1>test</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta
              vero numquam repellat voluptates amet consequatur fuga soluta
              ratione culpa nobis eaque aut ex laudantium atque, delectus
              temporibus quibusdam natus! Minima?
            </p>
          </div>
          <div className="col-md-3 footerInfo">
            <h1 className="logo">TechIT</h1>
            <p>
              Begin your tech journey with TechIT. Your path to a hi-tech future
              starts here. Embrace innovation and make it a reality.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
