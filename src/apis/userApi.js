import axiosClient from "./axiosClient";

const userApi = {
  login: (userInfo) => {
    const url = "/auth/login";
    return axiosClient.post(url, userInfo);
  },
  register: (userInfo) => {
    const url = "/api/v1/user";
    return axiosClient.post(url, userInfo);
  },
  getAll: (page, size) => {
    const url = `/users?page=${page}&status=${size}`;
    return axiosClient.get(url);
  },
  getUserProfile: (id) => {
    const url = `users/${id}`;
    return axiosClient.get(url);
  },
  updateUserProfile: (id, userInfo) => {
    const url = `users/${id}/info`;
    return axiosClient.put(url, userInfo);
  },
  updateUserImage: (id, image) => {
    const url = `users/${id}/image`;
    return axiosClient.put(url, image);
  },
};

export default userApi;
