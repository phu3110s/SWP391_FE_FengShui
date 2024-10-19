import React, { useEffect } from 'react'
import './Calculate.css'
import { useState } from 'react'
import Header from '../components/header/Header'
import Navigation from '../components/navbar/Navigation'
import Footer from '../components/footer/Footer'
import { message, Modal, Spin } from 'antd'
import fengshuiApi from '../apis/fengshui'
import userApi from '../apis/userApi'
import { ConsoleSqlOutlined } from '@ant-design/icons'

export default function Calculate() {
    const [yearOfBirth, setYearOfBirth] = useState('');
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const [gender, setGender] = useState(null);
    const [birthDate, setBirthDate] = useState(null);
    const [loading, setLoading] = useState(false);
    const [guestElementInfo, setGuestElementInfo] = useState("");
    const [isVisible, setIsVisible] = useState(false);
    const [userFengShuiInfo,setUserFengShuiInfo] = useState(null)
    const [userFengShuiId,setUserFengShuiId] = useState(null)
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
    const getUserFengShuiInfo = async(e) =>{
        setLoading(true);
        try{
            const response = await fengshuiApi.getFengShuiById(userFengShuiId,{
                headers:{
                    Authorization:`Bearer ${token}`,
                }
            });
            setUserFengShuiInfo(response.data)
            
        }catch(error){
            if(error.response){
                const {status} = error.response;
                if(status === 400){
                    message.error("Mệnh của bạn không có trong hệ thống");
                }else if(status === 401){
                    message.error("Phiên đăng nhập hết hạn")
                }else {
                    alert("Lỗi kết nối vui lòng thử lại sau")
                }
            }
        }finally{
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
    if(loading) return <Spin size='large' style={{marginTop:12}}/>
    return (
        <>
            <Header />
            <Navigation />
            <div className='calculate'>
                <img className='cal-background' src='./img/koi-background.jpg' alt=''></img>
                <h2 className='calculate-title'>Calculation System</h2>
                <div className='calculate-board'>
                    {userFengShuiInfo ? (
                        <div className='fengshui-result'>
                            <h4>Your Feng Shui Element: {userFengShuiInfo.element}</h4>
                            <h4>Suitable color: {userFengShuiInfo.color}</h4>
                            <h4>Suitable Direction:{userFengShuiInfo.direction}</h4>
                            <h4>Lucky Number: {userFengShuiInfo.luckyNumber}</h4>
                            <h4>Description: {userFengShuiInfo.description}</h4>
                        </div>
                    ) : (
                        // Code của người dùng chưa đăng nhập ở đây
                        <>
                            <h4 className='form-title'>Enter year of birth and select gender</h4>
                            <div className='form-input'>
                                <label htmlFor="year-of-birth" className='label'>
                                    Year of Birth:
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
                                <label className='label'>Gender:</label>
                                <label className='label'>
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="male"
                                        checked={gender === 'male'}
                                        onChange={() => setGender('male')}
                                    />
                                    Male
                                </label>
                                <label className='label'>
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="female"
                                        checked={gender === 'female'}
                                        onChange={() => setGender('female')}
                                    />
                                    Female
                                </label>
                            </div>

                            {!loading ? (
                                <div>
                                    <button onClick={() => handlePressButtonCalFengShui(birthDate)} className='choose-button'>
                                        Calculate Your Feng Shui
                                    </button>
                                    <button onClick={handleFindSuitablePound} className='choose-button'>
                                        Find the suitable Pound
                                    </button>
                                    <button onClick={handleFindSuitableKoi} className='choose-button'>
                                        Find the suitable Koi
                                    </button>
                                </div>
                            ) : (
                                <Spin size='large' style={{ marginTop: 12 }} />
                            )}
                        </>
                    )}

                    <Modal title="Your Feng Shui Info" visible={isVisible} onOk={handleOK} onCancel={handleOK}>
                    <h4>Your Feng Shui Element: {guestElementInfo.element}</h4>
                            <h4>Suitable color: {guestElementInfo.color}</h4>
                            <h4>Suitable Direction:{guestElementInfo.direction}</h4>
                            <h4>Lucky Number: {guestElementInfo.luckyNumber}</h4>
                            <h4>Description: {guestElementInfo.description}</h4>
                    </Modal>
                </div>
            </div>
            <Footer />
        </>
    );
}
