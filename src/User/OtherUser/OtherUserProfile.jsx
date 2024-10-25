import React, { useEffect, useState } from "react";
import userApi from "../../apis/userApi";
import { useNavigate, useParams } from "react-router-dom";
import { message, Spin } from "antd";
import Header from "../../components/header/Header";
import "./OtherUserProfile.css";

export default function OtherUserProfile() {
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const token = localStorage.getItem("token");
    const currentUserId = localStorage.getItem("userId");
    const { userId } = useParams();
    const navigate = useNavigate();

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

    if (loading) return <Spin size="large" style={{ marginRight: 8, marginTop: 100 }} />;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <Header />
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

                        </div>
                    </div>
                </>
            ) : (
                <div>No user profile found.</div>
            )}
        </div>
    );
}
