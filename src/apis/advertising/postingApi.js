import axiosClient from "../axiosClient";

const postingApi = {
    postAdvertisings: (data) => {
        const url = "/advertisings";
        // return axiosClient.post(url, data);
        return axiosClient.post(url, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },
    getAdvertisings: (page, size, status) => {
        const url = `/advertisings?status=${status}&page=${page}&size=${size}`;
        // const url = `/advertisings?page=${page}&size=${size}`;
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
    getUserAdvertisings: (page, size, status) => {
        const url = `/advertisings?status=${status}&page=${page}&size=${size}`;
        return axiosClient.get(url);
    },
    approveAdvertisings: (id, status) => {
        const url = `advertisings/${id}/status`;
        return axiosClient.put(url, status);
    },
    updateAdvertisingStatus: (id, data) => {
        const url = `/advertisings/${id}/status`;
        return axiosClient.put(url, data);
    },
    getDailyReport: () => {
        const url = '/advertisings/daily-report';
        return axiosClient.get(url);
    },
    getRangeReport: (params) => {
        const url = '/advertisings/range-report';
        return axiosClient.get(url, { params });
    },
    createPost: (data) => {
        return axiosClient.post('/advertisings', data);
    },

};

export default postingApi;
