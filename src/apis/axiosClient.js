import axios from "axios";
import userApi from "./userApi";
const axiosClient = axios.create({
  baseURL:
    "https://fengshuikoiapi-eahsenh5ckgqbzf7.southeastasia-01.azurewebsites.net/api/v1",

  headers: {
    "Content-Type": "application/json; charset=UTF-8",
    Accept: "application/json",
    "Accept-Language": "vi",
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
