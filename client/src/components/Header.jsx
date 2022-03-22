import React, { useState } from "react";
import { Link } from "react-router-dom";

const logo = "Service App";
const pages = ["login", "signup"];

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <Link className="navbar-brand" to="/">
        {logo}
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          {pages.map((page) => (
            <Link className="nav-link text-uppercase" to={`/${page}`}>
              {page}
            </Link>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
