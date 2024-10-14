import axiosClient from "./axiosClient";

const paymentPlan = {
    getPaymentPlan: (page, size,) => {
        const url = `/payment-plans?page=${page}&size=${size}`;
        return axiosClient.get(url)
    }
}

export default paymentPlan;
