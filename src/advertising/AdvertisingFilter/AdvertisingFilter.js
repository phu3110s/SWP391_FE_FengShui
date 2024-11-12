import React, { useEffect, useState } from 'react'
import postingApi from '../../apis/advertising/postingApi';
import { Spin, Select, Pagination } from 'antd';
import { Link } from 'react-router-dom';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';

const { Option } = Select;


export default function AdvertisingFilter() {

    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);
    const [itemType, setItemType] = useState('');
    const [orderBy, setOrderBy] = useState('');
    const [totalPage, setTotalPage] = useState(0);
    const handlePageChange = (page, pageSize) => {
        setPage(page);
        setSize(pageSize);
    };

    const handleSortChange = (value) => {
        console.log("Selected sort order:", value);
        setOrderBy(value);
    };

    const fetchBlogs = async () => {
        setLoading(true);
        try {
            console.log("Fetching with orderBy:", orderBy);
            const response = await postingApi.getAdvertisingsBy(page, size, "Approved", itemType, orderBy);
            let sortedBlogs = response.data.items;

            if (orderBy === "priceAsc") {
                sortedBlogs = sortedBlogs.sort((a, b) => a.price - b.price);
            } else if (orderBy === "priceDesc") {
                sortedBlogs = sortedBlogs.sort((a, b) => b.price - a.price);
            }
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

    useEffect(() => {
        fetchBlogs();
    }, [page, size, orderBy]);
    if (loading) return <Spin size="large" style={{ margin: 8 }} />;
    if (error) return <p>Lỗi: {error}</p>;

    return (
        <>
            <Header />
            <div className='new-blog'>
                <div style={{ marginLeft: '55%', padding: 20 }}>
                    Giá Tiền
                    <Select
                        defaultValue=""
                        style={{ width: 200, margin: 10 }}
                        onChange={handleSortChange}
                        placeholder="Sắp xếp theo giá"
                    >
                        <Option value="">Mặc định</Option>
                        <Option value="priceAsc">Giá thấp đến cao</Option>
                        <Option value="priceDesc">Giá cao đến thấp</Option>
                    </Select>
                </div>
                <div className="blog-container" style={{ width: '80%', marginLeft: 200, padding: 20 }}>

                    {blogs.map((post) => (
                        <div className="blog-info" key={post.id} style={{ alignItems: 'center', width: '80%', marginBottom: '40px', padding: 20 }}>
                            <Link className="link-to-detail" to={`/AdvertisingDetail/${post.id}`}>
                                <img src={post.urlImg} alt={post.title} style={{ width: "220px", height: '220px' }} />
                                <h3>{post.title}</h3>
                                <h3 style={{ fontWeight: 'normal', fontSize: 16, padding: '4px 20px 10px', textAlign: 'left', fontFamily: '--font-arima', margin: 5 }}
                                >Loại bài đăng: {post.itemTypeName}</h3>
                                <h3 style={{ color: '#B7B7B7' }}>
                                    {post.price != null ? post.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) : 'N/A'}
                                </h3>
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
            <Footer />
        </>
    )
}
