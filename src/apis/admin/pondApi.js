
import axiosClient from "../axiosClient";
const pondApi = {
  createPond: (data) => {
    const url = "/ponds";
    return axiosClient.post(url, data);
  },
  getPond: (page, size) => {
    const url = `/ponds?page=${page}&size=${size}`;
    return axiosClient.get(url, page, size)
  },
  getPondById: (id) => {
    const url = `/ponds/${id}`;
    return axiosClient.get(url)
  },
  deletePond: (id) => {
    const url = `/ponds/${id}`;
    return axiosClient.delete(url)
  },
  updatePond: (id, pondInfo) => {
    const url = `ponds/${id}/info`;
    return axiosClient.put(url, pondInfo)
  },
  updatePondImage: (id, pondImage) => {
    const url = `ponds/${id}/image`;
    return axiosClient.put(url, pondImage)
  }
};

export default pondApi;
