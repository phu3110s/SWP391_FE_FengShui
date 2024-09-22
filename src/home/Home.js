import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../header/Header";

export default function Home() {
  const [username, setUsername] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    const username = localStorage.getItem("Username");
    if (username) {
      setUsername(username);
    }
  });
  const handleLogout = () => {
    localStorage.removeItem("Username");
    setUsername(null);
    navigate("/");
  };
  return (
    <div>
      <Header />
      <div>
        <h1>
          {username ? (
            <>
              Welcome {username}
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <Link to="./Login">Login ở đây nhoa</Link>
          )}
        </h1>
      </div>
    </div>
  );
}
