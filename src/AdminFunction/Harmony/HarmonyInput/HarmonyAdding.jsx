import React, { useEffect, useState } from "react";
import "./HarmonyAdding.css";
import { Button, Form, Input, message, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import fishApi from "../../../apis/admin/fishApi";
import pondApi from "../../../apis/admin/pondApi";
import harmonyApi from "../../../apis/admin/harmonyApi";
export default function HarmonyAdding() {
  const [ponds, setPonds] = useState([]);
  const [fishes, setFishes] = useState([]);
  const [selectedPond, setSelectedPond] = useState(null);
  const [selectedFish, setSelectedFish] = useState(null);
  const [selectedPondDetails, setSelectedPondDetails] = useState(null);
  const [selectedFishDetails, setSelectedFishDetails] = useState(null);
  const [rating, setRating] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false)
  const token = localStorage.getItem("token")
  const page = 1;
  const size = 1000;
  useEffect(() => {
    const fetchFishes = async () => {
      setLoading(true)
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
      setLoading(true)
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
        setLoading(false)
      }
    };

    fetchPonds();
  }, []);
  const handleSubmit = async () => {
    if (!selectedPond || !selectedFish || !rating) {
      message.error("Vui lòng nhập đầy đủ thông tin");
      return;
    }
    if (rating < 1 || rating > 100) {
      message.error("Điểm đánh giá độ phù hợp chỉ nằm trong khoảng từ 1 đến 100");
      return;
    }
    const harmonyData = {
      pondId: selectedPond,
      fishId: selectedFish,
      point: Number(rating),
      description: description,
    };
    setLoading(true);
    try {
      const response = await harmonyApi.createHarmony(harmonyData, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      if (response && response.data) {
        message.success(`Độ hòa hợp giữa cặp cá ${selectedFishDetails.name} và hồ ${selectedPondDetails.material} được lưu thành công`)
      }
      console.log(harmonyData)
      setSelectedPond(null);
      setSelectedFish(null);
      setRating("");
      setDescription("");
      setSelectedPondDetails(null);
      setSelectedFishDetails(null);
    } catch (error) {
      if (error.response) {
        const { status } = error.response;
        if (status === 400) {
          alert("Độ phù hợp phong thủy này bạn đã nhập trước đây. Vui lòng nhập thông tin khác")
        }
        else if (status === 401) {
          message.error("Phiên đăng nhập hết hạn/ Token hết hạn")
        } else if (status === 403) {
          alert("Bạn không có quyền thực hiện hành động này")
        } else {
          message.error("Lỗi kết nối vui lòng thử lại sau.")
        }
      }
    } finally {
      setLoading(false)
    }
  }
  const handleFishChange = (e) => {
    setSelectedFish(e);
    const fish = fishes.find((fish) => fish.id === e);
    setSelectedFishDetails(fish)
  }
  const handlePondChange = (e) => {
    setSelectedPond(e);
    const pond = ponds.find((pond) => pond.id === e);
    setSelectedPondDetails(pond)
  }

  return (
    <div>
      <h2>Admin mời nhập đồ hòa hợp của cá và hồ ở đây</h2>
      <Form layout="vertical" onFinish={handleSubmit}>
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
            <img src={selectedPondDetails.urlImg} width={200} height={200} />
          </div>
        )}
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

        <Form.Item label="Điểm đánh giá">
          <Input
            type="number"
            placeholder="Nhập điểm đánh giá"
            value={rating}
            onChange={(e) => (setRating(Number(e.target.value)))}
          />
        </Form.Item>

        <Form.Item label="Mô tả đánh giá">
          <TextArea
            rows={4}
            placeholder="Nhập mô tả đánh giá"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Lưu đánh giá
          </Button>
        </Form.Item>
      </Form>
    </div>
  );

}