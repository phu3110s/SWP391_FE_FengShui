import React, { useEffect, useState } from 'react';
import { Select, Button, Input, message } from 'antd';
import axios from 'axios';
import './ConsultingAdding.css';  
import fengshuiApi from '../../../apis/fengshui';
import fishApi from '../../../apis/fishApi';
import pondApi from '../../../apis/pondApi';
import consultingApi from '../../../apis/consultingApi';

const { Option } = Select;

const ConsultingAdding = () => {
  const [fishes, setFishes] = useState([]);
  const [ponds, setPonds] = useState([]);
  const [fengShuis, setFengShuis] = useState([]);
  const [description, setDescription] = useState('');
  const [selectedFengShuiId, setSelectedFengShuiId] = useState(null);
  const [selectedFish, setSelectedFish] = useState([]);
  const [selectedPonds, setSelectedPonds] = useState([]);
  const [fishImage, setFishImage] = useState(null);  
  const [pondImage, setPondImage] = useState(null);  
  const page = 1;
  const size = 100;
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchFengShuis = async () => {
      setLoading(true);
      try {
        const response = await fengshuiApi.getAllFengShui(page, size, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setFengShuis(response.data.items);
      } catch (error) {
        if (error.response) {
          const { status } = error.response;
          if (status === 500) {
            message.error('Lỗi kết nối', 3);
          }
        }
      }
    };
    const fetchFishes = async () => {
      setLoading(true);
      try {
        const response = await fishApi.getFish(page, size, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFishes(response.data.items);
      } catch (error) {
        message.error('Lỗi khi tải dữ liệu.');
      }
    };
    const fetchPonds = async () => {
      setLoading(true);
      try {
        const response = await pondApi.getPond(page, size, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPonds(response.data.items);
      } catch (error) {
        message.error('Lỗi khi tải dữ liệu.');
      } finally {
        setLoading(false);
      }
    };
    fetchFengShuis();
    fetchFishes();
    fetchPonds();
  }, []);

  const handleFengShuiChange = (value) => {
    setSelectedFengShuiId(value);
  };

  const handleFishChange = (value) => {
    setSelectedFish(value);

    // Lấy hình ảnh cá dựa trên lựa chọn
    const selectedFishObj = fishes.find(fish => fish.id === value[value.length - 1]);
    if (selectedFishObj) {
      setFishImage(selectedFishObj.urlmg);  
    }
  };

  const handlePondsChange = (value) => {
    setSelectedPonds(value);


    const selectedPondObj = ponds.find(pond => pond.id === value[value.length - 1]);
    if (selectedPondObj) {
      setPondImage(selectedPondObj.urlmg); 
    }
  };

  const handleSubmit = () => {
    const data = {
      description: description,
      fengShuiId: selectedFengShuiId,
      itemIds: [...selectedFish, ...selectedPonds],
    };
    console.log('Data', data);
    const postConsulting = async () => {
      setLoading(true);
      try {
        const response = await consultingApi.postConsulting(data, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (response.status === 201 || response.status === 200) {
          message.success('Đẩy thông tin vào Database thành công');
        }
        setSelectedFish([]);
        setSelectedFengShuiId(null);
        setSelectedPonds([]);
        setFishImage(null);  
        setPondImage(null); 
        setDescription('');   
      } catch (error) {
        if (error.response.status === 400) {
          message.warning('Thông tin nhập vào bị thiếu hoặc bị lỗi');
        } else {
          message.error('Lỗi kết nối', 5);
        }
      } finally {
        setLoading(false);
      }
    };
    postConsulting();
  };

  return (
    <div className="harmony-rating-form">
      {/* Desccription */}
      <Input
        placeholder="Nhập mô tả"
        style={{ width: '100%', marginBottom: 50 }}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      {/* Select mệnh */}
      <div className="select-fengShui-container"><Select
        placeholder="Chọn mệnh"
        style={{ width: '50%', marginBottom: 50, display: 'block', margin: '0 auto' }}
        onChange={handleFengShuiChange}
        value={selectedFengShuiId}
      >
        {fengShuis.map((fengShui) => (
          <Select.Option key={fengShui.id} value={fengShui.id}>
            {fengShui.element}
          </Select.Option>
        ))}
      </Select></div>
      

      <div className="select-row">
        <Select
          mode="multiple"
          placeholder="Chọn hồ"
          style={{ width: '48%', marginRight: '4%' }}
          onChange={handlePondsChange}
          value={selectedPonds}
        >
          {ponds.map((pond) => (
            <Select.Option key={pond.id} value={pond.id}>
              {pond.description}
            </Select.Option>
          ))}
        </Select>

        <Select
          mode="multiple"
          placeholder="Chọn cá"
          style={{ width: '48%' }}
          onChange={handleFishChange}
          value={selectedFish}
        >
          {fishes.map((fish) => (
            <Select.Option key={fish.id} value={fish.id}>{fish.name}</Select.Option>
          ))}
        </Select>
      </div>

  
      <div style={{ marginTop: 20 }}>
        {fishImage && (
          <div>
            <h4>Hình ảnh cá:</h4>
            <img src={fishImage} alt="Fish" style={{ width: '200px' }} />
          </div>
        )}
        {pondImage && (   
          <div>
            <h4>Hình ảnh hồ:</h4>
            <img src={pondImage} alt="Pond" style={{ width: '200px' }} />
          </div>
        )}
      </div>

      <Button type="primary" onClick={handleSubmit} style={{ marginTop: 20 }}>
        Gửi dữ liệu
      </Button>
    </div>
  );
};

export default ConsultingAdding;
