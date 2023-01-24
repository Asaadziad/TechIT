import axios from "axios";

const api: string = process.env.REACT_APP_API + "/products" || "";
//get products
export function getProducts() {
  return axios.get(api);
}
