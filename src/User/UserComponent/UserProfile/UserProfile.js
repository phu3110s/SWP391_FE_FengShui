import { Button, Form, Input, Spin } from "antd";
import React, { useEffect, useState } from "react";
import userApi from "../../../apis/userApi";
import Header from "../../../components/header/Header";
import "./UserProfile.css";

export default function UserProfile() {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    gender: "",
    birthdate: "",
  });

  const [image, setImage] = useState(null);
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const handleImageInput = (e) => {
    console.log("koko");
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };
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
        setFormData({
          fullName: response.data.fullName,
          email: response.data.email,
          gender: response.data.gender,
          birthdate: response.data.birthdate,
        });
      } else {
        throw new Error("No user Profile found");
      }
    } catch (error) {
      if (error.response) {
        const { data, status } = error.response;
        if (status === 401) {
          alert(data.error);
        }
      } else {
        alert("Lỗi kết nối");
      }
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUserProfile();
  }, [userId, token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };
  const handleSaveClick = async () => {
    setLoading(true);
    try {
      const response = await userApi.updateUserProfile(userId, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (image) {
        const formDataToUpdateImage = new FormData();
        formDataToUpdateImage.append("imgFile", image);
        const response2 = await userApi.updateUserImage(
          userId,
          formDataToUpdateImage,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }

      setIsEditing(false);
      setUserProfile(formData);
      alert("Profile updated successfully!");
      fetchUserProfile();
    } catch (error) {
      if (error.response) {
        const { status } = error.response;
        if (status === 401) {
          alert(error.message);
        } else {
          alert("Lỗi kết nối");
        }
      }
      alert("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Spin size="large" style={{ marginRight: 8 }} />;
  if (error) return <div>Error: {error}</div>;

  if (!userProfile) return <div>No user profile found</div>;

  return (
    <div>
      <Header />
      <h1>User Profile</h1>
      <div className="user-profile-container">
        <div className="user-profile-header">
          {userProfile && (
            <>
              {isEditing ? (
                <img
                  className="user-avatar"
                  src={userProfile.urlImg}
                  alt={"userImg"}
                  onClick={() => document.getElementById("imageUpload").click()}
                  style={{ cursor: "pointer" }}
                />
              ) : (
                <img
                  className="user-avatar"
                  src={userProfile.urlImg}
                  alt={"userImg"}
                />
              )}
            </>
          )}
          {isEditing && (
            <input
              type="file"
              id="imageUpload"
              style={{ display: "none" }}
              onChange={handleImageInput}
              accept="image/*"
            />
          )}
          <h2 className="user-fullname">{userProfile.fullName}</h2>
        </div>
        <div className="user-profile-bio">
          {isEditing ? (
            <>
              <h3>
                Full Name:{" "}
                <Input
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                />
              </h3>
              <h3>
                Email:{" "}
                <Input
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </h3>

              <h3>
                Gender:{" "}
                <Input
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                />
              </h3>
              <h3>
                Birthdate:{" "}
                <Input
                  type="date"
                  name="birthdate"
                  value={formData.birthdate}
                  onChange={handleInputChange}
                />
              </h3>
            </>
          ) : (
            <>
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
            </>
          )}
        </div>

        {isEditing ? (
          <Button onClick={handleSaveClick} type="primary">
            Save
          </Button>
        ) : (
          <Button onClick={handleEditClick} type="default">
            Edit Profile
          </Button>
        )}
      </div>
    </div>
  );
}