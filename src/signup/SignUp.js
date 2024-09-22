import React from 'react'
import './SignUp.css'
import { Link } from 'react-router-dom';
import { EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';
import { Input } from 'antd';

export default function SignUp() {
    return (
        <div className='signup-background'>
            <div className='signup-ui'>
                <div className='signup-logo'>
                    <Link to={'/'}>
                        <img className='logo' src='./img/Koi-logo.png' alt=''></img>
                    </Link>
                </div>

                <div className='signup-title'>
                    <h1 className='title'>Welcome to <br />FengShui Koi Consulting</h1>
                </div>

                <div className='signup-img'>
                    <img className='Koi-imgsignup' src='./img/Koi-login.jpg' alt=''></img>
                </div>
            </div>

            <div className='signup-form'>
                <div className='signup-form-title'>
                    <h1 className='title-welcome'>Welcome back!</h1>
                    <p className='title-welcome'>Have a good day!!!</p>
                </div>

                <div>
                    <p className='name-field'>Full name</p>
                    <input
                        type=''
                        placeholder='Enter your name'
                        className='input-field'
                        required />
                </div>

                <div className='signup-email'>
                    <p className='name-field'>E-mail</p>
                    <input
                        type='email'
                        placeholder='Type your e-mail'
                        className='input-field'
                        required />
                </div>

                <div>
                    <p className='name-field'>Password</p>
                    <Input
                        type='password'
                        placeholder='Type your password'
                        className='input-field'
                        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        required />
                </div>

                <div className='check-policy'>
                    <label>
                        <input type="checkbox" name="terms" required />
                        By creating an account means you agree to the <a href='./policy'>Terms and Conditions</a>, and our <a href='./policy'>Privacy Policy</a>
                    </label>
                </div>

                <div className='signup-button'>
                    <button className='signin-button'>
                        Sign In
                    </button>
                </div>

                <div className='forward-to-signUp'>
                    <p>Aldready have an account?
                        <Link to={'/Login'} className='link-to-signin'>Sign In</Link>
                    </p>
                </div>

            </div>
        </div>
    )
}
