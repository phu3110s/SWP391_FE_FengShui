import axiosClient from "./axiosClient";

const createPaymentLink = {
    postPayment: (data) => {
        const url = '/payment';
        return axiosClient.post(url, data)
    }
}

export default createPaymentLink;
