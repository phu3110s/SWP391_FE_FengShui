import React, { useEffect, useState } from "react";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import { Input, Space, Dropdown, Menu, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
const { Search } = Input;

export default function Header() {
    const token = localStorage.getItem("token");
    return (
        <div className='header-form'>
            {/* <img src='https://i.pinimg.com/originals/c9/bb/4c/c9bb4cf31417f2a8d59c5931d34ca67f.gif' alt=''></img> */}
            <div className='home-logo'>
                <Link to={'/'}>
                    <img className='logo-home' src='./img/Koi-logo.png' alt=''></img>
                </Link>
            </div>

            <ul className='list-active'>
                <li className='active'>
                    <Link className='link' to={'/Advise'}>Feng Shui Calculating</Link>
                </li>

  const [username, setUsername] = useState();
  const token = localStorage.getItem("token");
  const username1 = localStorage.getItem("username");
  const avatarUrl = localStorage.getItem("userImg");
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      setUsername(username1);
    }
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUsername(null);
    navigate("/");
  };

  const userMenu = (
    <Menu>
      <Menu.Item key="1">
        <Link to="/MyBlog">My Blog</Link>
      </Menu.Item>
      <Menu.Item key="2">
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
        <li className="active">
          <Link className="link" to={"/blog-posting"}>
            Blog Posting
          </Link>
        </li>
        {token ? (
          <li className="active">
            <Link className="link" to={"/MyBlog"}>
              My Blog
            </Link>
          </li>
        ) : null}
        <li className="active">
          <Link className="link" to={"/"}>
            Product Posting
          </Link>
        </li>
        <li className="active">
          <Link className="link" to={"/"}>
            News
          </Link>
        </li>
      </ul>

      <Space direction="vertical">
        <Search placeholder="input search text" />
      </Space>

      <div className="authorization-box">
        {username ? (
          <Dropdown overlay={userMenu} trigger={["click"]}>
            <div
              style={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Avatar src={avatarUrl} alt="User Avatar" />{" "}
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
