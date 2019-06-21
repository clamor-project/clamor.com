import axios from 'axios'

export const eventClient = axios.create({
  baseURL: 'http://localhost:1234/event',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true
});