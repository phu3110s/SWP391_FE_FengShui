import React, { useEffect, useState } from 'react'
import Header from '../../components/header/Header'
import Navigation from '../../components/navbar/Navigation'
import postingApi from '../../apis/postingApi';
import { Link } from 'react-router-dom';
import { Pagination } from 'antd';
import Footer from '../../components/footer/Footer';
import './MyAdvertising.css'

export default function MyAdvertising() {

    const [approveAdvertisings, setapproveAdvertisings] = useState([]);
    const [pendingPost, setPendingPost] = useState([]);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);
    const [totalPage, setTotalPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [viewType, setViewType] = useState("Approved");
    const handlePageChange = (page, pageSize) => {
        setPage(page);
        setSize(pageSize);
    };
    const fetchPost = async () => {
        setLoading(true);
        try {
            if (viewType === "Approved") {
                const responseAdvertisings = await postingApi.getUserAdvertisings(
                    page,
                    size,
                    "Approved"
                );
                setapproveAdvertisings(responseAdvertisings.data.items);
                setTotalPage(responseAdvertisings.data.totalPages);
            } else {
                const responsePendingPost = await postingApi.getUserAdvertisings(
                    page,
                    size,
                    "Pending"
                );
                setPendingPost(responsePendingPost.data.items);
                setTotalPage(responsePendingPost.data.totalPages);
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
        fetchPost();
    }, [viewType, page]);

    return (
        <div className='my-blog'>
            <Header />
            <Navigation />
            <h1 className="blog-title">My Advertising</h1>

            <div className="blog-btn">
                <button className="button-blogs" onClick={() => setViewType("Approved")}>Approved Advertising</button>
                <button className="button-blogs" onClick={() => setViewType("Pending")}>Pending Advertising</button>

            </div>

            {loading && <p>Loading...</p>}
            {viewType === "Approved" ? (
                <div className="blogs">
                    <h2 className="blog-title">Các post đã được duyệt của bạn</h2>
                    <div className="approve-blog-container">
                        {approveAdvertisings.length > 0 ? (
                            approveAdvertisings.map((post) => (
                                <div className="blog-information" key={post.id}>
                                    <Link to={`/AdvertisingList/${post.id}`}>
                                        <h2>{post.title}</h2>
                                        <img src={post.urlImg} width="500px" alt={post.title} />
                                    </Link>
                                </div>
                            ))
                        ) : (
                            <p className="blog-title">Bạn chưa có post nào được duyệt.</p>
                        )}
                    </div>
                </div>
            ) : (
                <div>
                    <h2 className="blog-title">
                        Các post đang chờ được duyệt của bạn
                    </h2>
                    <div className="pending-blog-container">
                        {pendingPost.length > 0 ? (
                            pendingPost.map((post) => (
                                <div className="blog-information" key={post.id}>
                                    <Link to={`/AdvertisingList/${post.id}`}>
                                        <h2>{post.title}</h2>
                                        <img src={post.urlImg} width="500px" alt={post.title} />
                                    </Link>
                                </div>
                            ))
                        ) : (
                            <p className="blog-title">Bạn chưa có bài post nào đang chờ duyệt.</p>
                        )}
                    </div>
                </div>
            )}

            <div className="pagination">
                <Pagination
                    current={page}
                    pageSize={size}
                    total={totalPage}
                    onChange={handlePageChange}
                />
            </div>
            <Footer />
        </div>
    )
}
