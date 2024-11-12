import React, { useEffect, useState } from 'react';
import Header from '../../components/header/Header';
import { Link, useNavigate } from 'react-router-dom';
import { Button, message, Pagination, Tabs, Avatar } from 'antd';
import Footer from '../../components/footer/Footer';
import './MyAdvertising.css'
import userApi from '../../apis/user/userApi';

const { TabPane } = Tabs;

export default function MyAdvertising() {
    const [post, setPost] = useState([]);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [viewType, setViewType] = useState('Approved');

    const username = localStorage.getItem("username");
    const userId = localStorage.getItem("userId")
    const urlImg = localStorage.getItem("userImg");

    const handlePageChange = (page, pageSize) => {
        setPage(page);
        setSize(pageSize);
    };


    // console.log(viewType);

    useEffect(() => {
        const fetchPost = async () => {
            setLoading(true);
            try {
                const response = await userApi.getAdvertisingByUser(userId, page, size, viewType);
                if (response.data.items) {
                    setPost(response.data.items)
                }
                setTotal(response.data.total)
                setLoading(false);
            } catch (err) {
                message.error('Error fetching posts.');
                setLoading(false);
            }
        };

        fetchPost();
    }, [viewType, page]);

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
                        ) : post.length > 0 ? (
                            <div className='expired-blog-container'>
                                {post.map((post) => (
                                    <div className='blog-information' key={post.id}>
                                        <Link className="link-to-detail" to={`/AdvertisingDetail/${post.id}`}>
                                            <img src={post.urlImg} alt={post.itemTypeName} style={{ width: "220px", height: '220px' }} />
                                            <h4>{post.itemTypeName}</h4>
                                        </Link>
                                        <p>Ngày đăng bài: {post.updateAt}</p>
                                        <p>Gói đăng bài: {post.paymentPlanName}</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className='empty-state'>
                                <p>Hiện chưa có bài nào được duyệt</p>
                            </div>
                        )}
                    </TabPane>

                    <TabPane tab='Chờ thanh toán' key='Draft'>
                        {loading ? (
                            <p>Loading...</p>
                        ) : post.length > 0 ? (
                            <div className='expired-blog-container'>
                                {post.map((post) => (
                                    <div className='blog-information' key={post.id}>
                                        <Link className="link-to-detail" to={`/AdvertisingDetail/${post.id}`}>
                                            <img src={post.urlImg} alt={post.itemTypeName} style={{ width: "220px", height: '220px' }} />
                                            <h4>{post.itemTypeName}</h4>
                                        </Link>
                                        <p>Ngày đăng bài: {post.updateAt}</p>
                                        <p>Gói đăng bài: {post.paymentPlanName}</p>
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
                        ) : post.length > 0 ? (
                            <div className='expired-blog-container'>
                                {post.map((post) => (
                                    <div className='blog-information' key={post.id}>
                                        <Link className="link-to-detail" to={`/AdvertisingDetail/${post.id}`}>
                                            <img src={post.urlImg} alt={post.itemTypeName} style={{ width: "220px", height: '220px' }} />
                                            <h4>{post.itemTypeName}</h4>
                                            <h4>Tiêu đề: {post.title}</h4>
                                        </Link>
                                        <p>Ngày đăng bài: {post.updateAt}</p>
                                        <p>Gói đăng bài: {post.paymentPlanName}</p>
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
                                    <p>Ngày đăng bài: {post.updateAt}</p>
                                    <p>Gói đăng bài: {post.paymentPlanName}</p>

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

                <div className='pagination-myad'>
                    {/* <Pagination
                        current={page}
                        pageSize={size}
                        total={total}
                        onChange={handlePageChange}
                    /> */}
                    <Pagination
                        current={page}
                        pageSize={size}
                        total={total}
                        showSizeChanger
                        showQuickJumper
                        showTotal={(total) => `Total ${total} items`}
                        onChange={handlePageChange}
                    />
                </div>
            </div>
            <Footer />
        </div>
    );
}