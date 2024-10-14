import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import blogApi from "../../apis/blogApi";
import { Spin } from "antd";
import "./NewBlog.css";

const NewBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null);
  const [page] = useState(1); // page cố định
  const [size] = useState(12); // size cố định

  // Hàm fetch blogs từ API
  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const response = await blogApi.getBlogs(page, size, "Approved");
      setBlogs(response.data.items); 
      // console.log(response.data.items)
    } catch (err) {
      if (err.response) {
        const { status } = err.response;
        if (status === 401) {
          setError("Người dùng chưa xác thực/Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.");
        } else if (status === 500) {
          setError("Lỗi kết nối!!! Vui lòng thử lại sau.");
        } else {
          setError("Lỗi không xác định.");
        }
      }
    } finally {
      setLoading(false); // Kết thúc quá trình tải
    }
  };

  
  useEffect(() => {
    fetchBlogs(); 
  }, []);
  if (loading) return <Spin size="large" style={{ margin: "0 auto", display: "block" }} />;

  if (error) return <p>Error: {error}</p>;

  return (
    <div className="new-blog" style={{ height: '270vh' }}>

      <h1 style={{ backgroundColor: '#FFFFFF', margin: '0', padding: '30px' }}>Blogs</h1>

      <div className="blog-container" style={{ backgroundColor: '#fa91a6' }}>
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
