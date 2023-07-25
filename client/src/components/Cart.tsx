
import { FunctionComponent, useContext, useEffect, useState } from "react";
import { UserContext } from "../hooks/context/UserContext";
import Product from "../interfaces/Product";
import "./cart.css";
import { getUserCart } from "../services/cartServices";
interface CartProps {}

interface ProductProps {
  product: Product;
}

let ProductCard : FunctionComponent<ProductProps> = ({product}) => {
  return (
    <div className="card" style={{width: "80%"}}>
  <div className="card-body">
    <div style={cardStyles}>
      <div>
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">{product.description}</p>
      </div>
      <span>X</span>
    </div>
    
  </div>
</div>
  );
}

const Cart: FunctionComponent<CartProps> = () => {
  let userContext = useContext(UserContext);
  let [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    getUserCart().then(res => {
      setProducts(res.data.myProducts);
    }).catch(err => console.log(err));
    
  }, []);

  return (
    <>
    <div className="container mt-5 py-5">
      {products.length ? products.map((item : Product) => {
        return <ProductCard product={item} />
      }) : <p>no products</p>}

    </div>
    </>
  );
};

let cardStyles = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  
}

export default Cart;
