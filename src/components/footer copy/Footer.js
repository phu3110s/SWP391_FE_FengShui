import React from 'react'
import './Footer.css'
import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <div className='footer-cal'>
            <div className='cal-footer-infor'>
                <h4>Kết nối thông qua</h4>
                <p>Chính sách</p>
                <p>Điều khoản dịch vụ</p>
                <p className='copyright'>Copyright 2024 Feng Shui Koi</p>
            </div>
            <div className='cal-footer-infor'>
                <h4>Feng Shui Koi</h4>
                <p>_ Số điện thoại: 0123456789 </p>
                <p>_ Mạng xã hội</p>
            </div>
            <div className='cal-footer-infor'>
                <div className='cal-signup-footer'>
                    <h4>Đăng ký để nhận thông tin mới nhất</h4>
                    <div className='cal-button'>
                        <Link to={'/SignUp'}>Đăng Ký</Link>
                    </div>
                </div>
            </div>

        </div>
    )
}
