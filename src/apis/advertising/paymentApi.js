import axiosClient from "../axiosClient";

const paymentPlan = {
    getPaymentPlan: (page, size,) => {
        const url = `/payment-plans?page=${page}&size=${size}`;
        return axiosClient.get(url)
    },
    createPaymentPlan: (data) => {
        const url = `/payment-plans`
        return axiosClient.post(url, data)
    }
}

export default paymentPlan;
