import React from 'react'
import './Header.css'
import { Link } from 'react-router-dom'
import { Input, Space } from 'antd';
const { Search } = Input;


const onSearch = (value, _e, info) => console.log(info?.source, value);
export default function Header() {

    return (
        <div className='header-form'>

            <div className='home-logo'>
                <Link to={'/'}>
                    <img className='logo-home' src='./img/Koi-logo.png' alt=''></img>
                </Link>
            </div>

            <ul className='list-active'>
                <li className='active'>
                    <Link className='link' to={'/Calculate'}>Feng Shui Calculating</Link>
                </li>

                <li className='active'>
                    <Link className='link' to={'/'}>Blog Posting</Link>
                </li>

                <li className='active'>
                    <Link className='link' to={'/'}>Porduct Posting</Link>
                </li>

                <li className='active'>
                    <Link className='link' to={'/'}>News</Link>
                </li>
            </ul>

            <Space direction="vertical">
                <Search
                    placeholder="input search text"
                    onSearch={onSearch}
                />
            </Space>

            <div className='button-link-signin'>
                <Link className='link_to_signin' to={'./SignUp'}>Sign In</Link>
            </div>

            <div className='button-link-login'>
                <Link className='link_to_login' to={'./Login'}>Login</Link>
            </div>

        </div>
    )
}
