import React, { useEffect, useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { Input, message, Spin } from "antd";
import { EyeTwoTone, EyeInvisibleOutlined } from "@ant-design/icons";
// import { login } from "../apis/auth";
import userApi from "../apis/user/userApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("")
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
      if (!username || !password) {
        message.error("Vui lòng nhập đầy đủ thông tin");
        return;
      }

      const response = await userApi.login(data);
      //   const response = await fetch("https://gift-4-you.onrender.com/api/v1/auth/login", {
      //     method: "POST",
      //     headers: {
      //         "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({
      //         phoneNumber,
      //         password,
      //     }),
      // });
      const userRole = response.data.role;
      localStorage.setItem("token", response.data.accessToken);
      localStorage.setItem("username", response.data.fullName);
      localStorage.setItem("userId", response.data.id);
      localStorage.setItem("userImg", response.data.urlImg);
      localStorage.setItem("userRole", response.data.role);
      setTimeout(() => {
        setLoading(true);
        if (token && userRole === "Admin") {
          navigate("/AdminDashboard");
        } else {
          navigate("/");
        }
      }, 700);
      toast.success("Đăng nhập thành công!", {
        position: "top-right",
        autoClose: 6000,
      });
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
            <h1 className="title-welcome">
              Chào mừng bạn quay trở lại với Feng Shui Koi!
            </h1>
            {/* <p className="title-welcome">Chúc bạn một ngày tốt lành!!!</p> */}
          </div>

          <div className="login-email">
            <p className="name-field">Số điện thoại</p>
            <input
              type="email"
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Type your e-mail/Username"
              className="input-field"
              required
            />
          </div>

          <div>
            <p className="name-field">Mật khẩu</p>
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
                "Đăng nhập"
              )}
            </button>
          </div>

          <div className="forward-to-signUp">
            <p>
              Bạn không có tài khoản?
              <Link to={"/SignUp"} className="link-to-signup">
                Đăng ký
              </Link>
            </p>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
