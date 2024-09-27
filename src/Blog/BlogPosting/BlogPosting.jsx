import { Input, message } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import blogApi from "../../apis/blogApi";
import Header from "../../components/header/Header";
import "./styles.css";

export default function BlogPosting() {
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const [title, setTitle] = useState("");
  const [description, setDesription] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(
    () => {
      if (!token) {
        alert(
          "Bạn phải đăng nhập mới được đăng post. Chuyển hướng sang trang login"
        );
        navigate("/Login");
      }
    },
    [token],
    navigate
  );

  const handleImageInput = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log(file.name);
      setImage(file);
    }
  };

  const handleSubmitPost = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);
    try {
      const response = await blogApi.uploadBlog(formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 201) {
        message.success("Đăng blog thành công. Chờ duyệt");
      } else if (response.status === 401) {
        alert(
          "Lỗi. Không thể đăng bài. hết phiên đăng nhập vui lòng đăng nhập lại"
        );
      } else {
        alert("Lỗi gì éo biết. Chịu");
      }
    } catch (error) {
      message.error(error.message || "Có lỗi xảy ra khi đăng blog");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="posting-blog">
      <Header />
      <h1>Blog Posting Page</h1>
      <h2>Creating new blog</h2>
      <form onSubmit={handleSubmitPost}>
        <div className="posting-blog-title">
          <label>Title:</label>
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter blog title"
            required
          />
        </div>
        <div className="posting-blog-description">
          <label>Description</label>
          <Input.TextArea
            type="text"
            value={description}
            onChange={(e) => setDesription(e.target.value)}
            placeholder="Enter your blog description"
            required
          />
        </div>
        <div className="posting-blog-inputImage">
          <label>Upload Image:</label>
          <input type="file" onChange={handleImageInput} accept="image/*" />
        </div>
        <div>
          <button type="submit" disabled={loading}>
            {loading ? "Posting..." : "Post Blog"}
          </button>
        </div>
      </form>
    </div>
  );
}
