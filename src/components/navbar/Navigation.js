import React from 'react'
import './Navigation.css'
import { Link } from 'react-router-dom'

export default function Navigation() {
    return (
        <div className='navabar'>
            <img className='img-background' src='https://i.pinimg.com/originals/c9/bb/4c/c9bb4cf31417f2a8d59c5931d34ca67f.gif' alt=''></img>

            <ul className='list-active-navbar'>

                <div className='frame-link'>
                    <li className='active-navbar'>
                        <Link className='link-advise' to={'/'}>Ý nghĩa phong thủy</Link>
                    </li>
                </div>

                <div className='frame-link'>
                    <li className='active-navbar'>
                        <Link className='link-advise' to={'/'}>Vị trí hồ cá</Link>
                    </li>
                </div>

                <div className='frame-link'>
                    <li className='active-navbar'>
                        <Link className='link-advise' to={'/'}>Thiết kế hồ</Link>
                    </li>
                </div>

                <div className='frame-link'>
                    <li className='active-navbar'>
                        <Link className='link-advise' to={'/'}>Chọn cá theo ngũ hành</Link>
                    </li>
                </div>

                <div className='frame-link'>
                    <li className='active-navbar'>
                        <Link className='link-advise' to={'/'}>Chăm sóc cá</Link>
                    </li>
                </div>

                <div className='frame-link'>
                    <li className='active-navbar'>
                        <Link className='link-advise' to={'/'}>Phong thủy tài lộc</Link>
                    </li>
                </div>

                <div className='frame-link'>
                    <li className='active-navbar'>
                        <Link className='link-advise' to={'/'}>Tâm linh & cá Koi</Link>
                    </li>
                </div>

            </ul>

            <h1 className='navbar-title'>FENG-SHUI KOI</h1>
            <p className='navbar-quotes'>Mang lại sự thịnh vượng và cân bằng cho không gian sống của bạn qua nghệ thuật phong thủy và cá Koi</p>
        </div>
    )
}
