import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import blogApi from "../../apis/blogApi";
import Header from "../../components/header/Header";
import "../BlogList/style.css";
import { Spin } from "antd";
import "./NewBlog.css";
const NewBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [size] = useState(12);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const response = await blogApi.getBlogs(page, size, "Approved");
      setBlogs(response.data.items);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);
  if (loading) return <Spin size="big" style={{ marginRight: 8 }} />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
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
      <Link to="/blogs">Show more blog...</Link>
    </div>
  );
};

export default NewBlog;
