import axios from "axios";
import axiosClient from "./axiosClient";
const fishApi = {
  generateFish: (data) => {
    const url = "/fishes";
    return axiosClient.post(url, data);
  },
  getFish: (page, size) => {
    const url = `/fishes?page=${page}&size=${size}`;
    return axiosClient.get(url, page, size);
  },
};
export default fishApi;
