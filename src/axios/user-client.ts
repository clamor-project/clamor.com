import Axios from "axios";

export const userClient = Axios.create({
  baseURL: 'http://localhost:1234/user',
  headers: {'Content-Type': 'application/json'},
  withCredentials: true
})
