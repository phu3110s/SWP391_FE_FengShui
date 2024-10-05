import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import blogApi from "../../apis/blogApi";
import Header from "../../components/header/Header";
import "../BlogList/style.css";
const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [size] = useState(10);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const response = await blogApi.getBlogs(page, size, "Approved");
      setBlogs(response.data.items);
      setLoading(false);
    } catch (err) {
      if (err.response) {
        const { data, status } = error.response;
        if (status === 401) {
          alert("Hệ thống đang lỗi , vui lòng  chờ");
        }
      }
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);
  useEffect(() => {
    fetchBlogs();
  }, [page]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <Header />
      <h1>Blogs</h1>

      <div className="blog-container">
        {blogs.map((blog) => (
          <div className="blog-info" key={blog.id}>
            <h2>{blog.title}</h2>
            <img src={blog.urlImg} width="500px" alt={blog.title} />
            <Link to={`/blogs/${blog.id}`}>Detail</Link>
            <p>Author: {blog.userInfo.fullName}</p>
          </div>
        ))}
      </div>
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
};

export default BlogList;
