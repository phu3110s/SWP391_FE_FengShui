import { Button, Input, message, Modal, Table } from "antd";
import React, { useEffect, useState } from "react";
import blogApi from "../../../apis/blogApi";
import "./AllBlog.css"
import { SearchOutlined } from "@ant-design/icons";
export default function AllBlog() {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [blogs, setBlogs] = useState([]);
  const [total, setTotal] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState("");
  const [searchText, setSearchText] = useState("")
  const [filter, setFilter] = useState([])
  const fetchAllBlog = async () => {
    setLoading(true);
    try {
      const response = await blogApi.getBlogs(page, size, "");
      setBlogs(response.data.items);
      setTotal(response.data.total);
    } catch (error) {
      if (error.response) {
        const { status } = error.response;
        if (status === 400) {
          message.error("Không thể thực hiện yêu cầu này");
        } else {
          message.error("Lỗi kết nối");
        }
      }
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAllBlog();
  }, [page, size]);
  const showBlogDescription = (blog) => {
    setSelectedBlog(blog);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const columns = [
    {
    title: "ID",
      dataIndex: "id",
      key: "id",
      render :(text,record,index) => (page-1) *size + index + 1,
    },
    {
      title: "Tiêu đề",
      dataIndex: "title",
      key: "title",
      width: 300
    },
    {
      title: "Thời gian tạo bài",
      dataIndex: "createAt",
      key: "createAt",
      render: (createAt) => {
        const date = new Date(createAt).toISOString().split("T")[0];
        const time = new Date(createAt).toTimeString().split("T")[0];
        return `${date} ${time}`;
      },
      sorter: (a, b) => new Date(a.createAt) - new Date(b.createAt),
      sortDirections: ["ascend,descend"],
    },
    {
      title: "Tác giả",
      dataIndex: "userInfo",
      key: "userInfo.fullName",
      render: (userInfo) => {
        return userInfo.fullName;
      },
    },
    {
      title: "Chi tiết",
      dataIndex: "description",
      render: (_, blog) => {
        return (
          <Button type="link" onClick={() => showBlogDescription(blog)}>
            Xem chi tiết
          </Button>
        );
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        return (
          <span
            className={
              status === "Rejected"
                ? "status-rejected"
                : status === "Approved"
                  ? "status-approved"
                  : "status-pending"
            }
          >{
              status === "Rejected"
                ? "Từ chối"
                : status === "Approved"
                  ? "Đã duyệt"
                  : "Chờ duyệt"
            }</span>
        )
      }
    },
  ];
  const handlePageChange = (pagination) => {
    setPage(pagination.current);
  };
  useEffect(() => {
    const filtered = blogs.filter((blog) => blog.title.toLowerCase().includes((searchText || "").toLowerCase()))
    setFilter(filtered)
  }, [searchText, blogs])
  return (
    <div className="blog-management-block">
      <div className="header-text">
        <h1>Quản lí các bài blog</h1>
      </div>
      <div className="filter-block">
        <Input
          placeholder="Tìm kiếm theo tên của cá"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="filter-text"
          prefix={<SearchOutlined style={{ color: "#194791" }} />}
        />
        {/* <Button className="reset-button" icon={<FiDelete />} secondary/> */}
      </div>
      <Table
        columns={columns}
        className="table"
        dataSource={filter.map((blog) => ({ ...blog, key: blog.id }))}
        pagination={{
          current: page,
          pageSize: size,
          total: total,
          showSizeChanger: false,
          style: { textAlign: "center" },
        }}
        onChange={handlePageChange}
        loading={loading}
      />
      <Modal
        title="Nội dung của bài blog"
        visible={isModalVisible}
        onCancel={handleCancel}
        onOk={handleCancel}
      >
        <div>
          <img src={selectedBlog.urlImg} width="100%" alt="Blog" />
        </div>
        <p>Nội dung: {selectedBlog.description}</p>
      </Modal>
    </div>
  );
}
