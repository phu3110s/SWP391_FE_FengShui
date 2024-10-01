import axiosClient from "./axiosClient";

const blogApi = {
  postBlog: (data) => {
    const url = "/blogs";
    return axiosClient.post(url, data);
  },
  getBlogs: (page, size, status) => {
    const url = `/blogs?status=${status}&page=${page}&size=${size}`;
    return axiosClient.get(url);
  },
  getBlogById: (id) => {
    const url = `/blogs/${id}`;
    return axiosClient.get(url);
  },
  uploadBlog: (FormData) => {
    const url = "/blogs";
    return axiosClient.post(url, FormData);
  },
  getUserBlog: (id, page, size, status) => {
    const url = `users/${id}/blogs?status=${status}&page=${page}&size=${size}`;
    return axiosClient.get(url);
  },
  approveBlog: (id, status) => {
    const url = `blogs/${id}/status`;
    return axiosClient.put(url, status);
  },
};

export default blogApi;
