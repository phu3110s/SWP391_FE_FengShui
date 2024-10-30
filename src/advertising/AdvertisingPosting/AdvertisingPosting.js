import React, { useEffect, useState } from "react";
import "./AdvertisingPosting.css";
import Header from "../../components/header/Header";
import Navigation from "../../components/navbar/Navigation";
import { Button, Checkbox, Input, message, Radio } from "antd";
import { Link, useNavigate } from "react-router-dom";
import postingApi from "../../apis/postingApi";
import postPayment from "../../apis/payosApi";
import paymentPlan from "../../apis/paymentApi";
import createPaymentLink from "../../apis/payosApi";
import Footer from "../../components/footer/Footer";
import { RiImageAddLine } from "react-icons/ri";

export default function AdvertisingPosting() {
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const [listPlan, setListPlan] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [paymentPlanId, setPaymentPlanId] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  const [price, setPrice] = useState("");
  const [itemTypeName, setItemTypeName] = useState("");

  useEffect(() => {
    getPlanList();
    if (!token) {
      alert(
        "Bạn phải đăng nhập mới được đăng post. Chuyển hướng sang trang login"
      );
      navigate("/Login");
    }
  }, [token]);

  const getPlanList = async () => {
    const response = await paymentPlan.getPaymentPlan(1, 10);
    setListPlan(response.data.items);
  };

  const handleImageInput = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onload = () => {
        document.getElementById("preview-image").src = reader.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitPost = async (e) => {
    e.preventDefault();


        try {
            const response = await postingApi.uploadAdvertisings(formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            // if (response.status === 201) {
            //     message.success("Đăng bài thành công. Chờ duyệt");
            //     const paymentData = {
            //         advertisingId: response.data.id,
            //         paymentPlanId: paymentPlanId,
            //         description: response.data.description,
            //         returnUrl: 'https://swp-391-fe-feng-shui-beta.vercel.app/MyAdvertising',
            //         canceUrl: 'https://swp-391-fe-feng-shui-beta.vercel.app/MyAdvertising'
            //     };

            const url = window.location.origin;
            if (response.status === 201) {
                message.success("Đăng bài thành công. Chờ duyệt");
                const paymentData = {
                    advertisingId: response.data.id,
                    paymentPlanId: paymentPlanId,
                    description: response.data.description,
                    returnUrl: `${url}/MyAdvertising`,
                    canceUrl: `${url}/MyAdvertising`
                };
                console.log(paymentData);

    setLoading(true);
    const formData = new FormData();
    formData.append("Title", title);
    formData.append("Description", description);
    formData.append("Image", image);
    formData.append("UserId", userId);
    formData.append("ItemTypeName", itemTypeName);
    formData.append("PaymentPlanId", paymentPlanId);
    formData.append("Price", price);


    try {
      const response = await postingApi.uploadAdvertisings(formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const url = window.location.origin;
      if (response.status === 201) {
        message.success("Đăng bài thành công. Chờ duyệt");
        const paymentData = {
          advertisingId: response.data.id,
          paymentPlanId: paymentPlanId,
          description: response.data.description,
          returnUrl: `${url}/MyAdvertising`,
          canceUrl: `${url}/MyAdvertising`,
        };
        console.log(paymentData);

        const responsePayment = await createPaymentLink.postPayment(
          paymentData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (responsePayment.status === 200) {
          window.location.href = responsePayment.data;
          message.success(
            "Đăng bài thành công. Đang chuyển hướng đến trang thanh toán"
          );
        }
        console.log("Payment data:", paymentData);

        setTitle("");
        setDescription("");
        setImage(null);
      } else if (response.status === 401) {
        alert(
          "Lỗi. Không thể đăng bài. Hết phiên đăng nhập vui lòng đăng nhập lại"
        );
      } else {
        alert("Lỗi gì bất định");
      }
    } catch (error) {
      if (error.response) {
        const { status } = error.response;
        if (status === 400) {
          message.error("Thông tin nhập vào không đúng yêu cầu");
        } else if (status === 401) {
          message.error("Phiên đăng nhập hết hạn");
        } else {
          message.error("Lỗi kết nối");
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="posting-blog">
      <Header />
      <div className="bl-pt-form">
        <h3>Tiêu đề đăng tin và Mô tả chi tiết</h3>
        <form onSubmit={handleSubmitPost}>
          <div className="edit-form">
          <div className="form-left">
              <div className="posting-blog-inputImage">
                <label>Tải hình ảnh lên</label>
                <br />
                <div className="image-upload">
                  <input
                    type="file"
                    onChange={handleImageInput}
                    accept="image/*"
                    id="file-input"
                  />
                  <label htmlFor="file-input" className="image-upload-label">
                    <RiImageAddLine className="upload-icon" />
                    Chọn 1 ảnh
                  </label>
                  {image && (
                    <div className="image-preview">
                      <img
                        id="preview-image"
                        alt="Preview"
                        style={{ maxWidth: "100%", marginTop: "10px" }}
                      />
                    </div>

                    <p className="see-more-text"> Xem thêm <Link target='_blank' to='/policy'>Quy định đăng tin</Link> để đăng bài một cách tốt nhất.</p>

                  )}
                </div>


              </div>
            </div>
            <div className="form-right">
              <div className="posting-blog-title">
                <label style={{ fontSize: 20 }}>Chọn một loại:</label>
                <select
                  value={itemTypeName}
                  onChange={(e) => setItemTypeName(e.target.value)}
                  required
                >
                  <option value="">--Chọn--</option>
                  <option value="fish">Fish</option>
                  <option value="pond">Pond</option>
                  <option value="decoration">Decoration</option>
                </select>
              </div>
              <div className="posting-blog-title">
                <label style={{ fontSize: 20 }}>Tiêu đề</label>
                <Input
                  type="text"
                  maxLength="100"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter blog title"
                  required
                />
              </div>
              <div className="posting-blog-description">
                <label style={{ fontSize: 20 }}>Mô tả</label>
                <Input.TextArea
                  maxLength="1000"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter your blog description"
                  required
                />
              </div>
              <div className="posting-blog-title">
                <label style={{ fontSize: 20 }}>Giá tiền</label>
                <Input
                  type="number"
                  min="0"
                  step="1000"
                  placeholder="Nhập giá tiền (VND)"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-payment-plan">
            <label className="title-plan">Gói đăng bài</label>
            <br />
            <Radio.Group
              onChange={(e) => setPaymentPlanId(e.target.value)}
              value={paymentPlanId}
            >
              {listPlan.map((plan) => (
                <Radio key={plan.id} value={plan.id} className="radio-plan">
                  _ {plan.name}
                  <br />_ {plan.description}
                  <br />_ {plan.amount}
                </Radio>
              ))}
            </Radio.Group>
          </div>
          <p className="see-more-text">
            {" "}
            Xem thêm <Link to="/policy">Quy định đăng tin</Link> để đăng bài một
            cách tốt nhất.
          </p>

          <Checkbox
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
          >
            Tôi đồng ý với điều khoản sử dụng
          </Checkbox>
          <div>
            <button
              className="subm-pt-button"
              type="submit"
              disabled={loading || !checked}
            >
              {loading ? "Posting..." : "Đăng bài"}
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}
