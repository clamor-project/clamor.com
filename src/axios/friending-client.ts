import Axios from "axios";

export const friendingClient = Axios.create({
  baseURL: 'http://localhost:1234/friending',
  headers: {'Content-Type': 'application/json'},
  withCredentials: true
})
