import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from '../components/footer/Footer'
import Navigation from '../components/navbar/Navigation'
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/footer/Footer";
import Navigation from "../components/navbar/Navigation";
import Header from "../components/header/Header";
import NewBlog from "../Blog/NewBlog/NewBlog";

export default function Home() {
  const [username, setUsername] = useState();
  const navigate = useNavigate();

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
            <></>
          )}
        </h1>
      </div>

      <NewBlog />

      <Footer />
    </div>
  );
}
