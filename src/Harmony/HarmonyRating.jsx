import React, { useEffect } from "react";
import { useState } from "react";
import Header from "../components/header/Header";
import Navigation from "../components/navbar/Navigation";
import Footer from "../components/footer/Footer";
import { Button, Form, message, Modal, Select, Spin } from "antd";
import fengshuiApi from "../apis/fengshui";
import userApi from "../apis/userApi";
import { ConsoleSqlOutlined } from "@ant-design/icons";
import "./HarmonyRating.css";
import fishApi from "../apis/fishApi";
import pondApi from "../apis/pondApi";
import harmonyApi from "../apis/harmonyApi";
export default function HarmonyRating() {
  const [ponds, setPonds] = useState([]);
  const [fishes, setFishes] = useState([]);
  const [selectedPond, setSelectedPond] = useState(null);
  const [selectedFish, setSelectedFish] = useState(null);
  const [selectedPondDetails, setSelectedPondDetails] = useState(null);
  const [selectedFishDetails, setSelectedFishDetails] = useState(null);
  const [rating, setRating] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [harmonyInfo, setHarmonyInfo] = useState(false)
  const token = localStorage.getItem("token");
  const page = 1,
    size = 100;
  useEffect(() => {
    const fetchFishes = async () => {
      setLoading(true);
      try {
        const response = await fishApi.getFish(page, size, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFishes(response.data.items);
      } catch (error) {
        message.error("Lỗi khi tải dữ liệu.");
      }
    };

    fetchFishes();
  }, [page, size]);
  useEffect(() => {
    const fetchPonds = async () => {
      setLoading(true);
      setHarmonyInfo(false)
      try {
        const response = await pondApi.getPond(page, size, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPonds(response.data.items);
      } catch (error) {
        message.error("Lỗi khi tải dữ liệu.");
      } finally {
        setLoading(false);
      }
    };

    fetchPonds();
  }, []);
  const handleFishChange = (e) => {
    setSelectedFish(e);
    const fish = fishes.find((fish) => fish.id === e);
    setSelectedFishDetails(fish);
  };
  const handlePondChange = (e) => {
    setSelectedPond(e);
    const pond = ponds.find((pond) => pond.id === e);
    setSelectedPondDetails(pond);
  };
  const handlePressButton = async () => {
    if (!selectedFish || !selectedPond) {
      message.error("Vui lòng chọn đầy đủ cả cá lẫn hồ");
      return;
    }
    setLoading(true);
    try {
      const response = await harmonyApi.getHarmonyRating(
        selectedFish,
        selectedPond,
        1, 10,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.total === 0) {
        message.info("Chúng tôi chưa có dữ liệu về độ hòa hợp của cá và hồ này");
        setHarmonyInfo(false);
        return;
      }

      if (response.data.items.length > 0) {
        const { point, description } = response.data.items[0];
        setRating(point);
        setDescription(description);
        setHarmonyInfo(true);
      }
    } catch (error) {
      if (error.response) {
        const { status } = error.response;
        if (status === 400) {
          message.error("Yêu cầu gửi đi bị lỗi");
        } else if (status === 401) {
          message.error("Phiên đăng nhập hết hạn");
        } else {
          message.warning("Lỗi kết nối");
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="harmony-rating">
        {/* <img
          className="rating-background"
          src="./img/koi-background.jpg"
          alt=""
        ></img> */}
        <h2 className="rating-title">Hệ thống đánh giá sự hòa hợp</h2>
        <div className="picking-box">
          <Form layout="vertical" onFinish={handlePressButton}>
            <div className="harmony-form">
              <div className="picking-fish-box">
                <Form.Item label="Chọn loại cá">
                  <Select
                    placeholder="Chọn cá"
                    value={selectedFish}
                    onChange={handleFishChange}
                    required
                  >
                    {fishes.map((fish) => (
                      <Select.Option key={fish.id} value={fish.id}>
                        {fish.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                {selectedFishDetails && (
                  <div className="selected-fish-info">
                    <h3>Thông tin về cá</h3>
                    <p>Tên cá: {selectedFishDetails.name}</p>
                    <p>Màu sắc:{selectedFishDetails.color}</p>
                    <p>Kích thước:{selectedFishDetails.size}</p>
                    <p>Mô tả: {selectedFishDetails.description}</p>
                    <img src={selectedFishDetails.urlImg} />
                  </div>
                )}
              </div>
              <div className="picking-pond-box">
                <Form.Item label="Chọn loại hồ">
                  <Select
                    placeholder="Chọn hồ"
                    value={selectedPond}
                    onChange={handlePondChange}
                  >
                    {ponds.map((pond) => (
                      <Select.Option key={pond.id} value={pond.id}>
                        {pond.material}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                {selectedPondDetails && (
                  <div className="selected-pond-info">
                    <h3>Thông tin về hồ</h3>
                    <p>Chất liệu: {selectedPondDetails.material}</p>
                    <p>Hình dạng: {selectedPondDetails.shape}</p>
                    <p>Mực nước tối đa: {selectedPondDetails.waterLevel}</p>
                    <p>Mô tả:{selectedPondDetails.description}</p>
                    <img src={selectedPondDetails.urlImg} />
                  </div>
                )}
              </div>
            </div>
            {harmonyInfo && (
              <div className="rating-result">
                <h3>Điểm hòa hợp: {rating}</h3>
                <p>Mô tả: {description}</p>
              </div>
            )}

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Tính toán điểm hòa hợp
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>

      <Footer />
    </>
  );
}
