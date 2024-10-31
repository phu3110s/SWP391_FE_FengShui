import axiosClient from "./axiosClient";

const userApi = {
  login: (userInfo) => {
    const url = "/auth/login";
    return axiosClient.post(url, userInfo);
  },
  register: (data) => {
    const url = "/users";
    return axiosClient.post(url, data);
  },
  getAll: (page, size) => {
    const url = `/users?page=${page}&size=${size}`;
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
  deactivate: (id) => {
    const url = `users/${id}/deactivate`
    return axiosClient.put(url, id)
  },
  getAdvertisingByUser: (id, page, size, status) => {
    const url = `users/${id}/advertising?page=${page}&size=${size}&status=${status}`;
    return axiosClient.get(url);
  }
};

export default userApi;
