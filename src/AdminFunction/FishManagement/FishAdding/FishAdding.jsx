import { Descriptions, Input, message, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import pondApi from "../../../apis/pondApi";
import "./FishAdding.css";
import fishApi from "../../../apis/fishApi";
export default function FishAdding() {
  const token = localStorage.getItem("token");
  const [Name, setName] = useState("");
  const [Color, setColor] = useState("");
  const [Size, setSize] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleCreateFish = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("Name", Name);
    formData.append("Color", Color);
    formData.append("Size", Size);
    formData.append("Description", description);
    formData.append("Image", image);
    try {
      const response = await fishApi.generateFish(formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response) {
        message.success("Tạo loại cá thành công");
        console.log(image);
        setName("");
        setColor("");
        setDescription("");
        setImage("");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          alert("Thông tin nhập vào lỗi. Vui lòng thử lại");
        } else {
          message.error("Lỗi kết nối xảy ra khi tạo cá. Vui lòng thử lại sau");
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
    <div className="generate-fish">
      <div className="gen-fish-form">
        <h1>Tạo giống cá mới ở đây</h1>
        <form onSubmit={handleCreateFish}>
          <div className="gen-fish-material gen-fish-text">
            <label>Name</label>
            <Input
              type="text"
              value={Name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nhập vào tên"
              required
            />
          </div>
          <div className="gen-fish-shape gen-fish-text">
            <label>Color</label>
            <Input
              type="text"
              value={Color}
              onChange={(e) => setColor(e.target.value)}
              placeholder="Nhập vào màu của cá"
              required
            />
          </div>
          <div className="gen-fish-waterlevel gen-fish-text">
            <label>Size</label>
            <Input
              type="text"
              value={Size}
              onChange={(e) => setSize(e.target.value)}
              placeholder="Nhập vào kích thước"
              required
            />
          </div>
          <div className="gen-fish-description">
            <label>Description</label>
            <Input.TextArea
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Nhập vào mô tả"
            />
          </div>
          <div className="gen-fish-img">
            <label>Upload Image</label>
            <br />
            <input
              type="file"
              onChange={handleImageInput}
              accept="image/*"
              required
            />
          </div>
          <div>
            <button className="submit-button" type="submit" disabled={loading}>
              {loading ? (<Spin size="small" />) : " Tạo cá"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
