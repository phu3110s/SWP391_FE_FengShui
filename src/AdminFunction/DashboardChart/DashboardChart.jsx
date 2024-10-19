import { message, Spin } from "antd";
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
  Tooltip,
} from "chart.js";
import React, { useEffect, useState } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import ChartData from "../../apis/ChartData";
import { DatePicker } from "antd";
import "./DashboardChart.css";
import moment from "moment/moment";

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
  const [loading, setLoading] = useState(false);
  const [pieDataToday, setPieDataToday] = useState(null);
  const [pieDataRange, setPieDataRange] = useState(null);
  const token = localStorage.getItem("token");
  const today = new Date().toISOString().split("T")[0];
  const [startDate, setStartDate] = useState(moment().startOf("month"));
  const [endDate, setEndDate] = useState(moment().endOf("day"));

  const fetchPieDataToday = async () => {
    setLoading(true);
    try {
      const response = await ChartData.getAdvertisingPieDataDaily(today, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { approvedPosts, declinedPosts, pendingPosts } = response.data;
      const newPieData = {
        labels: ["Số bài đã xóa", "Số bài đã duyệt", "Số bài đang chờ duyệt"],
        datasets: [
          {
            label: "Quản lí số lượng bài đăng trong hôm nay",
            data: [declinedPosts, approvedPosts, pendingPosts],
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

      setPieDataToday(newPieData);
    } catch (error) {
      if (error.response) {
        const { status } = error.response;
        if (status === 401) {
          message.error("Người dùng chưa xác thực");
        } else if (status === 403) {
          message.error("Bạn không có quyền thực hiện hành động này");
        } else {
          alert("Lỗi kết nối");
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchPieRangeData = async (startDate, endDate) => {
    setLoading(true);
    try {
      const response = await ChartData.getAdvertisingPieDataRange(
        startDate,
        endDate,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { approvedPosts, declinedPosts, pendingPosts } = response.data;
      const newRangePieData = {
        labels: ["Số bài đã xóa", "Số bài đã duyệt", "Số bài đang chờ duyệt"],
        datasets: [
          {
            label: `Quản lí số lượng bài đăng từ ngày ${startDate} đến ${endDate}`,
            data: [declinedPosts, approvedPosts, pendingPosts],
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

      setPieDataRange(newRangePieData);
    } catch (error) {
      if (error.response) {
        const { status } = error.response;
        if (status === 400) {
          message.error("Yêu cầu này không thể thực hiện");
        } else if (status === 401) {
          message.error("Phiên đăng nhập hết hạn");
        } else if (status === 403) {
          message.info("Đây là tính năng của quản trị viên");
        }
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPieDataToday();
    fetchPieRangeData(today, today);
  }, []);

  const lineData = {
    labels: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    datasets: [
      {
        label: "Weekly Sales ",
        data: [12, 19, 3, 5, 2, 3, 10],
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
        data: [3, 0, 0],
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

  const handleStartDateChange = (date) => {
    if (date === null) {
      setStartDate(date);
    } else {
      setStartDate(date);
    }

    if (date && endDate) {
      const formattedStartDate = moment(date).format("YYYY-MM-DD");
      const formattedEndDate = moment(endDate).format("YYYY-MM-DD");
      fetchPieRangeData(formattedStartDate, formattedEndDate);
    }
  };

  const handleEndDateChange = (date) => {
    if (date === null) {
      setEndDate(null);
    } else {
      setEndDate(date);
    }
    if (startDate && date) {
      const formattedStartDate = moment(startDate).format("YYYY-MM-DD");
      const formattedEndDate = moment(date).format("YYYY-MM-DD");
      fetchPieRangeData(formattedStartDate, formattedEndDate);
    }
  };

  if (loading) return <Spin size="large" style={{ marginRight: 8 }} />;

  return (
    <div className="dashboard-chart-container">
      <h2>Biểu đồ thống kê</h2>

      <div className="pie-chart-row">
        <div className="pie-chart chart-container">
          <div className="pie-chart-daily">
            {pieDataToday ? (
              pieDataToday.datasets[0].data.every((value) => value === 0) ? (
                <p>Hôm nay không có dữ liệu bài đăng.</p>
              ) : (
                <div className="pie-today-container">
                  <Pie data={pieDataToday} />
                  <strong className="chart-title">
                    Tổng hợp số bài đăng bán hôm nay
                  </strong>
                </div>
              )
            ) : (
              <p>
                Đang tải dữ liệu... <Spin size="large" />
              </p>
            )}
          </div>
        </div>

        <div className="pie-chart chart-container">
          <div className="pie-chart-range">
            {pieDataRange ? (
              startDate && endDate ? (
                pieDataRange.datasets[0].data.every((value) => value === 0) ? (
                  <p>
                    Không có dữ liệu bài đăng từ{" "}
                    {startDate.format("YYYY-MM-DD")} đến{" "}
                    {endDate.format("YYYY-MM-DD")}.
                  </p>
                ) : (
                  <div className="pie-range-container">
                    <Pie data={pieDataRange} />
                    <strong className="chart-title">
                      Tổng hợp số bài đăng bán từ ngày{" "}
                      {startDate.format("YYYY-MM-DD")} đến{" "}
                      {endDate.format("YYYY-MM-DD")}
                    </strong>
                  </div>
                )
              ) : (
                <p>Vui lòng chọn cả ngày bắt đầu và ngày kết thúc.</p> 
              )
            ) : (
              <p>
                Đang tải dữ liệu... <Spin size="large" />
              </p>
            )}
          </div>
          {/* Cái chọn ngày linh tinh , đang không config được nên chưa sửa */}
          <div className="date-picker">
            <DatePicker
              value={startDate}
              onChange={handleStartDateChange}
              format="YYYY-MM-DD"
              placeholder="Chọn ngày bắt đầu"
            />
            <DatePicker
              value={endDate}
              onChange={handleEndDateChange}
              format="YYYY-MM-DD"
              placeholder="Chọn ngày kết thúc"
            />
          </div>
        </div>
      </div>

      <div className="bar-chart chart-container">
        <Bar data={barData} />
        <strong className="chart-title">Doanh thu hàng tuần</strong>
      </div>

      <div className="line-chart chart-container">
        <Line data={lineData} />
        <strong className="chart-title">Doanh thu hàng tuần</strong>
      </div>
    </div>
  );
}
