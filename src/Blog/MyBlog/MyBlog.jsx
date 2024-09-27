import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import blogApi from "../../apis/blogApi";
import { Link } from "react-router-dom";

export default function MyBlog() {
  const userId = localStorage.getItem("userId");

  const [approveBlogs, setApproveBlogs] = useState([]);
  const [pendingBlogs, setPendingBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [size] = useState(10);
  const [loading, setLoading] = useState(false);
  const [viewType, setViewType] = useState("Approved");

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      if (viewType === "Approved") {
        const responseApproveBlogs = await blogApi.getUserBlog(
          userId,
          page,
          size,
          "Approve"
        );
        setApproveBlogs(responseApproveBlogs.data.items);
      } else {
        const responsePendingBlogs = await blogApi.getUserBlog(
          userId,
          page,
          size,
          "Pending"
        );
        setPendingBlogs(responsePendingBlogs.data.items);
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
    <div>
      <Header />
      <h1>My Blogs</h1>
      <div>
        <button onClick={() => setViewType("Approved")}>Approved Blogs</button>
        <button onClick={() => setViewType("Pending")}>Pending Blogs</button>
      </div>

      {loading && <p>Loading...</p>}
      {viewType === "Approved" ? (
        <div>
          <h2>Các bài post đã được duyệt của bạn</h2>
          <div className="approve-blog-container">
            {approveBlogs.length > 0 ? (
              approveBlogs.map((blog) => (
                <div className="blog-info" key={blog.id}>
                  <h2>{blog.title}</h2>
                  <img src={blog.urlImg} width="500px" alt={blog.title} />
                  <Link to={`/blogs/${blog.id}`}>Detail</Link>
                </div>
              ))
            ) : (
              <p>Bạn chưa có bài post nào được duyệt.</p>
            )}
          </div>
        </div>
      ) : (
        <div>
          <h2>Các bài post đang chờ được duyệt của bạn</h2>
          <div className="pending-blog-container">
            {pendingBlogs.length > 0 ? (
              pendingBlogs.map((blog) => (
                <div className="blog-info" key={blog.id}>
                  <h2>{blog.title}</h2>
                  <img src={blog.urlImg} width="500px" alt={blog.title} />
                  <Link to={`/blogs/${blog.id}`}>Detail</Link>
                </div>
              ))
            ) : (
              <p>Bạn chưa có bài post nào đang chờ duyệt.</p>
            )}
          </div>
        </div>
      )}
      <div className="pagination">
        <label>
          Page:
          <input
            type="number"
            value={page}
            onChange={(e) => setPage(Number(e.target.value))}
            min="1"
          />
          <button onClick={fetchBlogs}>Fetch Blogs</button>
        </label>
      </div>
    </div>
  );
}
