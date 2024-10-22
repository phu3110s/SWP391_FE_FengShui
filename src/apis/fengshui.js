import axios from "axios";
import axiosClient from "./axiosClient";
const fengshuiApi = {
    getFengShuiElementByDate : (data) => {
        const url = `/feng-shui/birth?BirthDate=${data}`;
        return axiosClient.get(url)
    },
    getFengShuiById : (id) =>{
        const url =`/feng-shui/${id}`;
        return axiosClient.get(url)
    },
    getAllFengShui : (page,size)=>{
        const url = `/feng-shui?page=${page}&size=${size}`
        return axiosClient.get(url)
    }
}
export default fengshuiApi;