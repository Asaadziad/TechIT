import axios from "axios";

const api: string = process.env.REACT_APP_API + "/carts" || "";

export async function addProductToCart(productId: number) {
  let products: number[] = [];
  let userId: number = JSON.parse(
    sessionStorage.getItem("userData") as string
  )?.userId;
  let cartId = 0;
  try {
    await axios.get(`${api}?userId=${userId}`).then((res) => {
      cartId = res.data[0].id;
      products = res.data[0].products;
    });
    products.push(productId);
    return axios.patch(`${api}/${cartId}`, { products: products });
  } catch (error) {
    console.log(error);
  }
}

//create cart for user
export function createCart(userId: number) {
  return axios.post(api, { userId, products: [], active: true });
}
