import { DatePicker, message, Spin } from "antd";
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
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import ChartData from "../../apis/ChartData";
import "./DashboardChart.css";

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
  const [pieDataToday, setPieDataToday] = useState("");
  const [pieDataRange, setPieDataRange] = useState("");
  const [lineChartData, setLineChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Doanh thu 7 ngày gần nhất",
        data: [],
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
      },
    ],
  });
  const token = localStorage.getItem("token");
  const today = new Date().toISOString().split("T")[0];
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 6);
  const day = oneWeekAgo.getDate();
  const month = oneWeekAgo.getMonth() + 1;
  const year = oneWeekAgo.getFullYear();
  const [allAdvertising,setAllAdveritings] = useState(null)
  const startDateforLine = `${year}/${month}/${day}`;
  const [startDateforPie, setstartDateforPie] = useState(
    moment().startOf("month")
  );
  const [endDateforPie, setendDateforPie] = useState(moment().endOf("day"));
  const fetchPieDataToday = async () => {
    setLoading(true);
    try {
      const response = await ChartData.getAdvertisingPieDataDaily(today, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAllAdveritings(response.data.allPosts)
      const {
        draftPosts,
        expiredPosts,
        approvedPosts,
        declinedPosts,
        pendingPosts,
      } = response.data;
      const newPieData = {
        labels: [
          "Số bài chưa thanh toán",
          "Số bài đang chờ duyệt",
          "Số bài đã từ chối",
          "Số bài đã duyệt",
          "Số bài hết hạn",
        ],
        datasets: [
          {
            label: "Quản lí số lượng bài đăng trong hôm nay",
            data: [
              draftPosts,
              pendingPosts,
              declinedPosts,
              approvedPosts,
              expiredPosts,
            ],
            backgroundColor: [
              "rgba(211, 211, 211, 1)", // xanh nhạt
              "rgba(37, 137, 189, 1)", // xanh lam
              "rgba(255, 219, 69, 1)", // vàng
              " rgba(160, 212, 104, 1)", // xanh lá
              "rgba(252, 110, 81, 1)", // đỏ
            ],
            borderColor: [
              "rgba(211, 211, 211, 1)",
              "rgba(37, 137, 189, 1)",
              "rgba(160, 212, 104, 1)",
              "rgba(255, 219, 69, 1)",
              "rgba(252, 110, 81, 1)",
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

  const fetchPieRangeData = async (startDateforPie, endDateforPie) => {
    setLoading(true);
    try {
      const response = await ChartData.getAdvertisingPieDataRange(
        startDateforPie,
        endDateforPie,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const {
        draftPosts,
        expiredPosts,
        approvedPosts,
        declinedPosts,
        pendingPosts,
      } = response.data;
      const newRangePieData = {
        labels: [
          "Số bài chưa thanh toán",
          "Số bài đang chờ duyệt",
          "Số bài đã từ chối",
          "Số bài đã duyệt",
          "Số bài hết hạn",
        ],
        datasets: [
          {
            label: `Số lượng bài đăng từ ${startDateforPie} đến ${endDateforPie}`,
            data: [
              draftPosts,
              pendingPosts,
              declinedPosts,
              approvedPosts,
              expiredPosts,
            ],
            backgroundColor: [
              "rgba(211, 211, 211, 1)", // xanh nhạt
              "rgba(37, 137, 189, 1)", // xanh lam
              "rgba(255, 219, 69, 1)", // vàng
              " rgba(160, 212, 104, 1)", // xanh lá
              "rgba(252, 110, 81, 1)", // đỏ
            ],
            borderColor: [
              "rgba(211, 211, 211, 1)",
              "rgba(37, 137, 189, 1)",
              "rgba(160, 212, 104, 1)",
              "rgba(255, 219, 69, 1)",
              "rgba(252, 110, 81, 1)",
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
  const fetchLineData = async () => {
    setLoading(true);
    try {
      const response = await ChartData.getLineData(startDateforLine, today, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data.dailyReports;
      const labels = data.map((report) => {
        const date = new Date(report.date);
        return `${date.getDate()}/${date.getMonth() + 1}`;
      });
      const lineData = data.map((report) => report.totalAmount);
      console.log(labels, lineData);
      setLineChartData({
        labels,
        datasets: [
          {
            label: "Doanh thu 7 ngày gần nhất ",
            data: lineData,
            borderColor: "rgba(75,192,192,1)",
            backgroundColor: "rgba(75,192,192,0.2)",
          },
        ],
      });
    } catch (error) {
      if (error.response) {
        const { status } = error.response;
        if (status === 400) {
          message.error("Không thể lấy dữ liệu cho doanh thu tuần này");
        }
      }
    }
  };
  useEffect(() => {
    fetchPieDataToday();
    fetchPieRangeData(
      moment(startDateforPie).format("YYYY-MM-DD"),
      moment(endDateforPie).format("YYYY-MM-DD")
    );
    fetchLineData();
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

  const handlestartDateforPieChange = (date) => {
    if (date === null) {
      setstartDateforPie(date);
    } else {
      setstartDateforPie(date);
    }

    if (date && endDateforPie) {
      const formattedstartDateforPie = moment(date).format("YYYY-MM-DD");
      const formattedendDateforPie = moment(endDateforPie).format("YYYY-MM-DD");
      fetchPieRangeData(formattedstartDateforPie, formattedendDateforPie);
    }
  };

  const handleendDateforPieChange = (date) => {
    if (date === null) {
      setendDateforPie(null);
    } else {
      setendDateforPie(date);
    }
    if (startDateforPie && date) {
      const formattedstartDateforPie =
        moment(startDateforPie).format("YYYY-MM-DD");
      const formattedendDateforPie = moment(date).format("YYYY-MM-DD");
      fetchPieRangeData(formattedstartDateforPie, formattedendDateforPie);
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
                    {allAdvertising === 0 ? " Chưa có dữ liệu về bài đăng bán trong ngày hôm nay" : "Tổng hợp số bài đăng bán hôm nay"  }
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
          <div className="pie-chart-range" style={{ marginBottom: 10 }}>
            {pieDataRange ? (
              startDateforPie && endDateforPie ? (
                pieDataRange.datasets[0].data.every((value) => value === 0) ? (
                  <p>
                    Không có dữ liệu bài đăng từ{" "}
                    {startDateforPie.format("YYYY-MM-DD")} đến{" "}
                    {endDateforPie.format("YYYY-MM-DD")}.
                  </p>
                ) : (
                  <div className="pie-range-container">
                    <Pie data={pieDataRange} />
                    <strong className="chart-title">
                      Tổng hợp số bài đăng bán từ ngày{" "}
                      {startDateforPie.format("YYYY-MM-DD")} đến{" "}
                      {endDateforPie.format("YYYY-MM-DD")}
                    </strong>
                  </div>
                )
              ) : (
                <p>Vui lòng chọn cả ngày bắt đầu và ngày kết thúc.</p>
              )
            ) : (
              <p>Đang tải dữ liệu...</p>
            )}
          </div>
          {/* Cái chọn ngày linh tinh , đang không config được nên chưa sửa */}
          <div className="date-picker">
            <DatePicker
              value={startDateforPie}
              onChange={handlestartDateforPieChange}
              format="YYYY-MM-DD"
              placeholder="Chọn ngày bắt đầu"
            />
            <DatePicker
              value={endDateforPie}
              onChange={handleendDateforPieChange}
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
        <div className="line-chart-block">
          <Line data={lineChartData} />
        </div>

        <p className="chart-title">Doanh thu 7 ngày gần nhất</p>
      </div>
    </div>
  );
}
