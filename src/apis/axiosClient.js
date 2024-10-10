import axios from "axios";

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
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      alert("Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
