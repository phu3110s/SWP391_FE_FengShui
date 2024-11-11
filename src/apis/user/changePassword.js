import axiosClient from "../axiosClient";

const passwordApi = {

    changePassword: (id, data) => {
        const url = `/auth/change-pw`;
        return axiosClient.post(url, data);
    },
};

export default passwordApi;