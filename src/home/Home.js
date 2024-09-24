import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../header/Header";

export default function Home() {
  const [username, setUsername] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("TOKEN");
    const username = localStorage.getItem("username");
    console.log(token);
    console.log(username);
    if (token) {
      setUsername(username);
    }
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("response.data.accessToken");
    setUsername(null);
    navigate("/");
  };
  return (
    <div className="Log-container">
      <Header />
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
            <Link to="./Login">Login ở đây nhoa</Link>
          )}
        </h1>
      </div>
    </div>
  );
}
