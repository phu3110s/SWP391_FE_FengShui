import axios from "axios";

export const Api = () => {
    return axios.create({
        baseURL: "https://feng-shui-koi.onrender.com/api/v1"
    })
}