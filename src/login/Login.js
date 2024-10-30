import React, { useEffect, useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { Input, message, Spin } from "antd";
import { EyeTwoTone, EyeInvisibleOutlined } from "@ant-design/icons";
// import { login } from "../apis/auth";
import userApi from "../apis/userApi";
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  //   const [LoginResult, setLoginResult] = useState("null");
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      return;
    }
  }, [navigate]);
  const handleLogin = async () => {
    const data = {
      userId: username,
      password: password,
    };
    setLoading(true);
    try {
      if(!username || !password) {
        message.error("Vui lòng nhập đầy đủ thông tin")
        return;
      }
      const response = await userApi.login(data);
      const userRole = response.data.role;
      localStorage.setItem("token", response.data.accessToken);
      localStorage.setItem("username", response.data.fullName);
      localStorage.setItem("userId", response.data.id);
      localStorage.setItem("userImg",response.data.urlImg)
      localStorage.setItem("userRole", response.data.role);
      setTimeout(()=>{
        setLoading(true)
        if (token && userRole === "Admin") {
          navigate("/AdminDashboard");
        } else {
          navigate("/");
        }
      },700)
      message.success("login thành công")
    } catch (error) {
      if (error.response) {
        const { data, status } = error.response;
        if (status === 400) {
          message.error("Thông tin sai. Vui lòng nhập lại!!");
        } else {
          alert("Lỗi bất định");
        }
      } else {
        alert("Lỗi kết nối");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
        <div className="login-background">
      {/* <div className="login-ui">
        <div className="login-logo">
          <Link to={"/"}>
            <img className="logo" src="https://i.pinimg.com/564x/ae/3d/ca/ae3dcafe057197d6047d6b8afa453174.jpg" alt=""></img>
          </Link>
        </div>

        <div className="login-title">
          Welcome to <br />
          FengShui Koi Consulting
        </div>

      </div> */}
        
      <div className="login-form">
        <div className="login-logo">
          <Link to={"/"}>
            <img className="logo" src="/img/img-logo.jpg" alt=""></img>
          </Link>
        </div>
        <div className="login-form-title">
          <h1 className="title-welcome">Welcome back!</h1>
          <p className="title-welcome">Have a good day!!!</p>
        </div>

        <div className="login-email">
          <p className="name-field">Phone Number</p>
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
    
    </div>
    
  );
}
