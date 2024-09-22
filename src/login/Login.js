import React, { useState } from 'react'
import './Login.css'
import { Link, useNavigate } from 'react-router-dom';
import { Input } from 'antd';
import { EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';
import { login } from '../apis/auth';


export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()

    const handleLogin = async () => {
        const result = await login({ userId: email, password })
        console.log(result);
        localStorage.setItem("TOKEN", result.data.accessToken)
        navigate('/')
    }
    return (
        <div className='login-background'>
            <div className='login-ui'>
                <div className='login-logo'>
                    <Link to={'/'}>
                        <img className='logo' src='./img/Koi-logo.png' alt=''></img>
                    </Link>
                </div>

                <div className='login-title'>
                    <h1 className='title'>Welcome to <br />FengShui Koi Consulting</h1>
                </div>

                <div className='login-img'>
                    <img className='Koi-imglogin' src='./img/Koi-login.jpg' alt=''></img>
                </div>
            </div>

            <div className='login-form'>
                <div className='login-form-title'>
                    <h1 className='title-welcome'>Welcome back!</h1>
                    <p className='title-welcome'>Have a good day!!!</p>
                </div>

                <div className='login-email'>
                    <p className='name-field'>E-mail</p>
                    <input
                        type='email'
                        onChange={e => setEmail(e.target.value)}
                        placeholder='Type your e-mail'
                        className='input-field'
                        required />
                </div>

                <div>
                    <p className='name-field'>Password</p>
                    <Input
                        type='password'
                        onChange={e => setPassword(e.target.value)}
                        placeholder='Type your password'
                        className='input-field'
                        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        required />
                </div>


                <div className='login-button'>
                    <button className='signin-button' onClick={() => handleLogin()}>
                        Sign In
                    </button>
                </div>

                <div className='forward-to-signUp'>
                    <p>Don't have account?
                        <Link to={'/SignUp'} className='link-to-signup'>Sign Up</Link>
                    </p>
                </div>


            </div>
        </div>
    )
}
