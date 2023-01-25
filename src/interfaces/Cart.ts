export default interface Cart {
  id?: number;
  userId: string;
  products: number[];
  active: boolean;
}
