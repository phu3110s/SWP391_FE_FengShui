import axios from "axios";
import userApi from "./userApi";
const axiosClient = axios.create({
  // baseURL: "https://feng-shui-koi.onrender.com/api/v1",
  baseURL: "http://localhost:8080/api/v1",
  headers: {
    accept: "text/plain",
    "Content-Type": "application/json",
  },
});
axiosClient.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    } else {
      config.headers["Content-Type"] = "application/json";
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosClient;
