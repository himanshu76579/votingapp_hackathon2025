import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import flag from '../assets/flag.png'; // 🏳️ Add Indian flag in /assets

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={flag} alt="Flag" className="flag" />
        <h1>Voting App</h1>
      </div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/vote" className="vote-btn">Vote</Link>
      </div>
    </nav>
  );
};

export default Navbar;
