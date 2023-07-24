import axios from "axios";
import Product from "../interfaces/Product";

const api: string = process.env.REACT_APP_API + "/products" || "";

const token = JSON.parse(sessionStorage.getItem("userData") as string)?.token;
//get products
export function getProducts() {
  return axios.get(api + "/getAll", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
}

//get all by Category
export function getProductsByCategory(category: string) {
  return axios.get(`${api}?category=${category}`);
}
//get products by id
export function getProductById(productId: number) {
  return axios.get(`${api}/${productId}`);
}

export function updateProduct(productId: number, newProduct: Product) {
  return axios.put(`${api}/${productId}`, newProduct, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
}

export function addProduct(product: Product) {
  return axios.post(api + "/add", product, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
}

export function deleteProduct(productId: number) {
  return axios.delete(`${api}/${productId}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
}
