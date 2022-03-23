import { Link } from "react-router-dom";

//design
import LoginIcon from "@mui/icons-material/Login";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const logo = "Service App";

function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <Link to="/" className="navbar-brand">
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
        <ul className="navbar-nav ml-auto">
          <li className="nav-item nav-link">
            <Link className="link-pages" to="/login">
              <LoginIcon />
              <span className="pd-1">Login</span>
            </Link>
          </li>
          <li className="nav-item nav-link">
            <Link className="link-pages" to="/register">
              <AccountCircleIcon />
              <span className="pd-1">Register</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;
