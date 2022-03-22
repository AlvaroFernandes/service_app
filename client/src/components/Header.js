import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import AuthSercice from "../service/AuthSercice";

const logo = "Service App";

const Header = (props) => {
  const { isAuthenticated, user, setIsAuthenticated, setUser } =
    useContext(AuthContext);

  const onClickLogoutHandler = () => {
    AuthSercice.logout().then((data) => {
      if (data.success) {
        setUser(data.user);
        setIsAuthenticated(false);
      }
    });
  };

  const unauthenticatedNavBar = () => {
    return (
      <>
        <Link to="/">
          <li className="nav-item nav-link">Home</li>
        </Link>
        <Link to="/login">
          <li className="nav-item nav-link">Login</li>
        </Link>
        <Link to="/signup">
          <li className="nav-item nav-link">Sign Up</li>
        </Link>
      </>
    );
  };
  const authenticatedNavBar = () => {
    return (
      <>
        <Link to="/">
          <li className="nav-item nav-link">Home</li>
        </Link>
        <Link to="/jobs">
          <li className="nav-item nav-link">Jobs</li>
        </Link>
        {user.role === "admin" ? (
          <Link to="/admin">
            <li className="nav-item nav-link">DashBoard</li>
          </Link>
        ) : null}
        <button
          type="button"
          className="btn btn-link nav-item nav-link"
          onClick={onClickLogoutHandler}
        >
          Logout
        </button>
      </>
    );
  };

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
          {!isAuthenticated ? unauthenticatedNavBar() : authenticatedNavBar()}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
