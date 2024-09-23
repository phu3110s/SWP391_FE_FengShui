import React, { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

Logout.propTypes = {};

function Logout(props) {
  const [username, setUsername] = useState();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("Username");
    setUsername(null);
    navigate("/Login");
  };
}

export default Logout;
