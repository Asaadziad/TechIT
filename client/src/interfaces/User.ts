export default interface User {
  id?: number;
  name?: string;
  email: string;
  password: string;
  isAdmin?: boolean;
  image?: string;
  purchases?: number;
}
