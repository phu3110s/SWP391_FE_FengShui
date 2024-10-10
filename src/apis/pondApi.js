import axiosClient from "./axiosClient";
const pondApi = {
  createPond: (data) => {
    const url = "/ponds";
    return axiosClient.post(url, data);
  },
  getPond: (page,size) =>{
    const url = `/ponds?page=${page}&size=${size}`;
    return axiosClient.get(url,page,size)
  }
};

export default pondApi;
