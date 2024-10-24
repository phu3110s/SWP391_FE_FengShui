import { Input, message } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RiImageAddLine } from "react-icons/ri"; // Import icon
import blogApi from "../../apis/blogApi";
import Header from "../../components/header/Header";
import "./styles.css";
import Navigation from "../../components/navbar/Navigation";
import Footer from "../../components/footer/Footer";

export default function BlogPosting() {
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const [title, setTitle] = useState("");
  const [description, setDesription] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      alert(
        "Bạn phải đăng nhập mới được đăng post. Chuyển hướng sang trang login"
      );
      navigate("/Login");
    }
  }, [token, navigate]);

  const handleImageInput = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);

      const reader = new FileReader();
      reader.onload = () => {
        const imgElement = document.getElementById("preview-image");
        imgElement.src = reader.result;
      };
      reader.readAsDataURL(file);
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
        navigate("/MyBlog");
        setTitle("");
        setDesription("");
        setImage(null);
      } else if (response.status === 401) {
        alert(
          "Lỗi. Không thể đăng bài. Hết phiên đăng nhập vui lòng đăng nhập lại"
        );
      } else {
        alert("Lỗi gì bất định");
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
      <Navigation />
      <div className="bl-pt-form">
        <h1>Blog Posting Page</h1>
        <h3>Creating new blog</h3>
        <form onSubmit={handleSubmitPost}>
          <div className="posting-blog-title">
            <label>Title</label>
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
            <label>Upload Image</label>
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
          <p>
            Hãy xem thêm <Link to="/policy">Quy định đăng tin</Link> để đăng bài
            một cách tốt nhất.
          </p>
          <div>
            <button className="subm-pt-button" type="submit" disabled={loading}>
              {loading ? "Posting..." : "Post Blog"}
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}
