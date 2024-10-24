import React, { useEffect, useRef, useState } from 'react'
import './AdvertisingPosting.css'
import Header from '../../components/header/Header'
import Navigation from '../../components/navbar/Navigation'
import { Button, Input, message, Radio } from 'antd'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import postingApi from '../../apis/postingApi'
import postPayment from '../../apis/payosApi'
import paymentPlan from '../../apis/paymentApi'
import createPaymentLink from '../../apis/payosApi'
import Footer from "../../components/footer/Footer";


export default function AdvertisingPosting() {

    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    const [listPlan, setListPlan] = useState([])
    const [title, setTitle] = useState("");
    const [description, setDesription] = useState("");
    const [image, setImage] = useState(null);
    const [planID, setPlanID] = useState(null);
    const [advertisingId, setadvertisingId] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const adData = location.state || {};

    useEffect(
        () => {
            getPlanList()
            if (!token) {
                alert(
                    "Bạn phải đăng nhập mới được đăng post. Chuyển hướng sang trang login"
                );
                navigate("/Login");
            }
        },
        [token]
    );

    const getPlanList = async () => {
        const response = await paymentPlan.getPaymentPlan(1, 10)
        setListPlan(response.data.items)
    }

    const handleImageInput = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onload = () => {
                document.getElementById("image-preview").src = reader.result;
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmitPost = async (e) => {
        e.preventDefault();

        setLoading(true);
        const formData = new FormData();
        formData.append("Description", description);
        formData.append("Image", image);
        formData.append("UserId", userId);
        formData.append("PaymentPlanId", planID);
        formData.append("ItemTypeName", title);

        // for (let pair of formData.entries()) {
        //     console.log(pair[0] + ': ' + pair[1]);
        // }
        try {
            const response = await postingApi.uploadAdvertisings(formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (response.status === 201) {

                message.success("Đăng blog thành công. Chờ duyệt");
                const paymentData = {
                    advertisingId: response.data.id,
                    description: response.data.description,
                    returnUrl: 'http://localhost:3000/MyAdvertising',
                    canceUrl: 'http://localhost:3000/MyAdvertising'
                };

                const responsePayment = await createPaymentLink.postPayment(paymentData, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (responsePayment.status === 200) {
                    window.location.href = responsePayment.data
                }

                setTitle("");
                setDesription("");
                setImage(null);
            } else if (response.status === 401) {
                alert(
                    "Lỗi. Không thể đăng bài. Hết phiên đăng nhập vui lòng đăng nhập lại"
                );
            } else {
                alert("Lỗi gì bất định");
            }
        } catch (error) {
            console.error("Error response:", error.response);
            if (error.response && error.response.data && error.response.data.errors) {
                console.error("Validation errors:", error.response.data.errors);
            }
            message.error(error.message || "Có lỗi xảy ra khi đăng blog");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="posting-blog">
            <Header />
            <div className="bl-pt-form">
                <h3>Tiêu đề đăng tin và Mô tả chi tiết </h3>
                <form onSubmit={handleSubmitPost}>
                    <div className="edit-form">
                        <div className="form-left">
                            <div className="posting-blog-inputImage">
                                <label style={{ fontSize: 20 }}>Tải hình ảnh lên</label><br /><br />
                                <p>Share photos or a video</p><br />
                                <input type="file" onChange={handleImageInput} accept="image/*" />
                                {image && (
                                    <div style={{ marginTop: '10px' }}>
                                        <img id="image-preview" alt="Preview" style={{ maxWidth: '200px', maxHeight: '200px' }} />
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="form-right">
                            <div className="posting-blog-title">
                                <label style={{ fontSize: 20, }}>Tiêu đề</label>
                                <Input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Enter blog title"
                                    required
                                />
                            </div>
                            <div className="posting-blog-description">
                                <label style={{ fontSize: 20, }}>Mô tả</label>
                                <Input.TextArea
                                    type="text"
                                    value={description}
                                    onChange={(e) => setDesription(e.target.value)}
                                    placeholder="Enter your blog description"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div className="form-payment-plan">
                        <label className='title-plan'>Gói đăng bài</label><br />
                        <Radio.Group onChange={(e) => setPlanID(e.target.value)} value={planID}>
                            {listPlan.map(plan => (
                                <Radio key={plan.id} value={plan.id} className='radio-plan'>
                                    _ {plan.name}<br />
                                    _ {plan.description}<br />
                                    _ {plan.amount}
                                </Radio>
                            ))}
                        </Radio.Group>
                    </div>
                    <p className='see-more-text'> Xem thêm <Link to='/policy'>Quy định đăng tin</Link> để đăng bài một cách tốt nhất.</p>

                    <div>
                        <button className="subm-pt-button" type="submit" disabled={loading}>
                            {loading ? "Posting..." : "Đăng bài"}
                        </button>

                    </div>
                </form>
                <Link to={'/MyAdvertising'}>MyAdvertising</Link>
            </div>
            <Footer />
        </div>
    )
}
