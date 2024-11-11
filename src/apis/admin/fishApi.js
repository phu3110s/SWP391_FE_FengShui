import axios from "axios";
import axiosClient from "../axiosClient";
const fishApi = {
  generateFish: (data) => {
    const url = "/fishes";
    return axiosClient.post(url, data);
  },
  getFish: (page, size) => {
    const url = `/fishes?page=${page}&size=${size}`;
    return axiosClient.get(url, page, size);
  },
  getFishById: (id) => {
    const url = `/fishes/${id}`
    return axiosClient.get(url)
  },
  deleteFish: (id) => {
    const url = `fishes/${id}`
    return axiosClient.delete(url)
  },
  updateFish: (id, fishInfo) => {
    const url = `fishes/${id}/info`;
    return axiosClient.put(url, fishInfo)
  },
  updateFishImage: (id, image) => {
    const url = `fishes/${id}/image`;
    return axiosClient.put(url, image)
  }
};
export default fishApi;
