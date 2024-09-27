
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from '../components/footer/Footer'
import Navigation from '../components/navbar/Navigation'
import Header from "../components/header/Header";


export default function Home() {
  const [username, setUsername] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    console.log(token);
    console.log(username);
    if (token) {
      setUsername(username);
    }
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUsername(null);
    navigate("/");
  };
  return (
    <div className="Log-container">
      <Header />
      <Navigation />
      <div className="authorization-box">
        <h1>
          {username ? (
            <>
              <span>Welcome {username}</span>
              <button className="logout-button" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <Link to="./Login">Login ở đây!!!</Link>
          )}
        </h1>
      </div>
      <Footer />
    </div>
  );
}
