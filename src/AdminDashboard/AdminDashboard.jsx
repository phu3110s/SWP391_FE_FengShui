import { DashboardFilled, LogoutOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, Menu } from "antd";
import React, { useEffect, useState } from "react";
import { AiOutlineHarmonyOS } from "react-icons/ai";
import { BsPostcard } from "react-icons/bs";
import { CiSettings } from "react-icons/ci";
import { FaCcAmazonPay, FaPlusCircle, FaUserFriends } from "react-icons/fa";
import { GiWaterSplash } from "react-icons/gi";
import { HiArchive, HiSpeakerphone } from "react-icons/hi";
import { IoIosColorFilter } from "react-icons/io";
import { IoPeople } from "react-icons/io5";
import { LiaFishSolid } from "react-icons/lia";
import { SiBlogger } from "react-icons/si";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "./styles.css";
const AdminDashboard = () => {
  const token = localStorage.getItem("token");
  const avatarUrl = localStorage.getItem("userImg");
  const navigate = useNavigate();
  useEffect(
    () => {
      if (!token) {
        alert("Phiên đăng nhập hết hạn");
        navigate("/Login");
      }
    },
    [token]
  );
  const handleLogout = () => {
    if (window.confirm("Bạn chắc chắn muốn đăng xuất?")) {
      localStorage.removeItem("token");
      localStorage.removeItem("userRole");
      localStorage.removeItem("userImg")
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
  const handleLogout = () => {
    if (window.confirm("Bạn chắc chắn muốn đăng xuất?")) {
      localStorage.removeItem("token");
      localStorage.removeItem("userRole");
      navigate("/");
    }
  };

  const navigate = useNavigate();
  return (
    <div className="sidebar">
      <div className="admin-dashboard-logo">
  <Link to={"/AdminDashboard"}>
    <img className="admin-logo-img" src="/img/img-logo.jpg" alt="Logo" />
  </Link>
</div>

      <Menu mode="inline" theme="dark">
        <Menu.SubMenu key="sub1" title="Quản lí bài viết" icon={<SiBlogger />}>
          <Menu.Item
            key="4"
            icon = {<BsPostcard />}
            onClick={() => navigate("/AdminDashboard/ApprovePost")}
          >
            Duyệt các bài blog
          </Menu.Item>
          <Menu.Item
            key="5"
            icon = {<HiSpeakerphone />}
            onClick={() => navigate("/AdminDashboard/PostingApprove")}
          >
            Duyệt các bài đăng bán
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.Item
          key="6"
          icon={<FaUserFriends />}
          onClick={() => navigate("/AdminDashboard/UserManagement")
          }
        >
          Quản lý người dùng
        </Menu.Item>
        {/* <Menu.Item
          key="7"
          onClick={() => navigate("/AdminDashboard/ApproveSell")}
        >
          Quản lý blog mua bán
        </Menu.Item> */}
        <Menu.SubMenu key="sub3" title="Quản lí cá" icon={<LiaFishSolid />}>
          <Menu.Item
            key="8"
            icon={<HiArchive />}
            onClick={() => navigate("/AdminDashboard/FishManagement")}
          >
            Quản lí cá
          </Menu.Item>
          <Menu.Item
            key="9"
            icon={<FaPlusCircle />}
            onClick={() => navigate("/AdminDashboard/FishGenerating")}
          >
            Thêm giống cá mới
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu key="sub4" title="Quản lí hồ" icon={<GiWaterSplash />}>
          <Menu.Item
            key="10"
            icon={<HiArchive />}
            onClick={() => navigate("/AdminDashboard/PondManagement")}
          >
            Quản lí hồ
          </Menu.Item>
          <Menu.Item
            key="11"
            icon = {<FaPlusCircle />}
            onClick={() => navigate("/AdminDashboard/PondGenerating")}
          >
            Thêm kiểu hồ
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.Item
          key="12"
          onClick={() => navigate("/AdminDashboard/AdminChart")}
          icon={<DashboardFilled />}
        >
          Admin Dashboard
        </Menu.Item>
        <Menu.Item
          key="13"
          icon={<CiSettings />}
          onClick={() => navigate("/AdminDashboard/")}
        >
          Cài đặt
        </Menu.Item>
        <Menu.SubMenu
          key="sub5"
          title="Quản lí độ hòa hợp"
          icon={<AiOutlineHarmonyOS />}
        >
          <Menu.Item
            key="14"
            icon={<FaPlusCircle />}
            onClick={() => navigate("/AdminDashboard/Harmony-Adding")}
          >
            Nhập vào độ hòa hợp
          </Menu.Item>
          <Menu.Item
            key="15"
            icon={<IoIosColorFilter />}
            onClick={() => navigate("/AdminDashboard/Harmony-Viewing")}
          >
            List hòa hợp
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.Item
          key="16"
          icon = {<IoPeople />}
          onClick={() => navigate("/AdminDashboard/Consulting-Adding")}
        >
          Quản lí tư vấn ngũ hành
        </Menu.Item>
        {/* ======================================== */}
        <Menu.SubMenu
          key="sub6"
          title="Quản lí gói thanh toán"
          icon={<FaCcAmazonPay />}
        >
          <Menu.Item
            key="17"
            onClick={()=>navigate("/AdminDashboard/Payment-Adding")}
            icon={<FaPlusCircle />}
          >
            Tạo gói đăng bán
          </Menu.Item>
          <Menu.Item
            key="18"
            icon={<IoIosColorFilter />}
            onClick={()=> navigate("/AdminDashboard/Payment-Plans")}
          >
            Xem các gói đăng bán
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.Item key="20" onClick={handleLogout} icon={<LogoutOutlined />}>
          Đăng xuất
        </Menu.Item>
      </Menu>
    </div>
  );
};

const Header = ({ avatarUrl, userMenu }) => {
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
