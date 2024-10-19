import React, { useEffect, useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import Footer from "../components/footer/Footer";
import Navigation from "../components/navbar/Navigation";
import { Link } from "react-router-dom";

import Header from "../components/header/Header";
import NewBlog from "../Blog/NewBlog/NewBlog";

export default function Home() {
  const [username, setUsername] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    const role = localStorage.getItem("userRole");
    if (token) {
      setUsername(username);
    }
    if (role === "Admin") {
      navigate("/AdminDashboard")
    }
  }, []);
  return (
    <div className="Log-container">
      <Header />
      <Navigation />

      <NewBlog />

      <Footer />
    </div>
  );
}
