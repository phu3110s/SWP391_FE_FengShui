import React from "react";
import "./SignUp.css";
import { Link, useNavigate } from "react-router-dom";
import { EyeTwoTone, EyeInvisibleOutlined } from "@ant-design/icons";
import { Input, message, Radio, Spin } from "antd";
import { useState } from "react";
import userApi from "../apis/userApi";
export default function SignUp() {
  const [fullname, setFullname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState(null);
  const [birthDate, setBirthDate] = useState("");
  const [loading, setLoading] = useState(false);
  const Navigate = useNavigate()
  const validatePhone = (phoneNumber) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phoneNumber);
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (!validatePhone(phoneNumber)) {
      message.error("Nhập sai format điện thoại. Vui lòng nhập lại");
      return;
    }
    if (!birthDate) {
      message.error("Vui lòng nhập ngày tháng");
      return;

    }
    const userRegisterInfo = {
      fullname: fullname,
      phoneNumber: phoneNumber,
      password: password,
      gender: gender,
      birthDate: birthDate,
    };
    setLoading(true);
    try {
      const response = await userApi.register(userRegisterInfo);
      if (response && response.data) {
        message.success("Tạo tài khoản thành công.Chúng tôi sẽ điều hướng bạn đến trang đăng nhập");
        Navigate("/login")
      }
    } catch (error) {
      if (error.response === 401) {
        return;
      } else {
        message.error("Lỗi kết nối");
      }
    }finally{
      setLoading(false)
    }
  }
  if (loading) return <div><Spin size="big" /></div>

  return (
    <div className="signup-background">
      {/* <div className="signup-ui">
        <div className="signup-logo">
          <Link to="/">
            <img className="logo" src="./img/Koi-logo.png" alt="Logo" />
          </Link>
        </div>

        <div className="signup-title">
          Welcome to <br />
          FengShui Koi Consulting
        </div>

        <div className="signup-img">
          <img className="Koi-imgsignup" src="./img/Koi-login.jpg" alt="Koi" />
        </div>
      </div> */}

      <div className="signup-form">

        <div className="login-logo">
          <Link to={"/"}>
            <img className="logo" src="/img/img-logo.jpg" alt=""></img>
          </Link>
        </div>

        <div className="signup-form-title">
          <h1 className="title-welcome">Welcome!</h1>
          <p className="title-welcome">Have a nice day!!!</p>
        </div>

        <form>
          <div className="Sign-In-Form">
            <p className="name-field">Full name</p>
            <input
              type="text"
              placeholder="Enter your full name"
              className="input-field"
              required
              onChange={(e) => setFullname(e.target.value)}
            />
          </div>

          <div className="signup-phone">
            <p className="name-field">Phone Number</p>
            <input
              type="phone"
              placeholder="Type your phone number"
              className="input-field"
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>
          <div>
            <p className="name-field">Password</p>
            <Input
              type="password"
              placeholder="Type your password"
              className="input-field"
              onChange={(e) => setPassword(e.target.value)}
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
              required
            />
          </div>
          <div>
            <p className="name-field">Birth Date</p>
            <input
              type="date"
              className="input-field"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              required
            />
          </div>

          <div>
            <p className="gender-field">Gender</p>
            <div className="gender-radio">
              <Radio.Group onChange={(e) => setGender(e.target.value)} value={gender}>
                <Radio value="Male">Male</Radio>
                <Radio value="Female">Female</Radio>
                <Radio value="Other">Other</Radio>
              </Radio.Group>

            </div>
          </div>

          <div className="check-policy">
            <label>
              <input type="checkbox" name="terms" required />
              By creating an account means you agree to the{" "}
              <a href="./policy">Terms and Conditions</a>, and our{" "}
              <a href="./policy">Privacy Policy</a>
            </label>
          </div>

          <div>
            <button
              className="signup-button"
              type="submit"
              onClick={handleRegister}
              disabled={loading}
            >
              Sign In
            </button>
          </div>

          <div className="forward-to-signUp">
            <p>
              Already have an account?
              <Link to="/Login" className="link-to-signin">
                Sign In
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}