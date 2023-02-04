import axios from "axios";
import Product from "../interfaces/Product";

const api: string = process.env.REACT_APP_API + "/carts" || "";

export async function addProductToCart(product: Product) {
  let products: Product[] = [];
  let userId: number = JSON.parse(
    sessionStorage.getItem("userData") as string
  )?.userId;
  let cartId = 0;
  try {
    await axios.get(`${api}?userId=${userId}`).then((res) => {
      cartId = res.data[0].id;
      products = res.data[0].products;
    });
    if (
      products.filter((item) => {
        return item.id === product.id;
      }).length
    ) {
      console.log("i was here");

      products[
        products.indexOf(
          products.filter((item) => {
            return item.id === product.id;
          })[0]
        )
      ].quantity++;
    } else {
      products.push(product);
    }

    return axios.patch(`${api}/${cartId}`, { products: products });
  } catch (error) {
    console.log(error);
  }
}

//create cart for user
export function createCart(userId: number) {
  return axios.post(api, { userId, products: [], active: true });
}
