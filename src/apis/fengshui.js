import axiosClient from "./axiosClient";
const fengshuiApi = {
    getFengShuiElementByDate : (data) => {
        const url = `/feng-shui/Element?BirthDate=${data}`;
        return axiosClient.get(url)
    }
}
export default fengshuiApi;