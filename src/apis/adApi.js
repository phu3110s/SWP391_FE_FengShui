import axios from "axios";
import axiosClient from "./axiosClient";
const adApi = {
    getAll : (page,size) =>{
        const url = `/advertisings?page=${page}&size=${size}`
        return axiosClient.get(url);
    }
}
export default adApi;