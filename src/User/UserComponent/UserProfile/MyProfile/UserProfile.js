import { Button, Form, Input, Modal, Select, Spin } from "antd";
import React, { useEffect, useState } from "react";
import Header from "../../../../components/header/Header";
import "./UserProfile.css";
import Radio from "antd/es/radio/radio";
import passwordApi from "../../../../apis/changePassword";
import userApi from "../../../../apis/userApi";

export default function UserProfile() {
  const loggedInUserId = localStorage.getItem("userId");
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
  const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const handlePasswordInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handlePasswordChange = async () => {
    const { oldPassword, newPassword, confirmPassword } = passwordForm;

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      await passwordApi.changePassword(loggedInUserId, {
        oldPassword,
        newPassword,
        confirmPassword
      });
      alert("Password changed successfully!");
      setIsPasswordModalVisible(false);
    } catch (error) {
      alert("Failed to change password: " + error.message);
    }
  };

  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const token = localStorage.getItem("token");
  const handleImageInput = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
    setPreviewImage(URL.createObjectURL(file));
  };
  const fetchUserProfile = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await userApi.getUserProfile(loggedInUserId, {
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
        setPreviewImage(response.data.urlImg);
      } else {
        throw new Error("Không tìm thấy thông tin người dùng");
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
  }, [loggedInUserId, token]);

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
  const handleGenderChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      gender: value.target.value,
    }));
  };
  const handleSaveClick = async () => {
    setLoading(true);
    try {
      const response = await userApi.updateUserProfile(loggedInUserId, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (image) {
        const formDataToUpdateImage = new FormData();
        formDataToUpdateImage.append("imgFile", image);
        const response2 = await userApi.updateUserImage(
          loggedInUserId,
          formDataToUpdateImage,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }
      localStorage.setItem("urlImg", response.data.urlImg);
      setIsEditing(false);
      setUserProfile(formData);
      alert("Update thông tin người dùng thành công!");
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

  if (!userProfile) return <div>Không tìm thấy thông tin người dùng</div>;

  return (
    <>
      <Header />
      <div className="user-profile-container">
        <div className="user-profile-header">
          {userProfile && (
            <>
              {isEditing ? (
                <img
                  className="user-avatar"
                  src={previewImage}
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
          <br />
          <br />
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
        <div className="user-profile-bio">
          <h1>User Profile</h1>
          <table className="user-table-form">
            <thead>
              <tr className="action-bar">
                <td className="action"></td>
                <td className="action"></td>
                <td className="action"></td>
              </tr>
            </thead>
            {isEditing ? (
              <>
                <h3>
                  Full Name:{" "}<br />
                  <Input
                    className="input-edit"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                  />
                </h3>
                <h3>
                  Email:{" "} <br />
                  <Input
                    className="input-edit"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </h3>

                <h3>
                  Gender:{" "} <br />
                  <Radio.Group
                    className='radio-gender'
                    name="gender"
                    onChange={handleGenderChange}
                    value={formData.gender}
                  >
                    <Radio value="Male">Male</Radio>
                    <Radio value="Female">Female</Radio>
                    <Radio value="Other">Other</Radio>
                  </Radio.Group>
                </h3>
                <h3>
                  Birthdate:{" "} <br />
                  <Input
                    className="input-edit"
                    type="date"
                    name="birthdate"
                    value={formData.birthdate}
                    onChange={handleInputChange}
                  />
                </h3>
              </>
            ) : (
              <tbody>
                <tr className="cart-content">
                  <td className='cart-item'>Họ và Tên: </td>
                  <td className='cart-item'><span>{userProfile.fullName}</span></td>
                  <td className='cart-item'>Chỉnh sửa</td>
                </tr>

                <tr className="cart-content">
                  <td className='cart-item'>Email: </td>
                  <td className='cart-item'><span>{userProfile.email}</span></td>
                  <td className='cart-item'>🔒</td>
                </tr>

                <tr className="cart-content">
                  <td className='cart-item'>Password: </td>
                  <td className='cart-item'>********</td>
                  <td className='cart-item'>
                    <Button style={{ backgroundColor: 'white', color: 'black' }}
                      type="primary" onClick={() => setIsPasswordModalVisible(true)}>Chỉnh sửa</Button>
                  </td>
                </tr>

                <tr className="cart-content">
                  <td className='cart-item'>Ngày sinh: </td>
                  <td className='cart-item'><span>{userProfile.birthdate}</span></td>
                  <td className='cart-item'>Chỉnh sửa</td>
                </tr>

                <tr className="cart-content">
                  <td className='cart-item'>Số điện thoại: </td>
                  <td className='cart-item'><span>{userProfile.phoneNumber}</span></td>
                  <td className='cart-item'>Chỉnh sửa</td>
                </tr>

                <tr className="cart-content">
                  <td className='cart-item'>Giới tính: </td>
                  <td className='cart-item'><span>{userProfile.gender}</span></td>
                  <td className='cart-item'>Chỉnh sửa</td>
                </tr>

                <tr className="cart-content">
                  <td className='cart-item'>Mệnh: </td>
                  <td className='cart-item'><span>{userProfile.fengShui}</span></td>
                  <td className='cart-item'>Chỉnh sửa</td>
                </tr>

              </tbody>
            )}
          </table>
        </div>

        <Modal
          title="Change Password"
          open={isPasswordModalVisible}
          onOk={handlePasswordChange}
          onCancel={() => setIsPasswordModalVisible(false)}
          okButtonProps={{ disabled: !passwordForm.oldPassword || !passwordForm.newPassword || !passwordForm.confirmPassword }}
        >
          <Form>
            <Form.Item label="Old Password">
              <Input.Password
                name="oldPassword"
                value={passwordForm.oldPassword}
                onChange={handlePasswordInputChange}
              />
            </Form.Item>
            <Form.Item label="New Password">
              <Input.Password
                name="newPassword"
                value={passwordForm.newPassword}
                onChange={handlePasswordInputChange}
              />
            </Form.Item>
            <Form.Item label="Confirm Password">
              <Input.Password
                name="confirmPassword"
                value={passwordForm.confirmPassword}
                onChange={handlePasswordInputChange}
              />
            </Form.Item>
          </Form>
        </Modal>

      </div>
    </>
  );
}
