import axiosClient from "./axiosClient";

const blogApi = {
  postBlog: (data) => {
    const url = "/blogs";
    return axiosClient.post(url, data);
  },
  getBlogs: (page, size) => {
    const url = `/blogs?page=${page}&size=${size}`;
    return axiosClient.get(url);
  },
  getBlogById: (id) => {
    const url = `/blogs/${id}`;
    return axiosClient.get(url);
  },
  // getUserProfile: () => {
  //   const url = "/user/profile";
  //   return axiosClient.get(url);
  // },
  // updateUserProfile: (userInfo) => {
  //   const url = "/user/profile";
  //   return axiosClient.put(url, userInfo);
  // },
};

export default blogApi;
