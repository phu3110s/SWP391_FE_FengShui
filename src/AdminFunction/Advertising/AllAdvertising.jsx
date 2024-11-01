import { Button, Input, message, Modal, Table } from "antd";
import React, { useEffect, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import adApi from "../../apis/adApi";
import "./AllAd.css"
export default function AllAdvertising() {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [ads, setAds] = useState([]);
  const [total, setTotal] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState("");
  const [searchText,setSearchText] = useState("")
  const token = localStorage.getItem("token")
  const [filter,setFilter] = useState([])
  const fetchAllBlog = async () => {
    setLoading(true);
    try {
      const response = await adApi.getAll(page,size,{headers:{
        Authorization:`Bearer ${token}`,
      }})
      setAds(response.data.items);
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
  const showAdDescription = (ad) => {
    setSelectedBlog(ad);
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
      width:300
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
      dataIndex: "userName",
      key: "userName",
   
    },
    {
      title: "Chi tiết",
      dataIndex: "description",
      render: (_, ad) => {
        return (
          <Button type="link" onClick={() => showAdDescription(ad)}>
            Xem chi tiết nội dung
          </Button>
        );
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        return(
        <span 
          className={
            status === "Rejected"
              ? "Astatus-rejected"
              : status === "Approved"
              ? "Astatus-approved"
              : status === "Draft" ? "Astatus-draft" : status === "Expired" ? "Astatus-expired" : "Astatus-pending"
          }
        > {
            status === "Rejected"
              ? "Từ chối"
              : status === "Approved"
              ? "Đã duyệt"
              : status === "Draft" ? "Bản nháp" : status === "Expired" ? "Hết hạn" : "Chờ duyệt"
          }</span>
        ) 
      }
    },
  ];
  const handlePageChange = (pagination) => {
    setPage(pagination.current);
  };
  useEffect(() => {
    const filtered = ads.filter((ad) =>  (ad.title?.toLowerCase() || "").includes((searchText || "").toLowerCase()))
    setFilter(filtered)
  }, [searchText,ads])
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
        dataSource={filter.map((ad)=>({...ad,key:ad.id}))}
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
