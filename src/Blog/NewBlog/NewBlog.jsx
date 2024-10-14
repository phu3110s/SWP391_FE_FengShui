import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import blogApi from "../../apis/blogApi";
// import Header from "../../components/header/Header";
// import "../BlogList/style.css";
import { Spin } from "antd";
import "./NewBlog.css";

const NewBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page] = useState(1);
  const [size] = useState(12);
  const fetchBlogs = async () => {
    try {
      setLoading(true);  // Đặt loading trước khi gọi API
      const response = await blogApi.getBlogs(page, size, "Approved");
      setBlogs(response.data.items);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);  // Kết thúc loading sau khi hoàn tất hoặc lỗi
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [page, size]);

  if (loading) return <Spin size="large" style={{ margin: "0 auto", display: "block" }} />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="new-blog" style={{ height: '270vh' }}>

      <h1 style={{ backgroundColor: '#FFFFFF', margin: '0', padding: '30px' }}>Blogs</h1>

      <div className="blog-container" style={{ backgroundColor: '#071C5F' }}>
        {blogs.map((blog) => (
          <div className="blog-info" key={blog.id}>
            <Link className="link-to-detail" to={`/blogs/${blog.id}`}>
              <h2>{blog.title}</h2>
              <img src={blog.urlImg} width="500px" alt={blog.title} />
              <p>Author: {blog.userInfo.fullName}</p>
            </Link>
          </div>
        ))}
      </div>
      <div className="show-blog-link">
        <Link to="/blogs">Show more blogs...</Link>
      </div>
    </div>
  );
};

export default NewBlog;
