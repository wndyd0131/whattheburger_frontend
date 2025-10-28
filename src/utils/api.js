import axios from "axios";
import Cookies from "js-cookie";

const url = import.meta.env.VITE_BACKEND_URL;

const api = axios.create({
  baseURL: `${url}/api/v1`,
  withCredentials: true
});

api.interceptors.request.use(config => {
  const token = Cookies.get('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
})

export default api;