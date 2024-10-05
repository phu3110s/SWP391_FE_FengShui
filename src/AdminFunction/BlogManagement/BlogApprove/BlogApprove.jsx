import React, { useEffect, useState } from "react";
import blogApi from "../../../apis/blogApi";
import { Spin, Button, message } from "antd";
import "./BlogApprove.css";
export default function BlogApprove() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const size = 100;
  const getBlogs = async () => {
    setLoading(true);
    try {
      const response = await blogApi.getBlogs(page, size, "Pending");
      setBlogs(response.data.items);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };
  const handleResponse = (response, successMessage) => {
    if (response.status === 200) {
      message.success(successMessage);
      getBlogs();
    } else if (response.status === 403) {
      message.error("Bạn không có quyền thực hiện hành động này!");
    } else {
      message.error("Lỗi kết nối hoặc lỗi không xác định");
    }
  };
  const handleApprove = async (blogId) => {
    try {
      const response = await blogApi.approveBlog(blogId, {
        status: "Approved",
      });
      handleResponse(response, "Blog đã được duyệt thành công");
    } catch (error) {
      message.error("Lỗi không thể kết nối đến server");
    }
    console.log("Approved blog with id:", blogId);
  };

  const handleReject = async (blogId) => {
    try {
      const response = await blogApi.approveBlog(blogId, {
        status: "Rejected",
      });
      handleResponse(response, "Blog đã bị từ chối");
    } catch (error) {
      message.error("Lỗi không thể kết nối đến server");
    }
    console.log("Rejected blog with id:", blogId);
  };

  useEffect(() => {
    getBlogs();
  }, []);

  useEffect(() => {
    getBlogs();
  }, [page]);

  if (loading) return <Spin size="large" style={{ marginRight: 8 }} />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Những bài blog đang chờ duyệt</h1>
      <div className="blog-container">
        {blogs.map((blog) => (
          <div className="blog-info" key={blog.id}>
            <h2>{blog.title}</h2>
            <img src={blog.urlImg} width="100%" alt={blog.title} />
            <h3>{blog.description}</h3>
            <p>Author: {blog.userInfo.fullName}</p>
            <div className="action-buttons">
              <Button
                type="primary"
                onClick={() => handleApprove(blog.id)}
                style={{ marginRight: "10px" }}
              >
                Approve
              </Button>
              <Button type="danger" onClick={() => handleReject(blog.id)}>
                Reject
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
