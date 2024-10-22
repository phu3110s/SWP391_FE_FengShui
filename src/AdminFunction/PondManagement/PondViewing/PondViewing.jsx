import {
  Button,
  Form,
  Input,
  message,
  Modal,
  Popconfirm,
  Spin,
  Table,
} from "antd";
import React, { useEffect, useState } from "react";
import pondApi from "../../../apis/pondApi";
import "./PondViewing.css";
const PondViewing = () => {
  const token = localStorage.getItem("token");
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [PondList, setPondList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedPond, setSelectedPond] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [updateData, setUpdateData] = useState({
    material: "",
    shape: "",
    waterLevel: "",
    description: "",
  });
  
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const handleImageInput = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
    setPreviewImage(URL.createObjectURL(file));
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const fetchData = async () => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    

    fetchData();
  }, [page, size],[isEditing]);
  const handleDeletePond = async (pondId) => {
    try {
      await pondApi.deletePond(pondId, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      message.success("Xóa thành công!");
    } catch (error) {
      if (error.response) {
        const { status } = error.response;
        if (status === 400) {
          message.error("Cá đã được liên hợp với hồ, Không thể xóa", 2);
        } else if (status === 401) {
          message.error("Phiên đăng nhập hết hạn");
        } else if (status === 403) {
          message.warning("Bạn không có quyền thực hiện hành động này", 5);
        } else {
          message.error("Lỗi kết nối. Vui lòng thử lại sau", 5);
        }
      }
    }
    fetchData();
  };
  const showPondDetails = (Pond) => {
    setSelectedPond(Pond);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsEditing(false);
  };
  const handleUpdatePond = (pond) => {
    setIsEditing(true);
    setSelectedPond(pond);
    setPreviewImage(pond.urlImg)
    setUpdateData({
      material: pond.material,
      shape: pond.shape,
      waterLevel: pond.waterLevel,
      description: pond.description,
    });
    setIsModalVisible(true);
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
      render: (_, pond) => (
        <>
          <Button
            type="primary"
            style={{ marginRight: 8 }}
            onClick={() => handleUpdatePond(pond)}
          >
            Update
          </Button>

          <Popconfirm
            title="Bạn có chắc chắn muốn xóa?"
            onConfirm={() => handleDeletePond(pond.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="danger">Delete</Button>
          </Popconfirm>
        </>
      ),
    },
  ];
  const handleSaveUpdate = async () => {
    setLoading(true);
    try {
      const response = await pondApi.updatePond(selectedPond.id, updateData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (image) {
        const formDataToUpdateImage = new FormData();
        formDataToUpdateImage.append("imgFile", image);
        const response2 = await pondApi.updatePondImage(
          selectedPond.id,
          formDataToUpdateImage,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        ); 
      }
      message.success("Cập nhật thành công!", 5);
      setIsModalVisible(false);
      setIsEditing(false);
      fetchData();
    } catch (error) {
      message.error("Cập nhật thất bại.");
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (e) => {
    setPage(e.current);
  };
  if(loading) return <Spin size="big" />
  return (
    <div>
      <h1>Admin - Danh Sách Hồ</h1>
      <Table
        className="table"
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
        title={isEditing ? "Cập nhật thông tin hồ " : "Thông tin chi tiết"}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          isEditing ? (
            <Button key="save" type="primary" onClick={handleSaveUpdate}>
              {!loading ? (
                "Save"
              ) : (
                <Spin size="small" style={{ color: "red" }}  />
              )}
            </Button>
          ) : (
            <Button key="ok" type="primary" onClick={handleCancel}>
              OK
            </Button>
          ),
        ]}
      >
        {selectedPond && (
          <div>
            {isEditing ? (
              <Form layout="vertical">
                <Form.Item label="Material">
                  <Input
                    name="material"
                    value={updateData.material}
                    onChange={handleInputChange}
                  />
                </Form.Item>
                <Form.Item label="Shape">
                  <Input
                    name="shape"
                    value={updateData.shape}
                    onChange={handleInputChange}
                  />
                </Form.Item>
                <Form.Item label="Water Level">
                  <Input
                    name="waterLevel"
                    value={updateData.waterLevel}
                    onChange={handleInputChange}
                  />
                </Form.Item>
                <Form.Item label="Description">
                  <Input
                    name="description"
                    value={updateData.description}
                    onChange={handleInputChange}
                  />
                </Form.Item>
                <Form.Item label="Image">
                  <input type="file" onChange={handleImageInput} />
                  {previewImage && (
                    <div className="update-image">
                      <img src={previewImage} alt="Preview" />
                    </div>
                  )}
                </Form.Item>
              </Form>
            ) : (
              <div>
                <p>
                  <strong>Material:</strong> {selectedPond.material}
                </p>
                <p>
                  <strong>Shape:</strong> {selectedPond.shape}
                </p>
                <p>
                  <strong>Water Level:</strong> {selectedPond.waterLevel}
                </p>
                <p>
                  <strong>Description:</strong> {selectedPond.description}
                </p>
                <div className="popup-image">
                  <img src={selectedPond.urlImg} alt="Pond" />
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default PondViewing;
