import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
export default function Header() {
  return (
    <div className="header-form">
      <ul className="list-active">
        <li className="active">
          <Link className="link" to={"/"}>
            Feng Shui Calculating
          </Link>
        </li>

        <li className="active">
          <Link className="link" to={"/blogs"}>
            Blog
          </Link>
        </li>

        <li className="active">
          <Link className="link" to={"/product"}>
            Product Posting
          </Link>
        </li>

        <li className="active">
          <Link className="link" to={"/"}>
            News
          </Link>
        </li>
      </ul>
    </div>
  );
}
