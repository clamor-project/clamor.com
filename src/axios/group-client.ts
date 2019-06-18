import axios from 'axios'

export const groupClient = axios.create({
  baseURL: 'http://localhost:1234/group',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true
})
