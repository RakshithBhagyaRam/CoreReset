import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: false // set to true if you use cookies/auth
});

export default api;
