import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import blogApi from "../../apis/blogApi";
import { Spin } from "antd";
import "./NewBlog.css";
import AdvertisingList from "../../advertising/AdvertisingList/AdvertisingList";

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
    <div className="new-blog" style={{ width: '100%', backgroundColor: '#F4F7FE' }}>
      <div className="advertising-posting-home">
        <h4>Bài quảng cáo</h4>
        <AdvertisingList />
      </div>
      <h4>Các Blogs chia sẻ thông tin cá Koi</h4>
      <div className="blog-container" style={{ backgroundColor: '#FFFFFF', width: '80%', marginLeft: 150 }}>
        {blogs.map((blog) => (
          <div className="blog-info" key={blog.id} style={{ alignItems: 'center' }}>
            <Link className="link-to-detail" to={`/blogs/${blog.id}`}>
              <img src={blog.urlImg} alt={blog.title} style={{ width: "220px", height: '220px' }} />
              <h3 style={{ fontWeight: 'normal', fontSize: 16, padding: '4px 20px 10px', textAlign: 'left', fontFamily: '--font-arima' }}>
                {blog.title}
              </h3>
              <p style={{ padding: ' 5px 20px' }}>Tác giả: {blog.userInfo.fullName}</p>
            </Link>
          </div>
        ))}
        <div className="show-blog-link">
          <Link to="/blogs">Xem thêm blog</Link>
        </div>
      </div>


    </div>
  );
};

export default NewBlog;
