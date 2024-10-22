import axiosClient from "./axiosClient";
const consultingApi = {
    postConsulting: (data) =>{
        const url ='/consultings'
        return axiosClient.post(url,data)
    },
    getConsulting : (page,size,id) =>{
        const url = `/feng-shui/${id}/consultings?page=${page}&size=${size}`
        return axiosClient.get(url)
    }
}
export default consultingApi;