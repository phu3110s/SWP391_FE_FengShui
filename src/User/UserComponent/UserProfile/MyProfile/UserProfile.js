import { Button, Form, Input, Modal, Radio, Spin, message } from "antd";
import React, { useEffect, useState } from "react";
import Header from "../../../../components/header/Header";
import "./UserProfile.css";
import passwordApi from "../../../../apis/user/changePassword";
import userApi from "../../../../apis/user/userApi";
import Footer from "../../../../components/footer/Footer";

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
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const token = localStorage.getItem("token");

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

  const handleImageInput = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
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
      await userApi.updateUserProfile(loggedInUserId, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (image) {
        const formDataToUpdateImage = new FormData();
        formDataToUpdateImage.append("imgFile", image);
        await userApi.updateUserImage(loggedInUserId, formDataToUpdateImage, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      setIsEditing(false);
      setUserProfile(formData);
      message.success("Update thông tin người dùng thành công");
      fetchUserProfile();
    } catch (error) {
      alert("Failed to update profile: " + error.message);
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
          <img
            className="user-avatar"
            src={previewImage || userProfile.urlImg}
            alt="userImg"
            style={{ borderRadius: 13 }}
          />
          {isEditing && (
            <>
              <input
                type="file"
                id="imageUpload"
                style={{ display: "none" }}
                onChange={handleImageInput}
                accept="image/*"
              />
              <Button
                style={{ marginTop: "10px" }}
                onClick={() => document.getElementById("imageUpload").click()}
              >
                Đổi ảnh đại diện
              </Button>
            </>
          )}
          <br />
          <br />
          {isEditing ? (
            <Button onClick={handleSaveClick} type="primary">
              Save
            </Button>
          ) : (
            <Button onClick={handleEditClick} type="default">
              Chỉnh sửa trang cá nhân
            </Button>
          )}
        </div>
        <div className="user-profile-bio">
          <h1>Trang cá nhân của {formData.fullName}</h1>
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
                  Họ và tên:{" "}<br />
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
                  Giới tính:{" "} <br />
                  <Radio.Group
                    className='radio-gender'
                    name="gender"
                    onChange={handleGenderChange}
                    value={formData.gender}
                  >
                    <Radio value="Male">Nam</Radio>
                    <Radio value="Female">Nữ</Radio>
                    <Radio value="Other">Khác</Radio>
                  </Radio.Group>
                </h3>
                <h3>
                  Ngày sinh:{" "} <br />
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
                  <td className='cart-item'>*</td>
                </tr>

                <tr className="cart-content">
                  <td className='cart-item'>Email: </td>
                  <td className='cart-item' style={{ fontSize: 15, fontStyle: 'italic', color: 'gray' }}><span>{userProfile.email || "chưa có thông tin"}</span></td>
                  <td className='cart-item'>🔒</td>
                </tr>

                <tr className="cart-content">
                  <td className='cart-item'>Mật khẩu: </td>
                  <td className='cart-item'>********</td>
                  <td className='cart-item'>
                    <span style={{ backgroundColor: 'white', color: 'black' }}
                      type="primary" className="save-button" onClick={() => setIsPasswordModalVisible(true)}>Chỉnh sửa</span>
                  </td>
                </tr>

                <tr className="cart-content">
                  <td className='cart-item'>Ngày sinh: </td>
                  <td className='cart-item'><span>{userProfile.birthdate}</span></td>
                  <td className='cart-item'>*</td>
                </tr>

                <tr className="cart-content">
                  <td className='cart-item'>Số điện thoại: </td>
                  <td className='cart-item'><span>{userProfile.phoneNumber}</span></td>
                  <td className='cart-item'>*</td>
                </tr>

                <tr className="cart-content">
                  <td className='cart-item'>Giới tính: </td>
                  <td className='cart-item'><span>{userProfile.gender}</span></td>
                  <td className='cart-item'>*</td>
                </tr>

                <tr className="cart-content">
                  <td className='cart-item'>Mệnh: </td>
                  <td className='cart-item'><span>{userProfile.fengShuiName}</span></td>
                  <td className='cart-item'>*</td>
                </tr>

              </tbody>
            )}
          </table>
        </div>
        {/* Rest of the profile fields */}
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
      <Footer />
    </>
  );
}
