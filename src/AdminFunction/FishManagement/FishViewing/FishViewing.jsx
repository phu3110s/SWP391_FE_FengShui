import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Input, Popconfirm, message } from "antd";
import fishApi from "../../../apis/fishApi";

const FishViewing = () => {
  const token = localStorage.getItem("token");
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [fishList, setFishList] = useState([]);
  useEffect(() => {
    try {
      const response = fishApi.getFish(page, size, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      setFishList(response.data.items);
      console.log(response.data.items);
    } catch (error) {
      return;
    }
  });
  const [selectedFish, setSelectedFish] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showFishDetails = (fish) => {
    setSelectedFish(fish);
    setIsModalVisible(true);
  };

  // Ẩn popup
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleUpdateFish = (key, field, value) => {
    setFishList((prevFishList) =>
      prevFishList.map((fish) =>
        fish.key === key ? { ...fish, [field]: value } : fish
      )
    );
    message.success("Cập nhật thông tin thành công!");
  };

  // Xóa cá
  const handleDeleteFish = (key) => {
    setFishList(fishList.filter((fish) => fish.key !== key));
    message.success("Xóa thành công!");
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      editable: true,
    },
    {
      title: "Size",
      dataIndex: "size",
      key: "size",
      editable: true,
    },
    {
      title: "Color",
      dataIndex: "color",
      key: "color",
      editable: true,
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
            onClick={() => handleUpdateFish(fish.key, "name", "Cá Cập Nhật")}
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

  return (
    <div>
      <h1>Admin - Danh Sách Cá</h1>
      <Table columns={columns} dataSource={fishList} />
      <Modal
        title="Thông tin chi tiết"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
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
          </div>
        )}
      </Modal>
    </div>
  );
};

export default FishViewing;
