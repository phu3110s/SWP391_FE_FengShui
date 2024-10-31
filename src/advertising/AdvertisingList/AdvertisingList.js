import React, { useEffect, useState } from 'react'
import postingApi from '../../apis/postingApi';
import { Spin } from 'antd';
import { Link } from 'react-router-dom';
import Pagination from '../../components/pagination/pagination';

export default function AdvertisingList() {

    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);
    const [totalPage, setTotalPage] = useState(0);
    const handlePageChange = (page, pageSize) => {
        setPage(page);
        setSize(pageSize);
    };

    const fetchBlogs = async () => {
        setLoading(true);
        try {
            const response = await postingApi.getAdvertisings(page, size, "Approved");
            console.log(response);
            setBlogs(response.data.items);
            setTotalPage(response.data.totalPages);
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
    console.log(blogs)
    useEffect(() => {
        fetchBlogs();
    }, [page, size]);
    if (loading) return <Spin size="Big" style={{ margin: 8 }} />;
    if (error) return <p>Lỗi: {error}</p>;

    return (
        <div>
            <div className="blog-container" style={{ width: '70%', marginLeft: 240, padding: 20 }}>
                {blogs.map((blog) => (
                    <div className="blog-info" key={blog.id} style={{ alignItems: 'center', width: '90%', marginBottom: '40px' }}>
                        <Link className="link-to-detail" to={`/AdvertisingDetail/${blog.id}`}>
                            <img src={blog.urlImg} alt={blog.title} style={{ width: "220px", height: '220px' }} />
                            <h3>{blog.title}</h3>
                            <h3 style={{ fontWeight: 'normal', fontSize: 16, padding: '4px 20px 10px', textAlign: 'left', fontFamily: '--font-arima', margin: 5 }}
                            >Loại bài đăng: {blog.itemTypeName}</h3>
                            <h3 style={{ color: '#B7B7B7' }}>
                                {blog.price != null ? blog.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) : 'N/A'}
                            </h3>
                        </Link>
                    </div>
                ))}
            </div>
            {/* <div className="pagination">
                <Pagination
                    current={page}
                    pageSize={size}
                    total={totalPage}
                    onChange={handlePageChange}
                />
            </div> */}
        </div>
    )
}
