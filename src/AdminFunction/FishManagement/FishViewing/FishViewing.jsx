import { Button, Modal, Popconfirm, Table, message } from "antd";
import React, { useEffect, useState } from "react";
import fishApi from "../../../apis/fishApi";
import "./FishViewing.css";
const FishViewing = () => {
  const token = localStorage.getItem("token");
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10); // Số lượng item trên mỗi trang
  const [total, setTotal] = useState(0); // Tổng số item
  const [fishList, setFishList] = useState([]);
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await fishApi.getFish(page, size, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFishList(response.data.items);
        setTotal(response.data.total);
      } catch (error) {
        message.error("Lỗi khi tải dữ liệu.");
      }
    };

    fetchData();
  }, [page, size]);

  const [selectedFish, setSelectedFish] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showFishDetails = (fish) => {
    setSelectedFish(fish);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleDeleteFish = (key) => {
    message.success("Xóa thành công!");

  };

  const handleUpdateFish = (key)=>{
        message.success("Update ")
  }


  
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Size",
      dataIndex: "size",
      key: "size",
    },
    {
      title: "Color",
      dataIndex: "color",
      key: "color",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (_, fish) => (
        <Button type="link" onClick={() => showFishDetails(fish)}>
          Bấm vào đây để xem chi tiết
        </Button>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, fish) => (
        <>
          <Button
            type="primary"
            style={{ marginRight: 8 }}
          >
            Update
          </Button>
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa?"
            onConfirm={() => handleDeleteFish(fish.key)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="danger">Delete</Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  const handlePageChange = (e) => {
    setPage(e.current);
  };

  return (
    <div>
      <h1>Admin - Danh Sách Cá</h1>
      <Table className="table"
        columns={columns}
        dataSource={fishList}
        pagination={{
          current: page,
          pageSize: size,
          total: total,
          showSizeChanger: false,
        }}
        onChange={handlePageChange}
      />
      <Modal
        title="Thông tin chi tiết"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="ok" type="primary" onClick={handleCancel}>
            OK
          </Button>,
        ]}
      >
        {selectedFish && (
          <div>
            <p>
              <strong>Name:</strong> {selectedFish.name}
            </p>
            <p>
              <strong>Size:</strong> {selectedFish.size}
            </p>
            <p>
              <strong>Color:</strong> {selectedFish.color}
            </p>
            <p>
              <strong>Description:</strong> {selectedFish.description}
            </p>
            <p>
              <strong>Image:</strong><br></br>
              <img className="popup-image" src={selectedFish.urlImg} title="Ảnh thoi có gì đâu mà bấm vô" />
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default FishViewing;
