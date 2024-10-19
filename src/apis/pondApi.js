import axiosClient from "./axiosClient";
const pondApi = {
  createPond: (data) => {
    const url = "/ponds";
    return axiosClient.post(url, data);
  },
  getPond: (page,size) =>{
    const url = `/ponds?page=${page}&size=${size}`;
    return axiosClient.get(url,page,size)
  },
  getPondById:(id) =>{
    const url = `/ponds/${id}`;
    return axiosClient.get(url)
  }
};

export default pondApi;
