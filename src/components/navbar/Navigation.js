import React, { useEffect, useRef, useState } from 'react'
import './Navigation.css'
import { Link } from 'react-router-dom'

export default function Navigation() {

    const images = [
        '/img/a123.jpg',
        '/img/b123.jpg',
        '/img/a12345.jpg',
        '/img/b1234.jpg',
        '/img/b12345.jpg',

    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className='navabar'>
            <div className='navbar-slide'>
                {images.map((image, index) => (
                    <img key={index}
                        src={image}
                        alt={`Slide ${index}`}
                        style={{
                            width: '100%',
                            height: '100%',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            opacity: index === currentIndex ? 1 : 0,
                            transition: 'opacity 1s ease-in-out'
                        }} />
                ))}
            </div>

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
                        <Link className='link-advise' to={'/'}>Chọn hồ theo ngũ hành</Link>
                    </li>
                </div>

                <div className='frame-link'>
                    <li className='active-navbar'>
                        <Link className='link-advise' to={'/Fish-Consulting'}>Tư vấn theo ngũ hành</Link>
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


            </ul>

            {/* <h1 className='navbar-title'>FENG-SHUI KOI</h1> */}
            {/* <p className='navbar-quotes'>Mang lại sự thịnh vượng và cân bằng cho không gian sống của bạn qua nghệ thuật phong thủy và cá Koi</p> */}
        </div>
    )
}
