import React from 'react'
import './Header.css'
import { Link } from 'react-router-dom'
import { Input, Space } from 'antd';
const { Search } = Input;


// const onSearch = (value, _e, info) => console.log(info?.source, value);
export default function Header() {
    const token = localStorage.getItem("token");

    return (
        <div className='header-form'>
            {/* <img src='https://i.pinimg.com/originals/c9/bb/4c/c9bb4cf31417f2a8d59c5931d34ca67f.gif' alt=''></img> */}

            <div className='home-logo'>
                <Link to={'/'}>
                    <img className='logo-home' src='./img/Koi-logo.png' alt=''></img>
                </Link>
            </div>

            <ul className='list-active'>
                <li className='active'>
                    <Link className='link' to={'/Advise'}>Feng Shui Calculating</Link>
                </li>

                <li className="active">
                    <Link className="link" to={"/blogs"}>
                        Blog
                    </Link>
                </li>

                <li className="active">
                    <Link className="link" to={"/blog-posting"}>
                        Blog Posting
                    </Link>
                </li>

                <li className='active'>
                    <Link className='link' to={'/'}>Product Posting</Link>
                </li>

                <li className='active'>
                    <Link className='link' to={'/'}>News</Link>
                </li>
            </ul>

            <Space direction="vertical">
                <Search
                    placeholder="input search text"
                // onSearch={onSearch}
                />
            </Space>

            <div className='button-link-signin'>
                <Link className='link_to_signin' to={'./SignUp'}>Sign In</Link>
            </div>

            <div className='button-link-login'>
                <Link className='link_to_login' to={'./Login'}>Login</Link>
            </div>

            {token ? (
                <li className="active">
                    <Link className="link" to={"/MyBlog"}>
                        My Blog
                    </Link>
                </li>
            ) : null}

        </div>
    )
}
