  import { Descriptions, Input, message, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import pondApi from "../../../apis/pondApi";
import "./PondAdding.css";
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
    }
  };
  if (loading) return <Spin size="big" style={{ marginRight: 8 }} />;
  return (
    <div className="generate-pond">
      <div className="gen-pond-form">
        <h1>Tạo hồ ở đây</h1>
        <form onSubmit={handleCreatePond}>
          <div className="gen-pond-material gen-pond-text">
            <label>Material</label>
            <Input
              type="text"
              value={Material}
              onChange={(e) => setMaterial(e.target.value)}
              placeholder="Enter Material"
              required
            />
          </div>
          <div className="gen-pond-shape gen-pond-text">
            <label>Shape</label>
            <Input
              type="text"
              value={Shape}
              onChange={(e) => setShape(e.target.value)}
              placeholder="Enter Shape"
              required
            />
          </div>
          <div className="gen-pond-waterlevel gen-pond-text">
            <label>WaterLevel</label>
            <Input
              type="text"
              value={waterLevel}
              onChange={(e) => setWaterLevel(e.target.value)}
              placeholder="Enter Water Level"
              required
            />
          </div>
          <div className="gen-pond-description">
            <label>Description</label>
            <Input.TextArea
              type="text"
              value={description}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Enter your blog description"
            />
          </div>
          <div className="gen-pond-img">
            <label>Upload Image</label>
            <br />
            <input type="file" onChange={handleImageInput} accept="image/*" />
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
