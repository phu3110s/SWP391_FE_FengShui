import { Descriptions, Input, message, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import pondApi from "../../../apis/pondApi";
import "./PondAdding.css";
import { RiImageAddLine } from "react-icons/ri";
export default function PondAdding() {
  const token = localStorage.getItem("token");
  const [Material, setMaterial] = useState("");
  const [Shape, setShape] = useState("");
  const [waterLevel, setWaterLevel] = useState("");
  const [description, setDesc] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleCreatePond = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("Material", Material);
    formData.append("Shape", Shape);
    formData.append("WaterLevel", waterLevel);
    formData.append("Description", description);
    formData.append("Image", image);
    try {
      const response = await pondApi.createPond(formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response) {
        message.success("Tạo loại hồ thành công");
        console.log(image);
        setMaterial("");
        setShape("");
        setWaterLevel("");
        setDesc("");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          alert("Thông tin nhập vào lỗi. Vui lòng thử lại");
        } else {
          message.error("Lỗi kết nối xảy ra khi tạo hồ. Vui lòng thử lại sau");
        }
      }
    } finally {
      setLoading(false);
    }
  };
  const handleImageInput = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onload = () => {
        document.getElementById("preview-image").src = reader.result;
      };
      reader.readAsDataURL(file);
    }
  };
  // if (loading) return <Spin size="big" style={{ marginRight: 8 }} />;
  return (
    <div className="generate-pond">
      <div className="gen-pond-form">
        <h1>Tạo hồ ở đây</h1>
        <form onSubmit={handleCreatePond}>
          <div className="gen-pond-material gen-pond-text">
            <label>Vật liệu xây dựng hồ cá</label>
            <Input
              type="text"
              value={Material}
              onChange={(e) => setMaterial(e.target.value)}
              placeholder="Nhập vào vật liệu của hồ cá"
              required
            />
          </div>
          <div className="gen-pond-shape gen-pond-text">
            <label>Hình dáng</label>
            <Input
              type="text"
              value={Shape}
              onChange={(e) => setShape(e.target.value)}
              placeholder="Nhập vào hình dáng"
              required
            />
          </div>
          <div className="gen-pond-waterlevel gen-pond-text">
            <label>Mực nước</label>
            <Input
              type="text"
              value={waterLevel}
              onChange={(e) => setWaterLevel(e.target.value)}
              placeholder="Nhập vào mực nước tối đa"
              required
            />
          </div>
          <div className="gen-pond-description">
            <label>Mô tả</label>
            <Input.TextArea
              type="text"
              value={description}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Nhập vào chi tiết của hồ cá"
            />
          </div>
          <div className="posting-blog-inputImage">
            <label>Tải hình ảnh lên</label>
            <br />
            <div className="image-upload">
              <input
                type="file"
                onChange={handleImageInput}
                accept="image/*"
                id="file-input"
              />
              <label htmlFor="file-input" className="image-upload-label">
                <RiImageAddLine className="upload-icon" />
                Chọn 1 ảnh
              </label>
              {image && (
                <div className="image-preview">
                  <img
                    id="preview-image"
                    alt="Preview"
                    style={{ maxWidth: "100%", marginTop: "10px" }}
                  />
                </div>
              )}
            </div>
          </div>

          <div>
            <button className="submit-button" type="submit" disabled={loading}>
              {loading ? "Generating..." : "Generate Pond"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
