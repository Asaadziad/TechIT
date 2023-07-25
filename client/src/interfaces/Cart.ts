import Product from "./Product";

export default interface Cart {
  _id?: number;
  userId: string;
  products: Product[];
  active: boolean;
}
