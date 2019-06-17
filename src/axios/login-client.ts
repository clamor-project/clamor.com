import Axios from "axios";


export const loginClient = Axios.create({
  baseURL: 'http://localhost:1234/login',
  headers: {'content-type': 'application/json'},
  // we probably do not need credentials
  withCredentials: true
})