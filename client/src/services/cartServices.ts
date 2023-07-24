import axios from "axios";
import Product from "../interfaces/Product";
import { sendErrorMessage } from "./feedBack";

const api: string = process.env.REACT_APP_API + "/carts" || "";
const token = JSON.parse(sessionStorage.getItem("userData") as string)?.token;

export async function addProductToCart(productId : number) {
  
 return axios.post(`${api}/${productId}`,{}, {
  headers: {
    Authorization: "Bearer " + token,
  },
 });
}

//deletes a product from user cart
export async function deleteFromCartById(productId: number) {
  
}

export async function getUserCart(){
  return axios.get(api, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
}
