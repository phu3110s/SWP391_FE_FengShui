import React, { useEffect, useState } from 'react';
import Header from '../../components/header/Header';
import postingApi from '../../apis/postingApi';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Button, message, Pagination, Tabs, Avatar } from 'antd';
import Footer from '../../components/footer/Footer';
import createPaymentLink from '../../apis/payosApi';
import './MyAdvertising.css'

const { TabPane } = Tabs;

export default function MyAdvertising() {
    const [approveAdvertisings, setApproveAdvertisings] = useState([]);
    const [Draft, setDraft] = useState([]);
    const [expiredPosts, setExpiredPosts] = useState([]);
    const [post, setPost] = useState([]);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);
    const [totalPage, setTotalPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [postStatus, setPostStatus] = useState(false);
    const [viewType, setViewType] = useState('Approved');
    const [error, setError] = useState(null);

    const username = localStorage.getItem("username");
    const token = localStorage.getItem('token');
    const urlImg = localStorage.getItem("userImg");

    const handlePageChange = (page, pageSize) => {
        setPage(page);
        setSize(pageSize);
    };
    const fetchPost = async () => {
        setLoading(true);
        try {
            const response = await postingApi.getUserAdvertisings(page, size, viewType);

            if (viewType === 'Approved') {
                setApproveAdvertisings(response.data.items);
            } else if (viewType === 'Draft') {
                setDraft(response.data.items);
            } else if (viewType === 'Expired') {
                setExpiredPosts(response.data.items);
            }
            setTotalPage(response.data.totalPages);
            setLoading(false);
        } catch (err) {
            message.error('Error fetching posts.');
            setLoading(false);
        }
    };
    // console.log(viewType);

    useEffect(() => {
        fetchPost();
    }, [viewType, page]);

    const handlePayment = async (advertisingId, description) => {
        const paymentData = {
            advertisingId,
            description,
            returnUrl: 'http://localhost:3000/MyAdvertising',
            cancelUrl: 'http://localhost:3000/MyAdvertising',
        };

        try {
            const responsePayment = await createPaymentLink.postPayment(paymentData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            window.location.href = responsePayment.data;
        } catch (error) {
            message.error('Payment error.');
        }
    };

    const fetchBlogs = async () => {
        setLoading(true);
        try {
            const response = await postingApi.getAdvertisings(page, size, "");
            console.log(response);
            setPost(response.data.items);
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
    // console.log(post)
    useEffect(() => {
        fetchBlogs();
    }, [page, size]);


    const navigate = useNavigate();

    const handleRenew = (post) => {
        navigate('/AdvertisingPayment', { state: { post: post } });
    };


    return (
        <div className='my-advertising-page'>
            <Header />
            <div className='Myadvertising-container'>
                <div className='profile-section'>
                    <Avatar src={urlImg} size={64} /><br />
                    <div style={{ padding: 10 }}>
                        <h3>
                            {username}
                        </h3>
                        <Link to='/AdvertisingPosting' style={{ textDecoration: 'none', color: 'black', margin: '10px 0', fontSize: '16px' }}>Tạo bài quảng cáo</Link>
                    </div>
                </div>

                <Tabs defaultActiveKey='Approved' onChange={setViewType} style={{ width: '98%', marginLeft: '2%' }}>
                    <TabPane tab='Đã được duyệt' key='Approved'>
                        {loading ? (
                            <p>Loading...</p>
                        ) : approveAdvertisings.length > 0 ? (
                            <div className='expired-blog-container'>
                                {approveAdvertisings.map((post) => (
                                    <div className='blog-information' key={post.id}>
                                        <Link to={`/AdvertisingList/${post.id}`}>
                                            <h2>{post.title}</h2>
                                            <img src={post.urlImg} style={{ width: '200px', height: '200px' }} alt={post.title} />
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className='empty-state'>
                                <p>Hiện chưa có bài nào được duyệt</p>
                            </div>
                        )}
                    </TabPane>

                    <TabPane tab='Chờ duyệt' key='Draft'>
                        {loading ? (
                            <p>Loading...</p>
                        ) : Draft.length > 0 ? (
                            <div className='expired-blog-container'>
                                {Draft.map((post) => (
                                    <div className='blog-information' key={post.id}>
                                        <Link to={`/AdvertisingList/${post.id}`}>
                                            <img src={post.urlImg} style={{ width: '200px', height: '200px' }} alt={post.itemTypeName} />
                                            <h4>{post.itemTypeName}</h4>
                                        </Link>
                                        <p>Trạng thái: {post.status}</p>
                                        <Button onClick={() => handleRenew(post)}>
                                            Thanh toán
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className='empty-state'>
                                <p>Hiện chưa có bài nào đang chờ duyệt</p>
                            </div>
                        )}
                    </TabPane>

                    <TabPane tab='Hết hạn' key='Expired'>
                        {loading ? (
                            <p>Loading...</p>
                        ) : expiredPosts.length > 0 ? (
                            <div className='expired-blog-container'>
                                {expiredPosts.map((post) => (
                                    <div className='blog-information' key={post.id}>
                                        <Link to={`/AdvertisingDetail/${post.id}`}>
                                            <img src={post.urlImg} style={{ width: '200px', height: '200px' }} alt={post.itemTypeName} />
                                            <h4>{post.itemTypeName}</h4>
                                        </Link>
                                        <p>Trạng thái: {post.status}</p>
                                        {/* <Button>
                                            <Link to={'/AdvertisingPosting'}>
                                                Gia hạn
                                            </Link>
                                        </Button> */}
                                        <Button onClick={() => handleRenew(post)}>
                                            Gia hạn
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className='empty-state'>
                                <p>Hiện chưa có bài nào hết hạn</p>
                            </div>
                        )}
                    </TabPane>

                    <TabPane tab='Tất cả các bài đăng' key=''>
                        <div className="expired-blog-container">
                            {post.map((post) => (
                                <div className="blog-information" key={post.id}>
                                    <Link className="link-to-detail" to={`/AdvertisingDetail/${post.id}`}>
                                        <img src={post.urlImg} alt={post.itemTypeName} style={{ width: "220px", height: '220px' }} />
                                        <h4>{post.itemTypeName}</h4>
                                    </Link>
                                    <p>Trạng thái: {post.status}</p>

                                    {post.status === 'Expired' ? (
                                        <Button onClick={() => handleRenew(post)}>
                                            Gia hạn
                                        </Button>
                                    ) : post.status === 'Draft' ? (
                                        <Button onClick={() => handleRenew(post)}>
                                            Thanh toán
                                        </Button>
                                    ) : null}

                                </div>
                            ))}
                        </div>
                    </TabPane>

                </Tabs>

                <div className='pagination'>
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
