
import { FunctionComponent, useContext, useEffect, useState } from "react";
import { UserContext } from "../hooks/context/UserContext";
import Product from "../interfaces/Product";
import "./cart.css";
import { getUserCart } from "../services/cartServices";
import ProductCard from "./products/ProductCard";
interface CartProps {}

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
        return <p>{item._id}</p>
      }) : <p>no products</p>}

    </div>
    </>
  );
};

export default Cart;
