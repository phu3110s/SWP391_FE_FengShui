import axiosClient from "./axiosClient";
const ChartData ={
    getAdvertisingPieDataDaily : (data) =>{
        const url = ``;
        return axiosClient.get(url)
    }
}
export default ChartData;