import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import blogApi from "../../apis/blogApi";
import Header from "../../components/header/Header";
import "../BlogList/style.css";
import { Pagination, Spin } from "antd";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [totalPage, setTotalPage] = useState(0);
  const handlePageChange = (page, pageSize) => {
    setPage(page);
    setSize(pageSize);
  };

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const response = await blogApi.getBlogs(page, size, "Approved");

      setBlogs(response.data.items);
      setTotalPage(response.data.totalPages);
      setLoading(false);
    } catch (err) {
      if (err.response) {
        const { status } = err.response;
        if (status === 401) {
          setError(
            "Người dùng chưa xác thực/Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại."
          );
        } else if (status === 500) {
          setError("Lỗi kết nối!!! Vui lòng thử lại sau.");
        } else {
          setError("Lỗi không xác định.");
        }
      } else {
        setError(err.message);
      }
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchBlogs();
  }, [page, size]);
  if (loading) return <Spin size="Big" style={{ margin: 8 }} />;
  if (error) return <p>Lỗi: {error}</p>;

  return (
    <div>
      <Header />
      <h1>Blogs</h1>

      {/* Blog List */}
      <div className="blog-container">
        {blogs.map((blog) => (
          <div className="blog-info" key={blog.id}>
            <h2>{blog.title}</h2>
            <img src={blog.urlImg} width="500px" alt={blog.title} />
            <Link to={`/blogs/${blog.id}`}>Detail</Link>
            <Link to={`/user-profile/${blog.userInfo.id}`}><p>Author: {blog.userInfo.fullName}</p></Link>
            
          </div>
        ))}
      </div>
      <div className="pagination">
        <Pagination
          current={page}
          pageSize={size}
          total={totalPage}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default BlogList;
