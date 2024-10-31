import React, { useEffect } from 'react'
import './Calculate.css'
import { useState } from 'react'
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'
import Navigation from '../components/navbar/Navigation'
import { message, Modal, Spin } from 'antd'
import fengshuiApi from '../apis/fengshui'
import userApi from '../apis/userApi'
import { ConsoleSqlOutlined } from '@ant-design/icons'
import { toast, ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
export default function Calculate() {
    const [yearOfBirth, setYearOfBirth] = useState(null)
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const [gender, setGender] = useState(null);
    const [birthDate, setBirthDate] = useState(null);
    const [loading, setLoading] = useState(false);
    const [guestElementInfo, setGuestElementInfo] = useState("");
    const [isVisible, setIsVisible] = useState(false);
    const [userFengShuiInfo, setUserFengShuiInfo] = useState(null)
    const [userFengShuiId, setUserFengShuiId] = useState(null)
    const fetchUserProfile = async () => {
        try {
            const response = await userApi.getUserProfile(userId, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response && response.data) {
                setUserFengShuiId(response.data.fengShuiId);
                
                // console.log(response.data.fengShuiId)
            }
        } catch (error) {
            if (error.response) {
                const { status } = error.response;
                if (status === 401) {
                    message.error("Lỗi");
                    return;
                } else {
                    alert("Lỗi kết nối");
                }
            }
        }
    };
    const getUserFengShuiInfo = async (e) => {
        setLoading(true);
        try {
            const response = await fengshuiApi.getFengShuiById(userFengShuiId, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            setUserFengShuiInfo(response.data)

        } catch (error) {
            if (error.response) {
                const { status } = error.response;
                if (status === 400) {
                    message.error("Mệnh của bạn không có trong hệ thống");
                } else if (status === 401) {
                    message.error("Phiên đăng nhập hết hạn")
                } else {
                    alert("Lỗi kết nối vui lòng thử lại sau")
                }
            }
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        if (token) {
            fetchUserProfile();
        }
    }, [token]);

    useEffect(() => {
        if (userFengShuiId) {
            getUserFengShuiInfo();
                // toast.success("Đã tìm ra phong thủy của bạn",{
                //     position:"top-center",autoClose:3000
                // })
        }
    }, [userFengShuiId]);


    const handlePressButtonCalFengShui = (birthDate) => {
        if (birthDate && gender) {
            calFengShui();
        } else {
            message.error("Vui lòng nhập đầy đủ ngày tháng năm sinh và giới tính");
        }
    };

    const calFengShui = async () => {
        setLoading(true);
        try {
            const response = await fengshuiApi.getFengShuiElementByDate(birthDate);
            setGuestElementInfo(response.data)
            setIsVisible(true);

        } catch (error) {
            if (error.response) {
                const { status } = error.response;
                if (status === 400) {
                    message.error("Thông tin ngày tháng nhập vào không hợp lệ. Vui lòng kiểm tra lại");
                } else if (status === 500) {
                    message.error("Lỗi kết nối đến server. Vui lòng thử lại sau");
                } else {
                    message.error("Lỗi mạng");
                }
            }
        } finally {
            setLoading(false);
        }
    };

    const handleOK = () => {
        setIsVisible(false);
    };

    const handleFindSuitablePound = () => {
        if (yearOfBirth && gender) {
            alert(`Calculated`);
        } else {
            alert('Please enter year of birth and select gender.');
        }
    };

    const handleFindSuitableKoi = () => {
        if (yearOfBirth && gender) {
            alert(`Calculated`);
        } else {
            alert('Please enter year of birth and select gender.');
        }
    };
    if (loading) return <Spin size='large' style={{ marginTop: 12 }} />
    return (
        <>
            <Header />
            <div className='calculate'>
                <div className='calculate-quotes'>
                    <div className='cal-quotes'>
                        <p>
                            Bạn đã bao giờ tự hỏi mệnh phong thủy của mình ảnh hưởng như thế nào đến không gian sống, đặc biệt là khi nuôi cá Koi hoặc trang trí hồ cá trong nhà?
                            Trong phong thủy , mỗi người đều mang một mệnh riêng - Kim, Mộc, Thủy, Hỏa, Thổ - và mỗi mệnh lại có sự hòa hợp, tương sinh hoặc xung khắc với các yếu tố khác nhau trong thiên nhiên.
                            Cá Koi và hồ cá không chỉ mang lại vẻ đẹp và sự yên bình mà còn là biểu tượng của tài lộc, may mắn.
                        </p><br /><br />
                        <p>
                            Tuy nhiên, để tạo nên một không gian phù hợp, việc hiểu rõ về mệnh của mình và cách bày trí hồ cá theo phong thủy là rất quan trọng.
                            Một hồ cá được bố trí đúng theo mệnh phong thủy không chỉ giúp bạn cảm thấy an yên mà còn kích hoạt nguồn năng lượng tích cực, thu hút vượng khí và thịnh vượng cho gia đình.
                            Hãy cùng khám phá mệnh phong thủy của bạn để biết cách bày trí hồ cá và lựa chọn cá Koi sao cho thật hài hòa và mang lại tài lộc nhé!
                        </p><br /><br />
                        <p>Bạn cần lưu ý rằng việc bày trí hồ cá không đúng cách có thể tạo ra nguồn năng lượng xấu, thậm chí mang lại điều không may.
                            Hồ cá nên được đặt ở vị trí phù hợp và chọn cá Koi có màu sắc tương sinh với mệnh của gia chủ.
                            Nếu đặt sai vị trí, chẳng hạn gần bếp hoặc trong phòng ngủ, có thể gây mất cân bằng năng lượng, ảnh hưởng đến sức khỏe và tài lộc.
                            Vì vậy, hãy tìm hiểu kỹ mệnh phong thủy của mình và tránh những sai lầm để đảm bảo hồ cá thực sự mang lại vượng khí, bình an và thịnh vượng cho gia đình bạn.
                        </p>
                    </div>
                    <div className='cal-ui'>
                        <img className='cal-img' src='/img/koi-abc.jpg'></img>
                        <img className='cal-img' src='/img/abcdef.webp'></img>
                        <img className='cal-img' src='/img/pond-abc.jpg'></img>
                    </div>

                </div>
                {/* <img className='cal-background' src='./img/koi-background.jpg' alt=''></img> */}
                <p className='calculate-title'>Tính mệnh phong thủy</p>

                <div className='calculate-board'>

                    {userFengShuiInfo ? (
                        <div className='fengshui-result'>
                            <h4>Mệnh của bạn: {userFengShuiInfo.element}</h4>
                            <h4>Màu phù hợp: {userFengShuiInfo.color}</h4>
                            <h4>Hướng phù hợp:{userFengShuiInfo.direction}</h4>
                            <h4>Số may mắn: {userFengShuiInfo.luckyNumber}</h4>
                            <h4>Mô tả: {userFengShuiInfo.description}</h4>
                        </div>
                    ) : (
                        // Code của người dùng chưa đăng nhập ở đây
                        <>
                            {/* <h4 className='form-title'>Nhập ngày tháng năm sinh và giới tính của bạn</h4> */}
                            <div className=''>
                                <div className='form-input'>
                                    <label htmlFor="year-of-birth" className='label'>
                                        Nhập ngày/ tháng/ năm sinh:
                                    </label>
                                    <input
                                        type="date"
                                        id="year-of-birth"
                                        value={birthDate}
                                        onChange={(e) => setBirthDate(e.target.value)}
                                        placeholder="Enter your Birth Date"
                                        className='label'
                                        required
                                    />
                                </div>

                                <div className='form-radio'>
                                    <label className='label'>Chọn giới tính:</label>
                                    <label className='label'>
                                        <input
                                            type="radio"
                                            name="gender"
                                            value="male"
                                            checked={gender === 'male'}
                                            onChange={() => setGender('male')}
                                        />
                                        &ensp; Nam
                                    </label>
                                    <label className='label'>
                                        <input
                                            type="radio"
                                            name="gender"
                                            value="female"
                                            checked={gender === 'female'}
                                            onChange={() => setGender('female')}
                                        />
                                        &ensp; Nữ
                                    </label>
                                </div>

                                {!loading ? (
                                    <div>
                                        <button onClick={() => handlePressButtonCalFengShui(birthDate)} className='choose-button'>
                                            Tính mệnh phong thủy
                                        </button>
                                        <button onClick={handleFindSuitablePound} className='choose-button'>
                                            Tìm hồ cá phù hợp
                                        </button>
                                        <button onClick={handleFindSuitableKoi} className='choose-button'>
                                            Tìm cá Koi phù hợp
                                        </button>
                                    </div>
                                ) : (
                                    <Spin size='large' style={{ marginTop: 12 }} />
                                )}
                            </div>


                        </>
                    )}

                    <Modal className='fengshui-result' title="Thông tin mệnh của bạn" visible={isVisible} onOk={handleOK} onCancel={handleOK}>
                        <h4>Mệnh của bạn: {guestElementInfo.element}</h4>
                        <h4>Màu phù hợp: {guestElementInfo.color}</h4>
                        <h4>Hướng phù hợp:{guestElementInfo.direction}</h4>
                        <h4>Số may mắn: {guestElementInfo.luckyNumber}</h4>
                        <h4>Mô tả: {guestElementInfo.description}</h4>
                    </Modal>
                </div>

                <ToastContainer/>

            </div>
                    
            <Footer />
            
        </>
    );
}
