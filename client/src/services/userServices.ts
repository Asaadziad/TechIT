import axios from "axios";
import User from "../interfaces/User";

const usersApi: string = process.env.REACT_APP_API + "/users" || "";

//check user - login
export function checkUser(user: User) {
  return axios.get(usersApi + `?email=${user.email}&password=${user.password}`);
}
//get user by id
export function getUserById(userId: number) {
  return axios.get(`${usersApi}/${userId}`);
}
//get all users
export function getAllUsers() {
  return axios.get(`${usersApi}`);
}
//add user - register
export function addUser(user: User) {
  return axios.post(usersApi, user);
}
