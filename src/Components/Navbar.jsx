import { Link } from "react-router-dom";
import "./Navbar.css";
// import { CgProfile } from "react-icons/cg";


const Navbar = () => {
  return (
    <header className="navbar">
      <div className="logo-container">
        <img
          src="icons/download_15591428.gif"
          alt="Weather App Logo"
          className="logo"
        />
      </div>
      <nav className="nav-links">
        <Link to="/">
          <button className="nav-button">Home</button>
        </Link>
        <Link to="/login">
          <button className="nav-button">Login</button>
        </Link>
        <Link to="/signup">
          <button className="nav-button">Signup</button>
        </Link>
        <Link to="/emergency">
          <button className="nav-button emergency">Emergency</button>
        </Link>
        <Link to="/Userprofile">
          <button className="nav-button emergency">Profile</button>
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;