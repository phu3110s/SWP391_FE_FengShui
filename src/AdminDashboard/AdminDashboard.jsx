import { Avatar, Dropdown, Menu } from "antd";
import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "./styles.css";

const AdminDashboard = () => {
  const [username, setUsername] = useState();
  const avatarUrl = localStorage.getItem("userImg");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUsername(null);
    navigate("/");
  };

  const userMenu = (
    <Menu>
      <Menu.Item key="1">
        <span onClick={handleLogout}>Logout</span>
      </Menu.Item>
    </Menu>
  );
  return (
    <div className="admin-dashboard">
      <Sidebar />
      <div className="dashboard-content">
        <Header avatarUrl={avatarUrl} userMenu={userMenu} />
        <div className="dashboard-main-content">
          <h1>Hello my friend</h1>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <div className="sidebar">
      <div className="home-logo">
        <Link to={"/AdminDashboard"}>
          <img className="logo-home" src="./img/Koi-logo.png" alt="Logo" />
        </Link>
      </div>
      <Menu mode="inline" theme="dark">
        <Menu.SubMenu key="sub1" title="Blog Management">
          {/* All Blog Sub Menu */}
          <Menu.SubMenu key="sub2" title="All Blog">
            <Menu.Item
              key="1"
              className="Approved-Articles"
              onClick={() => navigate("/AdminDashboard/...")}
            >
              Các bài viết đã được duyệt
            </Menu.Item>
            <Menu.Item key="2" onClick={() => navigate("/AdminDashboard/...")}>
              Pending Blog
            </Menu.Item>
            <Menu.Item key="3" onClick={() => navigate("/AdminDashboard/..")}>
              Rejected Blog
            </Menu.Item>
          </Menu.SubMenu>

          <Menu.Item
            key="4"
            onClick={() => navigate("/AdminDashboard/ApprovePost")}
          >
            Blog Approve
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.Item
          key="5"
          onClick={() => navigate("/AdminDashboard/UserManagement")}
        >
          Quản lý người dùng
        </Menu.Item>
        <Menu.Item
          key="6"
          onClick={() => navigate("/AdminDashboard/ApproveSell")}
        >
          Quản lý blog mua bán
        </Menu.Item>
        <Menu.Item key="7" onClick={() => navigate("/AdminDashboard/settings")}>
          Cài đặt
        </Menu.Item>
      </Menu>
    </div>
  );
};
const Header = ({ avatarUrl, userMenu }) => {
  const navigate = useNavigate();
  return (
    <div className="header">
      <h2 className="header-titles">Admin Dashboard</h2>
      <div className="header-actions">
        <button className="notification-btn">Thông báo</button>
        <Dropdown overlay={userMenu} trigger={["click"]}>
          <div
            style={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              marginLeft: "20px",
            }}
          >
            <Avatar src={avatarUrl} alt="User Avatar" />
          </div>
        </Dropdown>
      </div>
    </div>
  );
};

export default AdminDashboard;