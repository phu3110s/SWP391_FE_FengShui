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
    // console.log(blogs)
    useEffect(() => {
        fetchBlogs();
    }, [page, size]);
    if (loading) return <Spin size="Big" style={{ margin: 8 }} />;
    if (error) return <p>Lỗi: {error}</p>;

    return (
        <div>
            <div className="blog-container" style={{ backgroundColor: '#FFFFFF', width: '80%', marginLeft: 150 }}>
                {blogs.map((blog) => (
                    <div className="blog-info" key={blog.id}>
                        <Link className="link-to-detail" to={`/AdvertisingDetail/${blog.id}`}>
                            <img src={blog.urlImg} alt={blog.title} style={{ width: "220px", height: '220px' }} />
                            <h4>{blog.title}</h4>
                            <h4>Loại bài đăng:{blog.itemTypeName}</h4>
                        </Link>
                    </div>
                ))}
            </div>
            <div className="pagination">
                <Pagination
                    current={page}
                    pageSize={size}
                    total={totalPage}
                    onChange={handlePageChange}
                />
            </div>
        </div>
    )
}
