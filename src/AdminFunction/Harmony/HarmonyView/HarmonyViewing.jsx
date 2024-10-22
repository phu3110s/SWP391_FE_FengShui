import React, { useEffect, useState } from "react";
import { message, Button, Form, Select, Card, Row, Col, Spin } from "antd";
import fishApi from "../../../apis/fishApi";
import pondApi from "../../../apis/pondApi";
import harmonyApi from "../../../apis/harmonyApi";
import FishDetail from "../../../Fish/FishDetail/FishDetail";
import PondDetail from "../../../Pond/PondDetail/PondDetail";
import "./HarmonyViewing.css"; // Nhập CSS

const HarmonyList = () => {
  const [harmonies, setHarmonies] = useState([]);
  const [selectedPond, setSelectedPond] = useState("");
  const [selectedFish, setSelectedFish] = useState("");
  const [ponds, setPonds] = useState([]);
  const [fishes, setFishes] = useState([]);
  const [selectedPondDetails, setSelectedPondDetails] = useState(null);
  const [selectedFishDetails, setSelectedFishDetails] = useState(null);
  const page = 1;
  const size = 1000;
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

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

  const fetchHarmonies = async () => {
    try {
      const response = await harmonyApi.getAllHarmony(selectedFish, selectedPond, page, size);
      setHarmonies(response.data.items);
    } catch (error) {
      message.error("Lỗi");
    }
  };

  useEffect(() => {
    fetchHarmonies();
  }, [selectedFish, selectedPond]);

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

  const handleSearch = () => {
    const fetchHarmonies = async () => {
      try {
        const response = await harmonyApi.getHarmonyRating(selectedFish, selectedPond, page, size, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setHarmonies(response.data.items);
      } catch (error) {
        message.error("Lỗi");
      }
    };
    fetchHarmonies();
  };

  const handleReset = () => {
    setSelectedPond("");
    setSelectedFish("");
    setSelectedPondDetails(null);
    setSelectedFishDetails(null);
  };

  return (
    <div className="container">
      <h2>Harmony List</h2>
      <div className="select-info-container">
        <div className="select-item">
          <Form.Item label="Chọn loại hồ">
            <Select
              placeholder="Chọn hồ"
              value={selectedPond}
              onChange={handlePondChange}
              style={{ width: "100%" }}
            >
              {ponds.map((pond) => (
                <Select.Option key={pond.id} value={pond.id}>
                  {pond.material}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          {selectedPondDetails && (
            <div className="selected-info">
              <h3>Thông tin về hồ</h3>
              <p>Chất liệu: {selectedPondDetails.material}</p>
              <p>Hình dạng: {selectedPondDetails.shape}</p>
              <p>Mực nước tối đa: {selectedPondDetails.waterLevel}</p>
              <p>Mô tả: {selectedPondDetails.description}</p>
              <img src={selectedPondDetails.urlImg} width={389} height={389} alt="Pond" />
            </div>
          )}
        </div>

        <div className="select-item">
          <Form.Item label="Chọn loại cá">
            <Select
              placeholder="Chọn cá"
              value={selectedFish}
              onChange={handleFishChange}
              style={{ width: "100%" }}
            >
              {fishes.map((fish) => (
                <Select.Option key={fish.id} value={fish.id}>
                  {fish.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          {selectedFishDetails && (
            <div className="selected-info">
              <h3>Thông tin về cá</h3>
              <p>Tên cá: {selectedFishDetails.name}</p>
              <p>Màu sắc: {selectedFishDetails.color}</p>
              <p>Kích thước: {selectedFishDetails.size}</p>
              <p>Mô tả: {selectedFishDetails.description}</p>
              <img src={selectedFishDetails.urlImg} width={389} height={389} alt="Fish" />
            </div>
          )}
        </div>
      </div>

      <div className="button-container">
        <Button type="primary" onClick={handleSearch}>
          Search
        </Button>
        <Button type="default" onClick={handleReset}>
          Reset
        </Button>
      </div>

      {loading ? (
        <Spin tip="Đang tải dữ liệu..." />
      ) : harmonies.length > 0 ? (
        <div className="card-container">
          <Row gutter={16}>
            {harmonies.map((harmony) => (
              <Col span={8} key={harmony.id}>
                <Card
                  title={`Độ hòa hợp giữa:`}
                  bordered={false}
                  className="custom-card"
                >
                  <p><strong>Fish Details:</strong></p>
                  <FishDetail fishId={harmony.fishId} />
                  <p><strong>Pond Details:</strong></p>
                  <PondDetail pondId={harmony.pondId} />
                  <p><strong>Harmony Point:</strong> {harmony.point}</p>
                  <p><strong>Description:</strong> {harmony.description}</p>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      ) : (
        <div>Không có dữ liệu về độ hòa hợp của combo này</div>
      )}
    </div>
  );
};

export default HarmonyList;
