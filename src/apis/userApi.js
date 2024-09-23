import axiosClient from "./axiosClient";

const userApi = {
  login: (userInfo) => {
    const url = "/auth/login";
    return axiosClient.post(url, userInfo);
  },

  register: (userInfo) => {
    const url = "/auth/register";
    return axiosClient.post(url, userInfo);
  },
  getUserProfile: () => {
    const url = "/user/profile";
    return axiosClient.get(url);
  },
  updateUserProfile: (userInfo) => {
    const url = "/user/profile";
    return axiosClient.put(url, userInfo);
  },
};

export default userApi;
