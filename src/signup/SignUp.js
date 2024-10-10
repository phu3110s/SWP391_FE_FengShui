import React from "react";
import "./SignUp.css";
import { Link } from "react-router-dom";
import { EyeTwoTone, EyeInvisibleOutlined } from "@ant-design/icons";
import { Input, Spin } from "antd";
import { useState } from "react";
import userApi from "../apis/userApi";
export default function SignUp() {
  const [fullname, setFullname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const handleRegister = async (e) => {
    e.preventDefault();
    const userRegisterInfo = {
      fullname: fullname,
      phoneNumber: phoneNumber,
      password: password,
      gender: gender,
      birthDate: birthDate,
    };
    console.log(userRegisterInfo);
  };
  // try{
  //   const response = await userApi.register(userRegisterInfo)
  // }
  // catch{

  // }

  return (
    <div className="signup-background">
      <div className="signup-ui">
        <div className="signup-logo">
          <Link to="/">
            <img className="logo" src="./img/Koi-logo.png" alt="Logo" />
          </Link>
        </div>

        <div className="signup-title">
          Welcome to <br />
          FengShui Koi Consulting
        </div>

        {/* <div className="signup-img">
          <img className="Koi-imgsignup" src="./img/Koi-login.jpg" alt="Koi" />
        </div> */}
      </div>

      <div className="signup-form">
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
            <p className="name-field">Gender</p>
            <div>
              <label className="label-gender">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={gender === "male"}
                  onChange={(e) => setGender(e.target.value)}
                />
                Male
              </label>
              <label className="label-gender">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={gender === "female"}
                  onChange={(e) => setGender(e.target.value)}
                />
                Female
              </label>
              <label className="label-gender">
                <input
                  type="radio"
                  name="gender"
                  value="other"
                  checked={gender === "other"}
                  onChange={(e) => setGender(e.target.value)}
                />
                Other
              </label>
            </div>
          </div>
          <div>
            <p className="name-field">Birth Date</p>
            <input
              type="date"
              className="input-field"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)} // Cập nhật giá trị birthDate
              required
            />
          </div>
          <div className="check-policy">
            <label>
              <input type="checkbox" name="terms" required />
              By creating an account means you agree to the{" "}
              <a href="./policy">Terms and Conditions</a>, and our{" "}
              <a href="./policy">Privacy Policy</a>
            </label>
          </div>

          <div className="signup-button">
            <button
              className="signin-button"
              type="submit"
              onClick={handleRegister}
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
