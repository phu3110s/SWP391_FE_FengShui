import axiosClient from "./axiosClient";
const pondApi = {
  createPond: (data) => {
    const url = "/ponds";
    return axiosClient.post(url, data);
  },
};
export default pondApi;
