import React, { useEffect, useState } from 'react';
import Header from '../../components/header/Header';
import blogApi from '../../apis/blogApi';
import { Link } from 'react-router-dom';
import Footer from '../../components/footer/Footer';
import { Pagination, Tabs, Avatar, Button } from 'antd';
import './MyBlog.css';

const { TabPane } = Tabs;

export default function MyBlog() {
  const userId = localStorage.getItem('userId');
  const username = localStorage.getItem("username");
  const urlImg = localStorage.getItem("userImg");
  const [approveBlogs, setApproveBlogs] = useState([]);
  const [pendingBlogs, setPendingBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [totalPage, setTotalPage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [viewType, setViewType] = useState('Approved');

  const handlePageChange = (page, pageSize) => {
    setPage(page);
    setSize(pageSize);
  };

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const responseApproveBlogs = await blogApi.getUserBlog(
        userId,
        page,
        size,
        "Approved"
      );
      if (viewType === "Approved") {
        setApproveBlogs(responseApproveBlogs.data.items);
        setTotalPage(responseApproveBlogs.data.total);
      } else {
        setPendingBlogs(responseApproveBlogs.data.items);
      }
      setTotalPage(responseApproveBlogs.data.totalPages);
      setLoading(false);
    } catch (err) {
      alert('Error fetching data');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [viewType, page]);

  return (
    <div className="my-blog">
      <Header />
      <div className="myBlog-container">

        <div className='profile-section'>
          <Avatar src={urlImg} size={64} /><br />
          <div style={{ padding: 10 }}>
            <h3>
              {username}
            </h3>
            <Link to='/blog-posting' style={{ textDecoration: 'none', color: 'black', margin: '10px 0', fontSize: '16px' }}>Tạo blog</Link>
          </div>
        </div>

        <Tabs
          defaultActiveKey="Approved" onChange={setViewType}>
          <TabPane tab="Bài đã duyệt" key="Approved">
            {loading ? (
              <p>Loading...</p>
            ) : approveBlogs.length > 0 ? (
              <div className="pending-blog-container">
                {approveBlogs.map((blog) => (
                  <div className="post-information" key={blog.id}>
                    <Link to={`/blogs/${blog.id}`}>
                      <h3>{blog.title}</h3>
                      <img
                        src={blog.urlImg}
                        alt={blog.title}
                        style={{ width: '200px', height: '200px' }}
                      />
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <img src="/path-to-empty-state-img.png" alt="No posts" />
                <p>Không tìm thấy bài viết</p>
                <Button type="primary">Tạo bài viết</Button>
              </div>
            )}
          </TabPane>

          <TabPane tab="Bài đang chờ duyệt" key="Pending">
            {loading ? (
              <p>Loading...</p>
            ) : pendingBlogs.length > 0 ? (
              <div className="pending-blog-container">
                {pendingBlogs.map((blog) => (
                  <div className="post-information" key={blog.id}>
                    <Link to={`/blogs/${blog.id}`}>
                      <h3>{blog.title}</h3>
                      <img
                        src={blog.urlImg}
                        alt={blog.title}
                        style={{ width: '200px', height: '200px' }}
                      />
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <p>Hiện không có bài viết đang chờ duyệt</p>
              </div>
            )}
          </TabPane>
        </Tabs>

        <div className="pagination">
          <Pagination
            current={page}
            pageSize={size}
            total={totalPage}
            onChange={handlePageChange}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}
