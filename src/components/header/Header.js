import { Avatar, Dropdown, Input, Menu, message, Space } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import userApi from "../../apis/userApi";
import { toast, ToastContainer } from "react-toastify";
const { Search } = Input;

export default function Header() {

  const [username, setUsername] = useState();
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const [loginStatus, setLogin] = useState(false);
  const [avatarUrl, setAvatar] = useState(null);
  const fetchUserProfile = async () => {
    try {
      const response = await userApi.getUserProfile(userId, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response && response.data) {
        setAvatar(response.data.urlImg);
        localStorage.setItem("fengShuiID", response.data.fengShuiId);
      }
    } catch (error) {
      if (error.response) {
        const { data, status } = error.response;
        if (status === 401) {
          return;
        } else {
          alert("Lỗi kết nối");
        }
      }
    }
  };
  useEffect(() => {
    if (token) {
      fetchUserProfile();
    }
  }, [])

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    localStorage.removeItem("userImg");
    toast.success("Đăng xuất thành công!", { position: "top-right", autoClose: 6000 });
    // message.success("Đăng xuất thành công", 5)
    navigate("/");
  };

  const userMenu = (
    <Menu >
      <Menu.Item key="1">
        <Link to="/MyBlog">Blog của tôi</Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to="/user-profile">Hồ sơ của tôi</Link>
      </Menu.Item>
      <Menu.Item key="3">
        <Link to="/MyAdvertising">Bài đăng của tôi</Link>
      </Menu.Item>
      <Menu.Item key="4">
        <span onClick={handleLogout}>Đăng xuất</span>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="header-form">
      <div className="home-logo">
        <Link to={"/"}>
          <img className="logo" src="/img/img-logo.jpg" alt=""></img>
        </Link>
      </div>
      <div className="list-active-form">
        <ul className="list-active">
          <li className="active">
            <Link className="link" to={"/"}>
              Trang chủ
            </Link>
          </li>
          <li className="active">
            <Link className="link" to={"/Calculate"}>
              Tính toán phong thủy
            </Link>
          </li>
          <li className="active">
            <Link className="link" to={"/blogs"}>
              Blog
            </Link>
          </li>
          {token ? (
            <li className="active">
              <Link className="link" to={"/blog-posting"}>
                Đăng Blog
              </Link>
            </li>
          ) : null}

          {/* {token ? (
          <li className="active">
            <Link className="link" to={"/MyBlog"}>
              Blog Của tôi
            </Link>
          </li>
          
        ) : null} */}
          {token &&
            <li className="active">
              <Link className="link" to={"/AdvertisingPosting"}>
                <Dropdown overlay={userMenu} trigger={["click"]}>
                  <div className="active">
                    Đăng quảng cáo
                  </div>
                </Dropdown>

              </Link>
            </li>}
          {token &&
            <li className="active">
              <Link className="link" to={"/Harmony-Rating"}>
                Xếp hạng độ hòa hợp
              </Link>
            </li>
          }
          <li className="active">
            <Link className="link" to={"/News"}>
              Tin tức
            </Link>
          </li>
          <ToastContainer />
        </ul>
      </div>

      <div className="login-form-avt">
        <div className="authorization-box">
          {token ? (
            <Dropdown overlay={userMenu} trigger={["click"]}>
              <div
                className="div-avata"

              >
                <Avatar className="user-avt-login"
                  src={avatarUrl} alt="User Avatar" />
              </div>
            </Dropdown>
          ) : (
            <>
              <div className="button-link-signin">
                <Link className="link_to_signin" to="/SignUp">
                  Đăng ký
                </Link>
              </div>
              <div className="button-link-login">
                <Link className="link_to_login" to="/Login">
                  Đăng nhập
                </Link>
              </div>
            </>
          )}
        </div>
      </div>

    </div>

  );
}