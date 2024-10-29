import axiosClient from "./axiosClient";
const ChartData ={
    getAdvertisingPieDataDaily : (date) =>{
        const url = `/advertisings/daily-report?date=${date}`;
        return axiosClient.get(url)
    },
    getAdvertisingPieDataRange: (startDate,endDate) =>{
        const url = `/advertisings/range-report?startDate=${startDate}&endDate=${endDate}`;
        return axiosClient.get(url);
    },
    getLineData: (startDate,endDate) =>{
        const url = `/transactions/report-daily?startDate=${startDate}&endDate=${endDate}`;
        return axiosClient.get(url) 
    },
    getBarData:() =>{
        const url = '/transactions/report-weekly'
        return axiosClient.get(url)
    }
}
export default ChartData;