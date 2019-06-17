import Axios from "axios";

export const userClient = Axios.create({
  baseURL: 'http://localhost:1234/user',
  headers: {'content-type': 'application/json'},
  withCredentials: true
})
