import { Button, message, Modal, Table } from "antd";
import React, { useEffect, useState } from "react";
import blogApi from "../../../apis/blogApi";
export default function AllBlog() {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [blogs, setBlogs] = useState([]);
  const [total, setTotal] = useState();
  const [isModalVisible,setIsModalVisible] = useState(false)
  const [selectedBlog,setSelectedBlog] = useState("")
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
  const showBlogDescription = (blog) =>{
    setSelectedBlog(blog)
    setIsModalVisible(true)

  }

  const handleCancel = ()=>{
    setIsModalVisible(false)
  }
  
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tiêu đề",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Thời gian tạo bài",
      dataIndex: "createAt",
      key: "createAt",
      render:(createAt) =>{
       const date = new Date(createAt).toISOString().split("T")[0];
       const time = new Date(createAt).toTimeString().split("T")[0];
       return `${date} ${time}`
      },
      sorter:(a,b) => new Date(a.createAt) - new Date(b.createAt),
      sortDirections:["ascend,descend"]
    },
    {
      title: "Tác giả",
      dataIndex: "userInfo",
      key: "userInfo.fullName",
      render:(userInfo) =>{
        return userInfo.fullName;
      }
    },
    {
      title: "Chi tiết",
      dataIndex: "description",
      render:(_,blog) =>{
        return(<Button type="link" onClick={()=>showBlogDescription(blog)}>Xem chi tiết nội dung</Button>)
        
      }
    },
  ];
  const handlePageChange = (pagination) => {
    setPage(pagination.current);
  };
  return (
    <div className="blog-management-block">
      <div className="header-text">
        <h1>Quản lí các bài blog</h1>
      </div>
      <Table
        columns={columns}
        className="table"
        dataSource={blogs}
        pagination={{
          current: page,
          pageSize: size,
          total: total,
          showSizeChanger: false,
        }}
        onChange={handlePageChange}
        loading={loading}
      />
      <Modal title="Nội dung của bài blog" 
      visible={isModalVisible} onCancel={handleCancel} onOk={handleCancel}>
            <div><img src={selectedBlog.urlImg} width="100%" alt="Blog"/></div>
            <p>Nội dung: {selectedBlog.description}</p>
      </Modal>
    </div>
    
  );
}
