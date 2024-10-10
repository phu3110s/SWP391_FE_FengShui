import axiosClient from "./axiosClient";

const createPaymentLink = {
    postPaymentPlan: (data) => {
        const url = "/payment-plans";
        return axiosClient.post(url, data);
    },
    getPaymentPlan: (page, size) => {
        const url = `/payment-plans?page=${page}&size=${size}`;
        return axiosClient.get(url);
    },
    getPaymentPlanById: (id) => {
        const url = `/payment-plans/${id}`;
        return axiosClient.get(url);
    },
    uploadPaymentPlan: (FormData) => {
        const url = "/payment-plans";
        return axiosClient.post(url, FormData);
    },
    approvePaymentPlan: (id) => {
        const url = `payment-plans/${id}`;
        return axiosClient.put(url);
    },
}

export default createPaymentLink;
