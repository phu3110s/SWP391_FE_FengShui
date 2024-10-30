import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import blogApi from "../../apis/blogApi";
import Header from "../../components/header/Header";
import "../BlogList/style.css";
import { Pagination, Spin } from "antd";
import Navigation from "../../components/navbar/Navigation";
import Footer from "../../components/footer/Footer";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(11);
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
      setTotalPage(response.data.total);
      console.log(totalPage)
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
    <div style={{ width: '100%', backgroundColor: '#F4F4F4' }}>
      <Header />
      <Navigation />
      {/* Blog List */}
      <div className="blog-container" style={{ width: '70%', marginLeft: 240 }}>
        {blogs.map((blog) => (
          <div className="blog-info" key={blog.id} style={{ alignItems: 'center', width: '90%', marginBottom: '40px' }}>
            <Link className="link-to-detail" to={`/blogs/${blog.id}`}>
              <img src={blog.urlImg} alt={blog.title} style={{ width: "220px", height: '220px' }} />
              <h4 style={{ fontWeight: 'normal', fontSize: 16, padding: '4px 20px 10px', textAlign: 'left' }}>{blog.title}</h4>
              <p style={{ padding: ' 5px 20px' }}>Tác giả: {blog.userInfo.fullName}</p>
            </Link>
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
      <Footer />

    </div>
  );
};

export default BlogList;
