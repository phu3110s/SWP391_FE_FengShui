import {
  Button,
  Modal,
  Popconfirm,
  Table,
  message,
  Input,
  Form,
  Spin,
} from "antd";
import React, { useEffect, useState } from "react";
import fishApi from "../../../apis/fishApi";
import "./FishViewing.css";
import { red } from "@mui/material/colors";
import { DeleteOutline } from "@mui/icons-material";
import { EditOutlined, SearchOutlined } from "@ant-design/icons";

const FishViewing = () => {
  const token = localStorage.getItem("token");
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [fishList, setFishList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedFish, setSelectedFish] = useState(null);
  const [searchText,setSearchText] = useState("")
  const [filter,setFilter] = useState([])
  const [updateData, setUpdateData] = useState({
    name: "",
    color: "",
    size: "",
    description: "",
  });
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleImageInput = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
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
      const response = await fishApi.getFish(page, size, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFishList(response.data.items);
      setTotal(response.data.total);
    } catch (error) {
      message.error("Lỗi khi tải dữ liệu.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, size]);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showFishDetails = (fish) => {
    setSelectedFish(fish);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsEditing(false);
  };

  const handleDeleteFish = async (fishId) => {
    try {
      await fishApi.deleteFish(fishId, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      message.success("Xóa thành công!");
      fetchData();
    } catch (error) {
      if (error.response) {
        const { status } = error.response;
        if (status === 400) {
          message.error("Cá đã được liên hợp với hồ, không thể xóa", 2);
        } else if (status === 401) {
          message.error("Phiên đăng nhập hết hạn");
        } else if (status === 403) {
          message.warning("Bạn không có quyền thực hiện hành động này", 5);
        } else {
          message.error("Lỗi kết nối. Vui lòng thử lại sau", 5);
        }
      }
    }
  };

  const handleUpdateFish = (fish) => {
    setIsEditing(true);
    setSelectedFish(fish);
    setPreviewImage(fish.urlImg);
    setUpdateData({
      name: fish.name,
      color: fish.color,
      size: fish.size,
      description: fish.description,
    });
    setIsModalVisible(true);
  };

  const handleSaveUpdate = async () => {
    setLoading(true);
    try {
      await fishApi.updateFish(selectedFish.id, updateData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (image) {
        const formDataToUpdateImage = new FormData();
        formDataToUpdateImage.append("imgFile", image);
        await fishApi.updateFishImage(selectedFish.id, formDataToUpdateImage, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
      message.success("Cập nhật thành công!", 5);
      setIsModalVisible(false);
      setIsEditing(false);
      fetchData(); // Refresh the data after update
    } catch (error) {
      message.error("Cập nhật thất bại.");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "Tên cá",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Kích thước",
      dataIndex: "size",
      key: "size",
    },
    {
      title: "Màu sắc",
      dataIndex: "color",
      key: "color",
    },
    {
      title: "Chi tiết",
      dataIndex: "description",
      render: (_, fish) => (
        <Button type="link" onClick={() => showFishDetails(fish)}>
          Xem chi tiết
        </Button>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, fish) => (
        <div className="action-buttons">
          <Button
            type="primary"
            style={{ backgroundColor: '#1890ff', borderColor: '#1890ff', marginBottom:15 }}
            onClick={() => handleUpdateFish(fish)}
            icon={<EditOutlined />}

          >
            Chỉnh sửa
          </Button>
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa?"
            onConfirm={() => handleDeleteFish(fish.id)}
            okText="Có"
            cancelText="Không"
          >
            <Button danger icon={<DeleteOutline />}>
              Xóa
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const handlePageChange = (pagination) => {
    setPage(pagination.current);
  };
  useEffect(()=>{
    const filtered = fishList.filter((fish)=>fish.name.toLowerCase().includes((searchText || "").toLowerCase()))
    setFilter(filtered)
  },[searchText,fishList])
  return (
    <div>
      <h1> Danh Sách Cá</h1>
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
        className="table"
        columns={columns}
        dataSource={filter.map((fish)=>({ ... fish,key:fish.id}))}
        pagination={{
          current: page,
          pageSize: size,
          total: total,
          showSizeChanger: false,
        }}
        onChange={handlePageChange}
        loading={loading}
      />
      <Modal
        title={isEditing ? "Cập nhật thông tin cá" : "Thông tin chi tiết"}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          isEditing ? (
            <Button key="save" type="primary" onClick={handleSaveUpdate}>
              {!loading ? (
                "Save"
              ) : (
                <Spin size="medium" style={{ color: red }} />
              )}
            </Button>
          ) : (
            <Button key="ok" type="primary" onClick={handleCancel}>
              OK
            </Button>
          ),
        ]}
      >
        {selectedFish && (
          <div>
            {isEditing ? (
              <Form layout="vertical">
                <Form.Item label="Name">
                  <Input
                    name="name"
                    value={updateData.name}
                    onChange={handleInputChange}
                  />
                </Form.Item>
                <Form.Item label="Size">
                  <Input
                    name="size"
                    value={updateData.size}
                    onChange={handleInputChange}
                  />
                </Form.Item>
                <Form.Item label="Color">
                  <Input
                    name="color"
                    value={updateData.color}
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
                <div className="popup-image">
                  <img src={selectedFish.urlImg} alt="Fish" />
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default FishViewing;
