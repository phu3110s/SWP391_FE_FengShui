import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import blogApi from "../../apis/blogApi";
import { Link } from "react-router-dom";
import './MyBlog.css'
import Navigation from "../../components/navbar/Navigation";
import Footer from "../../components/footer/Footer";
import { Pagination } from "antd";


export default function MyBlog() {
  const userId = localStorage.getItem("userId");

  const [approveBlogs, setApproveBlogs] = useState([]);
  const [pendingBlogs, setPendingBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [viewType, setViewType] = useState("Approved");
  const handlePageChange = (page, pageSize) => {
    setPage(page);
    setSize(pageSize);
  };
  const fetchBlogs = async () => {
    setLoading(true);
    try {
      if (viewType === "Approved") {
        const responseApproveBlogs = await blogApi.getUserBlog(
          userId,
          page,
          size,
          "Approved"
        );
        setApproveBlogs(responseApproveBlogs.data.items);
        setTotalPage(responseApproveBlogs.data.totalPages);
      } else {
        const responsePendingBlogs = await blogApi.getUserBlog(
          userId,
          page,
          size,
          "Pending"
        );
        setPendingBlogs(responsePendingBlogs.data.items);
        setTotalPage(responsePendingBlogs.data.totalPages);
      }
      setLoading(false);
    } catch (err) {
      if (err.response) {
        const { data, status } = err.response;
        if (status === 400) {
          alert(data.Error);
        } else {
          alert("Lỗi kết nối");
        }
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [viewType, page]);

  return (
    <div className="my-blog">
      <Header />
      <Navigation />
      <h1 className="blog-title">My Blogs</h1>

      <div className="blog-btn">
        <button className="button-blogs" onClick={() => setViewType("Approved")}>Approved Blogs</button>
        <button className="button-blogs" onClick={() => setViewType("Pending")}>Pending Blogs</button>

      </div>

      {loading && <p>Loading...</p>}
      {viewType === "Approved" ? (
        <div className="blogs">
          <h2 className="blog-title">Các bài post đã được duyệt của bạn</h2>
          <div className="approve-blog-container">
            {approveBlogs.length > 0 ? (
              approveBlogs.map((blog) => (
                <div className="blog-information" key={blog.id}>
                  <Link to={`/blogs/${blog.id}`}>
                    <h2>{blog.title}</h2>
                    <img src={blog.urlImg} width="500px" alt={blog.title} />
                  </Link>
                </div>
              ))
            ) : (
              <p className="blog-title">Bạn chưa có bài post nào được duyệt.</p>
            )}
          </div>
        </div>
      ) : (
        <div>
          <h2 className="blog-title">
            Các bài post đang chờ được duyệt của bạn
          </h2>
          <div className="pending-blog-container">
            {pendingBlogs.length > 0 ? (
              pendingBlogs.map((blog) => (
                <div className="blog-information" key={blog.id}>
                  <Link to={`/blogs/${blog.id}`}>
                    <h2>{blog.title}</h2>
                    <img src={blog.urlImg} width="500px" alt={blog.title} />
                  </Link>
                </div>
              ))
            ) : (
              <p className="blog-title">Bạn chưa có bài post nào đang chờ duyệt.</p>
            )}
          </div>
        </div>
      )}

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
}
