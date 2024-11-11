import React from "react";
import "./SignUp.css";
import { Link, useNavigate } from "react-router-dom";
import { EyeTwoTone, EyeInvisibleOutlined } from "@ant-design/icons";
import { Input, message, Radio, Spin } from "antd";
import { useState } from "react";
import userApi from "../apis/user/userApi";
export default function SignUp() {
  const [fullname, setFullname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState(null);
  const [birthDate, setBirthDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const Navigate = useNavigate()
  const validatePhone = (phoneNumber) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phoneNumber);
  };
  const handleRegister = async (e) => {

    e.preventDefault();
    if (fullname && phoneNumber && password && birthDate && gender) {
      alert("Đăng ký thành công!");
    } else {
      alert("Vui lòng điền đầy đủ các trường bắt buộc.");
    }
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
    } finally {
      setLoading(false)
    }
  }
  if (loading) return <div><Spin size="big" /></div>


  function validateDate() {
    const inputDate = new Date(document.getElementById('date').value);
    const errorMessage = document.getElementById('error-message');

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (inputDate > today) {
      errorMessage.textContent = "Ngày sinh không được là ngày trong tương lai.";
      return false;
    }

    errorMessage.textContent = "";
    return true;
  }

  const handleBlur = (field) => {
    let errorMessage = "";

    if (!field.value) {
      errorMessage = `Vui lòng nhập ${field.label}.`;
    } else if (field.name === "birthDate" && new Date(field.value) > new Date()) {
      errorMessage = "Ngày sinh không thể là ngày trong tương lai.";
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [field.name]: errorMessage
    }));
  };


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
          <h1 className="title-welcome">Chào mừng bạn đến với Feng Shui Koi!</h1>
          {/* <p className="title-welcome">Chúc bạn một ngày tốt lành!!!</p> */}
        </div>

        <form>
          <div className="Sign-In-Form">
            <p className="name-field">Họ và Tên</p>
            <input
              type="text"
              placeholder="Enter your full name"
              className="input-field"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              onBlur={() => handleBlur({ name: 'fullname', value: fullname, label: 'họ và tên' })}
              required
            />
            {errors.fullname && <p style={{ color: 'red' }}>{errors.fullname}</p>}
          </div>

          <div className="signup-phone">
            <p className="name-field">Số điện thoại</p>
            <input
              type="tel"
              placeholder="Type your phone number"
              className="input-field"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              onBlur={() => handleBlur({ name: 'phoneNumber', value: phoneNumber, label: 'số điện thoại' })}
              required
            />
            {errors.phoneNumber && <p style={{ color: 'red' }}>{errors.phoneNumber}</p>}
          </div>

          <div>
            <p className="name-field">Mật khẩu</p>
            <Input
              type="password"
              placeholder="Type your password"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => handleBlur({ name: 'password', value: password, label: 'mật khẩu' })}
              iconRender={(visible) => visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />}
              required
            />
            {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
          </div>

          <div>
            <p className="name-field">Ngày/ tháng/ năm sinh</p>
            <input
              type="date"
              className="input-field"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              onBlur={() => handleBlur({ name: 'birthDate', value: birthDate, label: 'ngày sinh' })}
              required
            />
            {errors.birthDate && <p style={{ color: 'red' }}>{errors.birthDate}</p>}
          </div>

          <div>
            <p className="gender-field">Giới tính</p>
            <div className="gender-radio">
              <Radio.Group onChange={(e) => setGender(e.target.value)} value={gender}>
                <Radio value="Male">Nam</Radio>
                <Radio value="Female">Nữ</Radio>
                <Radio value="Other">Khác</Radio>
              </Radio.Group>
            </div>
            {errors.gender && <p style={{ color: 'red' }}>{errors.gender}</p>}
          </div>

          <div className="check-policy">
            <label>
              <input
                type="checkbox"
                name="terms"
                required
              />
              Tạo một tài khoản có nghĩa là bạn đồng ý với{" "}
              <a href="./policy">Điều khoản và điều kiện</a>, và{" "}
              <a href="./policy">Chính sách bảo mật</a> của chúng tôi.
            </label>
          </div>

          <div>
            <button
              className="signup-button"
              type="submit"
              onClick={handleRegister}
            >
              Đăng Ký
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}