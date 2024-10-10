import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Để lấy id từ URL
import blogApi from "../../apis/blogApi";
import Header from "../../components/header/Header";
import "./BlogDetail.css";
const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchBlogDetail = async () => {
      setLoading(true);
      try {
        const response = await blogApi.getBlogById(id);
        if (response && response.data) {
          setBlog(response.data);
        } else {
          throw new Error("No blog data found");
        }
      } catch (err) {
        setError(err.message || "Lỗi");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogDetail();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!blog) return <p>No blog found</p>;

  return (
    <div>
      <Header />
      <h1>{blog.title}</h1>
      <img src={blog.urlImg} alt={blog.title} width="400" />
      <p>{blog.description}</p>
      <p>Author: {blog.userInfo.fullName}</p>
      <img
        src={blog.userInfo.profileImageUrl}
        alt={blog.userInfo.fullName}
        width="50"
      />
      <p>Created at: {blog.createAt}</p>
    </div>
  );
};

export default BlogDetail;
