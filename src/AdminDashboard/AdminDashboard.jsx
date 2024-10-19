import { Avatar, Dropdown, Menu } from "antd";
import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "./styles.css";

const AdminDashboard = () => {
  const [username, setUsername] = useState();
  const token = localStorage.getItem("token");
  const avatarUrl = localStorage.getItem("userImg");
  const role = localStorage.getItem("userRole");
  const navigate = useNavigate();
  useEffect(
    () => {
      if (!token) {
        alert("Phiên đăng nhập hết hạn");
        navigate("/Login");
      }
    },
    [token],
    navigate
  );
  const handleLogout = () => {
    if (window.confirm('Bạn chắc chắn muốn đăng xuất?')) {
      localStorage.removeItem("token");
      localStorage.removeItem("userRole")
      navigate("/");
    }

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
      <Menu mode="inline" theme="dark" style={{color:"black"}}>
        <Menu.SubMenu key="sub1" title="Blog Management">
          <Menu.SubMenu key="sub2" title="All Blog">
            <Menu.Item
              key="1"
              className="Approved-Articles"
              onClick={() => navigate("/AdminDashboard")}
            >
              Các bài viết đã được duyệt
            </Menu.Item>
            <Menu.Item key="2" onClick={() => navigate("/AdminDashboard")}>
              Pending Blog
            </Menu.Item>
            <Menu.Item key="3" onClick={() => navigate("/AdminDashboard")}>
              Rejected Blog
            </Menu.Item>
          </Menu.SubMenu>

          <Menu.Item
            key="4"
            onClick={() => navigate("/AdminDashboard/ApprovePost")}
          >
            Blog Approve
          </Menu.Item>
          <Menu.Item
            key="5"
            onClick={() => navigate("/AdminDashboard/PostingApprove")}
          >
            Advertising Approve
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.Item
          key="6"
          onClick={() => navigate("/AdminDashboard/UserManagement")}
        >
          Quản lý người dùng
        </Menu.Item>
        <Menu.Item
          key="7"
          onClick={() => navigate("/AdminDashboard/ApproveSell")}
        >
          Quản lý blog mua bán
        </Menu.Item>
        <Menu.SubMenu key="sub3" title="Quản lí cá">
          <Menu.Item
            key="8"
            onClick={() => navigate("/AdminDashboard/FishManagement")}
          >
            Quản lí cá
          </Menu.Item>
          <Menu.Item
            key="9"
            onClick={() => navigate("/AdminDashboard/FishGenerating")}
          >
            Thêm giống cá mới
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu key="sub4" title="Quản lí hồ">
          <Menu.Item key="9" onClick={() => navigate("/AdminDashboard/PondManagement")}>
            Quản lí hồ
          </Menu.Item>
          <Menu.Item
            key="11"
            onClick={() => navigate("/AdminDashboard/PondGenerating")}
          >
            Thêm kiểu hồ
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.Item key="12" onClick={() => navigate("/AdminDashboard/AdminChart")}>
          Admin Dashboard
        </Menu.Item>
        <Menu.Item key="13" onClick={() => navigate("/AdminDashboard/")}>
          Cài đặt
        </Menu.Item>
        <Menu.SubMenu key="sub5" title="Quản lí độ hòa hợp">
          <Menu.Item key="13" onClick={()=>navigate("/AdminDashboard/Harmony-Adding")}>
             Nhập vào đồ hòa hợp
          </Menu.Item>
          <Menu.Item key="14" onClick={()=>navigate("/AdminDashboard/Harmony-Viewing")}>
              List hòa hợp
          </Menu.Item>
        </Menu.SubMenu>
        {/* Harmony-Adding */}
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
