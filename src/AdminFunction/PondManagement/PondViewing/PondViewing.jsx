import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Popconfirm, message } from "antd"
import pondApi from "../../../apis/pondApi";
import "./PondViewing.css"
const PondViewing = () => {
  const token = localStorage.getItem("token");
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10); 
  const [total, setTotal] = useState(0); 
  const [PondList, setPondList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await pondApi.getPond(page, size, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPondList(response.data.items);
        setTotal(response.data.total); 
      } catch (error) {
        message.error("Lỗi khi tải dữ liệu.");
      }
    };

    fetchData();
  }, [page, size]);

  const [selectedPond, setSelectedPond] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showPondDetails = (Pond) => {
    setSelectedPond(Pond);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleDeletePond = (key) => {
    setPondList(PondList.filter((Pond) => Pond.key !== key));
    message.success("Xóa thành công!");
  };

  const columns = [
    {
      title: "Material",
      dataIndex: "material",
      key: "material",
    },
    {
      title: "Shape",
      dataIndex: "shape",
      key: "shape",
    },
    {
      title: "Water Level",
      dataIndex: "waterLevel",
      key: "Water Level",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (_, Pond) => (
        <Button type="link" onClick={() => showPondDetails(Pond)}>
          Bấm vào đây để xem chi tiết
        </Button>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, Pond) => (
        <>
          <Button
            type="primary"
            style={{ marginRight: 8 }}
          >
            Update
          </Button>
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa?"
            onConfirm={() => handleDeletePond(Pond.key)}
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
    <div style={{ marginLeft: '100px' }}>
      <h1>Admin - Danh Sách Hồ</h1>
      <Table className="table"
        columns={columns}
        dataSource={PondList}
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
        {selectedPond && (
          <div>
            <p>
              <strong>Name:</strong> {selectedPond.material}
            </p>
            <p>
              <strong>Size:</strong> {selectedPond.shape}
            </p>
            <p>
              <strong>Color:</strong> {selectedPond.waterLevel}
            </p>
            <p>
              <strong>Description:</strong> {selectedPond.description}
            </p>
            <div className="image-container"><p>
              <strong>Image:</strong><br></br>
              <img className="popup-image" src={selectedPond.urlImg} title="Ảnh thoi có gì đâu mà bấm vô"/>
            </p></div>
            
          </div>
        )}
      </Modal>
    </div>
  );
};

export default PondViewing;
