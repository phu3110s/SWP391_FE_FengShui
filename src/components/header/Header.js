import { Avatar, Dropdown, Input, Menu, message, Space } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import userApi from "../../apis/userApi";
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
    navigate("/");
  };

  const userMenu = (
    <Menu>
      <Menu.Item key="1">
        <Link to="/MyBlog">My Blog</Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to="/user-profile">My Profile</Link>
      </Menu.Item>
      <Menu.Item key="3">
        <span onClick={handleLogout}>Logout</span>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="header-form">
      <div className="home-logo">
        <Link to={"/"}>
          <img className="logo-home" src="./img/Koi-logo.png" alt=""></img>
        </Link>
      </div>

      <ul className="list-active">
        <li className="active">
          <Link className="link" to={"/Calculate"}>
            Feng Shui Calculating
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
              Blog Posting
            </Link>
          </li>
        ) : null}

        {token ? (
          <li className="active">
            <Link className="link" to={"/MyBlog"}>
              My Blog
            </Link>
          </li>
        ) : null}
        <li className="active">
          <Link className="link" to={"/AdvertisingPosting"}>
            Product Posting
          </Link>
        </li>
        <li className="active">
          <Link className="link" to={"/News"}>
            News
          </Link>
        </li>
      </ul>

      <Space direction="vertical">
        <Search placeholder="input search text" />
      </Space>

      <div className="authorization-box">
        {token ? (
          <Dropdown overlay={userMenu} trigger={["click"]}>
            <div
              style={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Avatar src={avatarUrl} alt="User Avatar" />
            </div>
          </Dropdown>
        ) : (
          <>
            <div className="button-link-signin">
              <Link className="link_to_signin" to="/SignUp">
                Sign In
              </Link>
            </div>
            <div className="button-link-login">
              <Link className="link_to_login" to="/Login">
                Login
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
