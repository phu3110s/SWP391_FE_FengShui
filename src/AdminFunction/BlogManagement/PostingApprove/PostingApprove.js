import React, { useEffect, useState } from 'react'
import postingApi from '../../../apis/postingApi';
import { Button, message, Modal, Spin } from 'antd';

export default function PostingApprove() {

    const [posting, setPosting] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const size = 100;
    const [visible, setVisible] = useState(false)
    const [action, setAction] = useState()
    const [postId, setPostId] = useState(null)
    const getAdvertisings = async () => {
        setLoading(true);
        try {
            const response = await postingApi.getAdvertisings(page, size, "Pending");
            setPosting(response.data.items);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };
    const handleResponse = (response, successMessage) => {
        if (response.status === 200) {
            message.success(successMessage);
            getAdvertisings();
        } else if (response.status === 403) {
            message.error("Bạn không có quyền thực hiện hành động này!");
        } else {
            message.error("Lỗi kết nối hoặc lỗi không xác định");
        }
    };
    const handleApprove = async (postId) => {
        try {
            const response = await postingApi.approveAdvertisings(postId, {
                status: "Approved",
            });
            handleResponse(response, "Advertising đã được duyệt thành công");
        } catch (error) {
            message.error("Lỗi không thể kết nối đến server");
        }
        console.log("Approved advertising with id:", postId);
    };
    const handleCancel = () => {
        setVisible(false)
    }
    const showConfirm = (postId, action) => {
        setPostId(postId)
        setAction(action)
        setVisible(true)
    }
    const handleReject = async (postId) => {
        try {
            const response = await postingApi.approveAdvertisings(postId, {
                status: "Rejected",
            });
            handleResponse(response, "Post đã bị từ chối");
        } catch (error) {
            message.error("Lỗi không thể kết nối đến server");
        }
        console.log("Rejected Post with id:", postId);
    };

    useEffect(() => {
        getAdvertisings();
    }, []);

    useEffect(() => {
        getAdvertisings();
    }, [page]);
    const handleOK = () => {
        setVisible(false)
        if (action === "Approved") {
            handleApprove(postId)
        } else if (action === "Rejected") {
            handleReject(postId)
        }
    }
    if (loading) return <Spin size="large" style={{ marginRight: 8 }} />;
    if (error) return <p>Error: {error}</p>;

    return (
        <div style={{ width: '100%' }}>
            <h1 style={{ fontFamily: 'var(--font-playwrite)', marginBottom: '30px' }}>Những bài đăng bán đang chờ duyệt</h1>
            {loading ? (
                <p>Loading...</p>
            ) : posting.length > 0 ? (
                <div className="blog-container" style={{ width: '100%', margin: 0 }}>
                    {posting.map((post) => (
                        <div className="blog-info" key={post.id} style={{ width: '100%', height: ' 500px' }}>

                            <img src={post.urlImg} width="100%" alt={post.title} />
                            <h2>{post.title}</h2>
                            <h3>{post.description}</h3>
                            <p>Tác giả: {post.fullName}</p>
                            <div className="action-buttons">
                                <Button
                                    type="primary"
                                    onClick={() => showConfirm(post.id, "Approved")}
                                    style={{ marginRight: "10px" }}
                                >
                                    Chấp nhận
                                </Button>
                                <Button type="danger" onClick={() => showConfirm(post.id, "Rejected")}>
                                    Từ chối
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className='empty-state'>
                    <p style={{ fontFamily: '--font-arima' }}>Hiện chưa có bài đăng nào</p>
                </div>
            )}
            <Modal title={`Xác nhận ${action === "Approved" ? "duyệt" : "Từ chối"} post ?`}
                visible={visible}
                onOk={handleOK}
                onCancel={handleCancel}
                okText="Xác nhận"
                cancelText="Hủy"
            />
        </div>
    )
}
