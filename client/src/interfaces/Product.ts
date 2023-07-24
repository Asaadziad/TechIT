export default interface Product {
  _id?: number;
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
  quantity: number;
  purchases: number;
  rating?: number;
  onsale?: boolean;
}
