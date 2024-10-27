import { Button, message, Select, Spin } from "antd";
import React, { useEffect, useState } from "react";
import consultingApi from "../../apis/consultingApi";
import fengshuiApi from "../../apis/fengshui";
import userApi from "../../apis/userApi";
import Header from "../../components/header/Header";
import Navigation from "../../components/navbar/Navigation";
import "./GetFishConsulting.css";
import { Footer } from "antd/es/layout/layout";

const { Option } = Select;

const GetConsulting = () => {
  const [fishPond, setFishPond] = useState(null);
  const [fengShuis, setFengShuis] = useState([]);
  const [selectedFengShuiId, setSelectedFengShuiId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const token = localStorage.getItem("token");
  const [page, setPage] = useState(1);
  const size = 1;
  const userId = localStorage.getItem("userId");
  const [total, setTotal] = useState(null);

  const handleFengShuiChange = (value) => {
    setSelectedFengShuiId(value);
  };

  const fetchFishPond = async () => {
    setLoading(true);
    try {
      const response = await consultingApi.getConsulting(
        page,
        size,
        selectedFengShuiId,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { items, total } = response.data;
      setFishPond(items[0]);
    } catch (error) {
      message.error("Lỗi khi tải dữ liệu.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const fetchUserFengShui = async () => {
      try {
        const response = await userApi.getUserProfile(userId, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const userFengShuiId = response.data.fengShuiId;
        setSelectedFengShuiId(userFengShuiId);
        setUserLoggedIn(true);
        message.success("Đã đăng nhập, mệnh của bạn được chọn tự động", 3);
      } catch (error) {
        message.error("Lỗi khi tải thông tin người dùng", 3);
      }
    };

    const fetchFengShuis = async () => {
      setLoading(true);
      try {
        const response = await fengshuiApi.getAllFengShui(1, 5, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFengShuis(response.data.items);
      } catch (error) {
        if (error.response) {
          const { status } = error.response;
          if (status === 500) {
            message.error("Lỗi kết nối", 3);
          }
        }
      } finally {
        setLoading(false);
      }
    };

    fetchFengShuis();
    if (token) {
      fetchUserFengShui();
    }
  }, [token]);

  const handleSubmit = () => {
    setTotal(0);
    setPage(1);
    if (selectedFengShuiId) {
      const fetchFishPondtoGetTotal = async () => {
        setLoading(true);
        try {
          const response = await consultingApi.getConsulting(
            1,
            10,
            selectedFengShuiId,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const { items, total } = response.data;
          setFishPond(items[0]);
          setTotal(total);
          console.log(total);
        } catch (error) {
          message.error("Lỗi khi tải dữ liệu.");
        } finally {
          setLoading(false);
        }
      };
      fetchFishPondtoGetTotal();
    } else {
      message.warning("Vui lòng chọn mệnh trước khi xin tư vấn.");
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
    fetchFishPond(page);
  };

  const handleNextPage = () => {
    if (page < total) {
      setPage(page + 1);
    }
    fetchFishPond(page);
  };

  return (
    <div>
      <Header />
      <Navigation />
      <h1>Tư vấn Cá và Hồ</h1>
      <div className="select-fengShui-container">
        <Select
          placeholder="Chọn mệnh"
          style={{
            width: "50%",
            marginTop: 50,
            display: "block",
            margin: "0 auto",
          }}
          onChange={handleFengShuiChange}
          value={selectedFengShuiId}
        >
          {fengShuis.map((fengShui) => (
            <Option key={fengShui.id} value={fengShui.id}>
              {fengShui.element}
            </Option>
          ))}
        </Select>
      </div>
      <Button
        type="primary"
        onClick={handleSubmit}
        style={{ marginTop: 20 }}
        disabled={loading}
      >
        {loading ? <Spin size="big" /> : "Xin tư vấn"}
      </Button>
      {loading ? (
        <></>
      ) : (
        <div className="fish-pond-container">
  {fishPond ? (
    <>
      <p className="consultation-description">{fishPond.description}</p>
      
      <div className="fish-pond-info">
        <div className="pond-info">
          <h2>Thông tin Hồ</h2>
          {fishPond.ponds.map((pond) => (
            <div key={pond.id} className="pond-item">
              <p><strong>Tên Hồ:</strong> {pond.shape}</p>
              <p><strong>Chất liệu Hồ:</strong> {pond.material}</p>
              <p><strong>Mực nước:</strong> {pond.waterLevel}</p>
              <p><strong>Mô tả Hồ:</strong> {pond.description}</p>
              <img src={pond.urlImg} alt={pond.shape} />
            </div>
          ))}
        </div>

        <div className="fish-info">
          <h2>Thông tin Cá</h2>
          {fishPond.fishes.map((fish) => (
            <div key={fish.id} className="fish-item">
              <p><strong>Tên Cá:</strong> {fish.name || "Không có thông tin"}</p>
              <p><strong>Kích thước Cá:</strong> {fish.size || "Không có thông tin"}</p>
              <p><strong>Màu Cá:</strong> {fish.color || "Không có thông tin"}</p>
              <img src={fish.urlImg} alt={fish.name} />
            </div>
          ))}
        </div>
      </div>
    </>
  ) : (
    <p>Không có dữ liệu</p>
  )}

          <div className="buttons">
            <Button onClick={handlePreviousPage} disabled={page <= 1}>
              Trước
            </Button>
            <Button onClick={handleNextPage} disabled={page >= total}>
              Tiếp
            </Button>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default GetConsulting;
