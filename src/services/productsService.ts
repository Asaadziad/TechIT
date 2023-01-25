import axios from "axios";
import Product from "../interfaces/Product";

const api: string = process.env.REACT_APP_API + "/products" || "";
const categories_api: string = process.env.REACT_APP_API + "/categories" || "";

//get products
export function getProducts() {
  return axios.get(api);
}

//get products by id
export function getProductById(productId: number) {
  return axios.get(`${api}/${productId}`);
}

export function updateProduct(productId: number, newProduct: Product) {
  return axios.put(`${api}/${productId}`, newProduct);
}

export function addProduct(product: Product) {
  return axios.post(api, product);
}

export function deleteProduct(productId: number) {
  return axios.delete(`${api}/${productId}`);
}

export function getCategories() {
  return axios.get(categories_api);
}
