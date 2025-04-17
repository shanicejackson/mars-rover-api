import React from "react";
import { Link } from "react-router-dom";
import '../styling/navbar.css'; 

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-container">
      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/rover">Rover</Link>
        </li>
        <li>
          <Link to="/photos">Photos</Link>
        </li>
      </ul>
      </div>
    </nav>
  );
}

export default Navbar;