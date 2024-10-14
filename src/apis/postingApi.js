import axiosClient from "./axiosClient";

const postingApi = {
    postAdvertisings: (data) => {
        const url = "/advertisings";
        return axiosClient.post(url, data);
    },
    getAdvertisings: (status, page, size) => {
        const url = `/advertisings?status=${status}&page=${page}&size=${size}`;
        return axiosClient.get(url);
    },
    getAdvertisingsById: (id) => {
        const url = `/advertisings/${id}`;
        return axiosClient.get(url);
    },
    uploadAdvertisings: (FormData) => {
        const url = "/advertisings";
        return axiosClient.post(url, FormData);

    },
    getUserAdvertisings: (id, page, size, status) => {
        const url = `users/${id}/advertisings?status=${status}&page=${page}&size=${size}`;
        return axiosClient.get(url);
    },
    approveAdvertisings: (id, status) => {
        const url = `advertisings/${id}/status`;
        return axiosClient.put(url, status);
    },
};

export default postingApi;
