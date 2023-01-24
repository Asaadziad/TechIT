import axios from "axios";
import User from "../interfaces/User";

const usersApi: string = process.env.REACT_APP_API + "/users" || "";

//check user - login
export function checkUser(user: User) {
  return axios.get(usersApi + `?email=${user.email}&password=${user.password}`);
}
//add user - register
export function addUser(user: User) {
  return axios.post(usersApi, user);
}
