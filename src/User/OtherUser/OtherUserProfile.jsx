import React, { useEffect, useState } from "react";
import userApi from "../../apis/userApi";
import { useParams } from "react-router-dom";
import { message, Spin } from "antd";
import Header from "../../components/header/Header";
import "./OtherUserProfile.css"
export default function OtherUserProfile() {
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const token = localStorage.getItem("token");
    const { userId } = useParams();

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
                console.log(response.data)
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
        fetchUserProfile();
    }, [userId]);
    if (loading) return <Spin size="large" style={{ marginRight: 8, marginTop: 100 }} />;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <Header />
            <h1>User profile</h1>
            <div className="user-profile-container">
                <div className="user-profile-header">
                    <img className="user-avatar" src={userProfile.profileImageUrl} alt="...." />
                    <h2 className="user-fullName">{userProfile.fullName}</h2>
                </div>
                <div className="user-profile-bio">
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
                        Mệnh: <span>{userProfile.fengShui}</span>
                    </h3>
                </div>
            </div>
        </div>
    );
}
