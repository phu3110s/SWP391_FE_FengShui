import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import blogApi from "../../apis/blogApi";
import { Link } from "react-router-dom";
import Header from "../../header/Header";
const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const response = await blogApi.getBlogs(page, 10);
      setBlogs(response.data.items);
      console.log(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [page, size]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <Header />
      <h1>Blogs</h1>
      <div>
        <label>
          Page:
          <input
            type="number"
            value={page}
            onChange={(e) => setPage(Number(e.target.value))}
            min="1"
          />
        </label>
        <button onClick={fetchBlogs}>Fetch Blogs</button>
      </div>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>Detail</Link>
            {/* <h2>{blog.title}</h2> */}

            <img src={blog.urlImg} alt={blog.title} width="200" />
            <p>Author: {blog.userInfo.fullName}</p>
            {/* <img
              src={blog.userInfo.profileImageUrl}
              alt={blog.userInfo.fullName}
              width="50"
            /> */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogList;
