import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { Input, Spin } from "antd";
import { EyeTwoTone, EyeInvisibleOutlined } from "@ant-design/icons";
// import { login } from "../apis/auth";
import userApi from "../apis/userApi";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  //   const [LoginResult, setLoginResult] = useState("null");
  const navigate = useNavigate();
  const handleLogin = async () => {
    const data = {
      userId: username,
      password: password,
    };
    setLoading(true);
    try {
      const response = await userApi.login(data);

      // Nếu login thành công, lưu thông tin vào localStorage và điều hướng
      localStorage.setItem("TOKEN", response.data.accessToken);
      localStorage.setItem("username", response.data.fullName);
      localStorage.setItem("userId", response.data.id);
      console.log("Login Successful:", response);
      navigate("/");
    } catch (error) {
      if (error.response) {
        const { data, status } = error.response;
        if (status === 400) {
          alert(data.error);
        } else if (status === 401) {
          alert("Thông tin người dùng nhập vào không chính xác");
        } else {
          alert("An unknown error occurred.");
        }
      } else {
        alert("Lỗi kết nối");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="login-background">
      <div className="login-ui">
        <div className="login-logo">
          <Link to={"/"}>
            <img className="logo" src="./img/Koi-logo.png" alt=""></img>
          </Link>
        </div>

        <div className="login-title">
          <h1 className="title">
            Welcome to <br />
            FengShui Koi Consulting
          </h1>
        </div>

        <div className="login-img">
          <img className="Koi-imglogin" src="./img/Koi-login.jpg" alt=""></img>
        </div>
      </div>

      <div className="login-form">
        <div className="login-form-title">
          <h1 className="title-welcome">Welcome back!</h1>
          <p className="title-welcome">Have a good day!!!</p>
        </div>

        <div className="login-email">
          <p className="name-field">E-mail</p>
          <input
            type="email"
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Type your e-mail/Username"
            className="input-field"
            required
          />
        </div>

        <div>
          <p className="name-field">Password</p>
          <Input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Type your password"
            className="input-field"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            required
          />
        </div>

        <div className="login-button">
          <button
            className="signin-button"
            type="submit"
            onClick={() => handleLogin()}
            disabled={loading}
          >
            {loading ? (
              <Spin
                size="big"
                className="custom-spin"
                style={{ marginRight: 8 }}
              />
            ) : (
              "Sign In"
            )}
          </button>
        </div>

        <div className="forward-to-signUp">
          <p>
            Don't have account?
            <Link to={"/SignUp"} className="link-to-signup">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
