import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import blogApi from "../../apis/blogApi";
import Header from "../../components/header/Header";
import "./BlogDetail.css";
import Footer from "../../components/footer/Footer";
import Navigation from "../../components/navbar/Navigation";
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
    <div className="detail-container">
      <Header />
      <Navigation />
      <div className="short-detail-in4">
        <div className='detail-img'>
          <img src={blog.urlImg} alt={blog.title} />
        </div>
        <div className="product-detail-in4">
          <h2>{blog.title}</h2> <br />
          <p>Created at: {blog.createAt}</p> <br />
          <Link to={`/user-profile/${blog.userInfo.id}`} className="customer-in4">
            <img  
              src={blog.userInfo.profileImageUrl}
              alt={blog.userInfo.fullName }
            />
            <p className="user-block">Author: {blog.userInfo.fullName}</p>
          </Link> <br />
          <h4>Mô tả chi tiết</h4> <br />
          <p>{blog.description}</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BlogDetail;
