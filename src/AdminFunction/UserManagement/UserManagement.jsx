import React, { useDebugValue, useEffect, useState } from "react";
import userApi from "../../apis/userApi";
import { Button, Input, message, Table } from "antd";
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
  const handleInActive = () => {
    message.success("Xóa ở đây này");
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
    },
    {
      title: "SĐT",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Mệnh",
      dataIndex: "fengShuiName",
      key: "fengShuiName",
    },
    {
      title: "Action",
      key: "action",
      render: (_, user) => (
        <div className="action-buttons">
          <Button
            danger
            onClick={handleInActive}
            icon={<TiUserDeleteOutline />}
          >
            Vô hiệu hóa
          </Button>
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
    <div >
      <h1> Quản lí người dùng</h1>
      <div className="filter-block">
      <Input
        placeholder="Tìm kiếm theo tên"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="filter-text"
        prefix={<SearchOutlined style={{color:"#194791"}} /> }
      />
      {/* <Button className="reset-button" icon={<FiDelete />} secondary/> */}
      </div>
      
      <Table
        className="table"
        columns={columns}
        dataSource={filter.map((user) => ({ ...user, key: user.id }))}
        pagination={{
          current: page,
          pageSize: size,
          total: total,
          showSizeChanger: false,
        }}
        onChange={handlePageChange}
        loading={loading}
      />
    </div>
  );
}
