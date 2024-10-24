import React, { useEffect, useState } from 'react';
import Header from '../../components/header/Header';
import postingApi from '../../apis/postingApi';
import { Link, Navigate } from 'react-router-dom';
import { Button, message, Pagination, Tabs, Avatar } from 'antd';
import Footer from '../../components/footer/Footer';
import createPaymentLink from '../../apis/payosApi';
import './MyAdvertising.css'

const { TabPane } = Tabs;

export default function MyAdvertising() {
    const [approveAdvertisings, setApproveAdvertisings] = useState([]);
    const [pendingPost, setPendingPost] = useState([]);
    const [expiredPosts, setExpiredPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);
    const [totalPage, setTotalPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [viewType, setViewType] = useState('Approved');

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
            } else if (viewType === 'Pending') {
                setPendingPost(response.data.items);
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
    // const handleRenew = (ad) => {
    //     Navigate('/AdvertisingPosting', {
    //         state: {
    //             advertisingId: ad.id,
    //             title: ad.title,
    //             description: ad.description,
    //             image: ad.imageUrl,
    //             planID: ad.planID,
    //         },
    //     });
    // };
    useEffect(() => {
        fetchPost();
    }, [viewType, page]);

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
                        <Link to='/blog-posting' style={{ textDecoration: 'none', color: 'black', margin: '10px 0', fontSize: '16px' }}>Tạo blog</Link>
                    </div>
                </div>

                <Tabs defaultActiveKey='Approved' onChange={setViewType} style={{ width: '98%', marginLeft: '2%' }}>
                    <TabPane tab='Đang hiển thị' key='Approved'>
                        {loading ? (
                            <p>Loading...</p>
                        ) : approveAdvertisings.length > 0 ? (
                            <div className='approve-blog-container'>
                                {approveAdvertisings.map((post) => (
                                    <div className='blog-information' key={post.id}>
                                        <Link to={`/AdvertisingList/${post.id}`}>
                                            <h2>{post.title}</h2>
                                            <img src={post.urlImg} style={{ width: '350px', height: '350px' }} alt={post.title} />
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

                    <TabPane tab='Chờ duyệt' key='Pending'>
                        {loading ? (
                            <p>Loading...</p>
                        ) : pendingPost.length > 0 ? (
                            <div className='pending-blog-container'>
                                {pendingPost.map((post) => (
                                    <div className='blog-information' key={post.id}>
                                        <Link to={`/AdvertisingList/${post.id}`}>
                                            <h2>{post.title}</h2>
                                            <img src={post.urlImg} style={{ width: '350px', height: '350px' }} alt={post.title} />
                                        </Link>
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
                                            <h2>{post.title}</h2>
                                            <img src={post.urlImg} style={{ width: '200px', height: '200px' }} alt={post.title} />
                                        </Link>
                                        <p>Trạng thái: Hết hạn</p>
                                        <Button>
                                            <Link to={'/AdvertisingPosting'}>
                                                Gia hạn
                                            </Link>
                                        </Button>
                                        {/* <Button
                                            type='primary'
                                            onClick={() => handleRenew(post)} 
                                        >
                                            Gia hạn
                                        </Button> */}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className='empty-state'>
                                <p>Hiện chưa có bài nào hết hạn</p>
                            </div>
                        )}
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
