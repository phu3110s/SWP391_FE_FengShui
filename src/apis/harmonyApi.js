import axiosClient from "./axiosClient";

const harmonyApi = {
    createHarmony: (data) => {
        const url = "/harmonies";
        return axiosClient.post(url, data);
    },
    getHarmonyRating: (fishId, pondId, page, size) => {
        let url = `/harmonies?`;
        if (fishId) {
            url += `fishId=${fishId}&`;
        }
        if (pondId) {
            url += `pondId=${pondId}&`;
        }
        url += `page=${page}&size=${size}`;
        return axiosClient.get(url.replace(/&$/, ""));
    },
    getAllHarmony: () => {
        const url = `/harmonies`;
        return axiosClient.get(url);
    }
};
export default harmonyApi;
