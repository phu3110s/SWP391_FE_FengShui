import axios from "axios";
import userApi from "./userApi";
const axiosClient = axios.create({
  baseURL: "https://feng-shui-koi.onrender.com/api/v1",
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
    return config;
  },
  function (error) {
    // Xử lý lỗi trước khi gửi request

    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  function (response) {
    // Xử lí response

    return response;
  },
  function (error) {
    // Xử lý lỗi từ response
    return Promise.reject(error);
  }
);

export default axiosClient;
