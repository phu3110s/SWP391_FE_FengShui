import {
    ArcElement,
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip
} from 'chart.js';
import React, { useState } from "react";
import { Bar, Doughnut, Line, Pie } from "react-chartjs-2";
import "./DashboardChart.css";
import ChartData from '../../apis/ChartData';
import { message, Spin } from 'antd';
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);
export default function DashboardChart() {
    const [loading,setLoading] = useState(false)
    const [pieDataToday,setPieDataToday] = useState(null)
    const [pieDataRange,setPieDataRange] = useState(null);
    const today = new Date();
    const fetchPieDataToday = async()=>{
        setLoading(true)
        try{
            const reponse = await ChartData.getAdvertisingPieDataDaily(today);
        }catch(error){
            if(error.response) {
                const {status} = error.response;
                if(status === 401) {
                    message.error("Người dùng chưa xác thực")
                }if(status === 403){
                    message.error("Bạn không có quyền thực hiện hành động này")
                }else{
                    alert("Lỗi kết nối")
                }
            }
        }finally{
            setLoading(false);
        }
        
    }
    const lineData = {
        labels: ["Monday" , "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday","Sunday"],
        datasets: [
            {
                label: "Weekly Sales ",
                data: [12, 19, 3, 5, 2, 3,10],
                borderColor: "rgba(75,192,192,1)",
                backgroundColor: "rgba(75,192,192,0.2)",
            },
        ],
    };

    const barData = {
        labels: ["1", "2", "3", "4", "5", "6"],
        datasets: [
            {
                label: "Doanh thu ",
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(255, 159, 64, 0.2)",
                ],
                borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)",
                ],
                borderWidth: 1,
            },
        ],
    };
    const pieData = {
        labels: ["Số bài đã xóa", "Số bài đã duyệt", "Số bài đang chờ duyệt"],
        datasets: [
            {
                label: "Quản lí số lượng bài đăng trong hôm nay",
                data: [30, 50, 31],
                backgroundColor: [
                    "rgba(174, 198, 207, 0.8)",  
                    "rgba(255, 182, 193, 0.8)", 
                    "rgba(255, 223, 186, 0.8)",
                ],
                borderColor: [
                    "rgba(105, 155, 205, 1)",  
                    "rgba(255, 105, 135, 1)",  
                    "rgba(255, 183, 88, 1)",   
                ],
                borderWidth: 2,
            },
        ],
    };
     const pieData_weekly = {
        labels: ["Số bài đã xóa", "Số bài đã duyệt", "Số bài đang chờ duyệt"],
        datasets: [
            {
                label: "Quản lí số lượng bài đăng trong 1 tuần",
                data: [21, 51, 12],
                backgroundColor: [
                    "rgba(174, 198, 207, 0.8)",  
                    "rgba(255, 182, 193, 0.8)", 
                    "rgba(255, 223, 186, 0.8)",
                ],
                borderColor: [
                    "rgba(105, 155, 205, 1)",  
                    "rgba(255, 105, 135, 1)",  
                    "rgba(255, 183, 88, 1)",   
                ],
                borderWidth: 2,
            },
        ],
    };
    if(loading) return <Spin size='large' style={{marginRight:8}}/>
    return (
        <div className="dashboard-chart-container">
            <h2>Biểu đồ thống kê</h2>
            <div className="chart-row">
                <div className="pie-chart chart-container bar-chart">
                    <div className="pie-chart-daily">
                        <Pie data={pieData} />
                    </div>
                    <div className="pie-chart-weekly">
                     <Pie data={pieData} />
                    </div>
                    
                </div>       
            </div>
            <div className="pie-chart chart-container bar-chart">
                    <Bar data={barData} />
                </div>
            <div className='chart-row2 line-chart'>
                    <Line data={lineData} />
                </div> 
        </div>
    );
}