import React, { useEffect, useState } from "react";
import userApi from "../../apis/userApi";
import { Link, useNavigate, useParams } from "react-router-dom";
import { message, Spin, Tabs } from "antd";
import Header from "../../components/header/Header";
import "./OtherUserProfile.css";
import postingApi from "../../apis/postingApi";
import TabPane from "antd/es/tabs/TabPane";
import blogApi from "../../apis/blogApi";

export default function OtherUserProfile() {
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const token = localStorage.getItem("token");
    const currentUserId = localStorage.getItem("userId");
    const { userId } = useParams();
    const navigate = useNavigate();
    const { setUserId } = useState(null);
    const username = localStorage.getItem("username");
    const [post, setPost] = useState([]);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);
    const [totalPage, setTotalPage] = useState(0);
    const [viewType, setViewType] = useState('Approved');
    const [approveBlogs, setApproveBlogs] = useState([]);
    const [pendingBlogs, setPendingBlogs] = useState([]);


    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await userApi.getUserProfile(username);
                setUserId(response.data.id);
            } catch (error) {
                // message.error('Error fetching user profile.');
            }
        };

        fetchUserProfile();
    }, []);

    const fetchBlogs = async () => {
        if (!userId) return;
        setLoading(true);
        try {
            const response = await postingApi.getAdvertisings(page, size, "Approved");
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
    }, [page, size, userId]);

    const fetchUserProfile = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await userApi.getUserProfile(userId, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response && response.data) {
                setUserProfile(response.data);
                console.log(response.data);
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 400) {
                    setError("Tính năng này hoặc người dùng không tồn tại");
                    message.error("Lỗi");
                }
            } else {
                setError("Lỗi kết nối");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (currentUserId === userId) {
            navigate("/user-profile", { replace: true });
        } else {
            fetchUserProfile();
        }
    }, [currentUserId, userId, navigate]);

    const fetchMyBlogs = async () => {
        setLoading(true);
        try {
            const responseApproveBlogs = await blogApi.getUserBlog(
                userId,
                page,
                size,
                viewType
            );
            if (viewType === "Approved") {
                setApproveBlogs(responseApproveBlogs.data.items);
                setTotalPage(responseApproveBlogs.data.total);
            } else {
                setPendingBlogs(responseApproveBlogs.data.items);

                setTotalPage(responseApproveBlogs.data.totalPages);
                setLoading(false);
            }
        } catch (err) {
            message.error("Lỗi kết nối")

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMyBlogs();
    }, [viewType, page]);

    if (loading) return <Spin size="large" style={{ marginRight: 8, marginTop: 100 }} />;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <Header />
            <div>
                {userProfile ? (
                    <>
                        <p className="profile-title">Trang cá nhân của {userProfile.fullName}</p>
                        <div className="user-profile-container">
                            <div className="user-profile-header">
                                <img className="user-avatar" src={userProfile.urlImg} alt="...." />
                                <h2 className="user-fullName">{userProfile.fullName}</h2>
                                <div className="user-form-information">
                                    <h3>
                                        Ngày sinh: <span>{userProfile.birthdate}</span>
                                    </h3>
                                    <h3>
                                        Giới tính: <span>{userProfile.gender}</span>
                                    </h3>
                                    <h3>
                                        Email: <span>{userProfile.email}</span>
                                    </h3>
                                    <h3>
                                        Số điện thoại: <span>{userProfile.phoneNumber}</span>
                                    </h3>
                                    <h3>
                                        Mệnh: <span>{userProfile.fengShuiName}</span>
                                    </h3>
                                </div>
                            </div>
                            <div className="user-profile-bio">
                                <div>
                                    <Tabs>
                                        <TabPane tab='Bài đăng Quảng cáo' key=''>
                                            {loading ? (
                                                <p>Loading...</p>
                                            ) : post.length > 0 ? (
                                                <div className="expired-blog-container">
                                                    {post.map((post) => (
                                                        <div className="blog-information" key={post.id}>
                                                            <Link className="link-to-detail" to={`/AdvertisingDetail/${post.id}`}>
                                                                <img src={post.urlImg} alt={post.itemTypeName} style={{ width: "220px", height: '220px' }} />
                                                                <h4>{post.itemTypeName}</h4>
                                                            </Link>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className='empty-state'>
                                                    <p>Hiện chưa có bài đăng nào</p>
                                                </div>
                                            )}
                                        </TabPane>

                                        <TabPane tab="Blog" key="Approved">
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
                                                    <p>Hiện chưa có blog nào được phê duyệt</p>
                                                </div>
                                            )}
                                        </TabPane>

                                    </Tabs>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div>No user profile found.</div>
                )}
            </div>
        </div>
    );
}
