import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/footer/Footer";
import Navigation from "../components/navbar/Navigation";
import Header from "../components/header/Header";

export default function Home() {
  const [username, setUsername] = useState();
  const navigate = useNavigate();

  return (
    <div className="Log-container">
      <Header />
      <Navigation />
      <Footer />
    </div>
  );
}
