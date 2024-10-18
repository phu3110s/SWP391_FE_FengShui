import axiosClient from "./axiosClient";
const harmonyApi = {
    createHarmony : (data) =>{
        const url = "/harmonies";
        return axiosClient.post(url,data)
        
    }   ,
    getHarmonyRating: (fishId,pondId) =>{
        const url = `/harmonies?fishId=${fishId}&pondId=${pondId}`;
        return axiosClient.get(url)
    }
}
export default harmonyApi;