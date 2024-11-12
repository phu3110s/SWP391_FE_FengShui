import React, { useDebugValue, useEffect, useState } from "react";
import userApi from "../../apis/user/userApi";
import { Button, Input, message, Popconfirm, Table } from "antd";
import { TiUserDeleteOutline } from "react-icons/ti";
import "./UserManagement.css";
import { FiDelete } from "react-icons/fi";
import { SearchOutlined } from "@ant-design/icons";
import { color } from "@mui/system";
export default function UserManagement() {
  const token = localStorage.getItem("token");
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [total, setTotal] = useState("");
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filter, setFilter] = useState([]);
  const handleDeactivate = async (user) => {
    // message.success("Xóa ở đây này");
    console.log(user.id);
    console.log(user.status)
    if (user.status === "Inactive") {
      message.warning("Người dùng này đã bị vô hiệu hóa, Không thể thực hiện lại hành động")
      return;
    }
    setLoading(true);
    try {
      const response = await userApi.deactivate(user.id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        message.success("Vô hiệu hóa người dùng thành công!!", 3);
        fetchData();
      }
    } catch (error) {
      if (error.response) {
        message.error("Lỗi không thể xóa người dùng này");
      } else {
        message.error("Lỗi kết nối");
      }
    } finally {
      setLoading(false);
    }
  };
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await userApi.getAll(page, size, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserData(response.data.items);
      setTotal(response.data.total);
      // console.log(response);
    } catch (error) {
      if (error.response) {
        const { status } = error.response;
        if (status === 400) {
          message.error("Yêu cầu này không thể thực hiện", 5);
        }
      }
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
    console.log(searchText);
  }, [page, size]);
  const columns = [
    {
      title: "Tên",
      dataIndex: "fullName",
      key: "name",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        return (
          <span
            className={
              status === "Active" ? "status-active" : "status-inactive"
            }
          >
            {status === "Active" ? "Hoạt động" : "Vô hiệu hóa"}
          </span>
        );
      },
    },
    {
      title: "SĐT",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Ngày sinh",
      dataIndex: "birthdate",
      key: "birthDate",
    },
    {
      title: "Action",
      key: "action",
      render: (_, user) => (
        <div className="action-buttons">
          <Popconfirm
            title="Bạn có chắc chắn muốn vô hiệu hóa người dùng này?"
            onConfirm={() => handleDeactivate(user)}
            onText="Có"
            CancelText="Không"
          >
            <Button danger icon={<TiUserDeleteOutline />}>
              Vô hiệu hóa
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];
  const handlePageChange = (pagination) => {
    setPage(pagination.current);
  };
  useEffect(() => {
    const filtered = userData.filter((user) =>
      user.fullName.toLowerCase().includes((searchText || "").toLowerCase())
    );

    setFilter(filtered);
  }, [searchText, userData]);
  return (
    <div className="user-management-block">
      <div className="header-text">
        <h1> Quản lí người dùng</h1>
      </div>

      <div className="filter-block">
        <Input
          placeholder="Tìm kiếm theo tên"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="filter-text"
          prefix={<SearchOutlined style={{ color: "#194791" }} />}
        />
        {/* <Button className="reset-button" icon={<FiDelete />} secondary/> */}
      </div>

      <Table
        className="user-table"
        columns={columns}
        dataSource={filter.map((user) => ({ ...user, key: user.id }))}
        pagination={{
          current: page,
          pageSize: size,
          total: total,
          showSizeChanger: false,
          // position:['bottomCenter']
        }}
        onChange={handlePageChange}
        loading={loading}
      />
    </div>
  );
}
