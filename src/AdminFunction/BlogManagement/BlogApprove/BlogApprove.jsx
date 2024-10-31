
import React, { useEffect, useState } from "react";
import blogApi from "../../../apis/blogApi";
import { Spin, Button, message, Modal } from "antd";
import "./BlogApprove.css";
import LinesEllipsis from "react-lines-ellipsis";
export default function BlogApprove() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const size = 100;
  const [visible, setVisible] = useState(false)
  const [action, setAction] = useState()
  const [blogId, setBlogId] = useState(null)
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
      handleResponse(response, "Blog đã đ ược duyệt thành công");
    } catch (error) {
      message.error("Lỗi không thể kết nối đến server");
    }
    console.log("Approved blog with id:", blogId);
  };
  const handleCancel = () => {
    setVisible(false)
  }
  const showConfirm = (blogId, action) => {
    setBlogId(blogId)
    setAction(action)
    setVisible(true)
  }
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
  const handleOK = () => {
    setVisible(false)
    if (action === "Approved") {
      handleApprove(blogId)
    } else if (action === "Rejected") {
      handleReject(blogId)
    }
  }
  if (loading) return <Spin size="large" style={{ marginRight: 8 }} />;
  if (error) return <p>Error: {error}</p>;
  return (
    <div style={{ width: '100%' }}>
      <h1 style={{ fontFamily: 'var(--font-playwrite)', marginBottom: '30px' }}>Những bài blog đang chờ duyệt</h1>
      <div className="blog-container" style={{ width: '100%', margin: 0 }}>
        {blogs.map((blog) => (
          <div className="blog-info" key={blog.id} style={{ width: '100%', height: ' 550px' }}>

            <img src={blog.urlImg} width="100%" alt={blog.title} />
            <h3>Tiêu đề: <LinesEllipsis text={blog.title} maxLine="3" ellipsis="..." trimRight basedOn="words"/></h3>
            {/* <h2>{blog.title}</h2> */}
            <h3>Nội dung: </h3>
            <LinesEllipsis text={blog.description}  maxLine="3" ellipsis="..." trimRight basedOn="words"/>

            <p>Tác giả: {blog.userInfo.fullName}</p>
            <div className="action-buttons">
              <Button
                type="primary"
                onClick={() => showConfirm(blog.id, "Approved")}
                style={{ marginRight: "10px" }}
              >
                Chấp nhận
              </Button>
              <Button type="danger" onClick={() => showConfirm(blog.id, "Rejected")}>
                Từ chối
              </Button>
            </div>
          </div>
        ))}
      </div>
      <Modal title={`Xác nhận ${action === "Approved" ? "duyệt" : "Từ chối"} blog ?`}
        visible={visible} onOk={handleOK} onCancel={handleCancel} okText="Xác nhận" cancelText="Hủy"
      />
    </div>
  );
}
