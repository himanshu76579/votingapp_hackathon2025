import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

// Sample: If you have a local 'flag.png' or a different official icon
import flag from '../assets/flag.png';

// Optional Profile Icon (if you have an asset for it)
// import profileIcon from '../assets/profileIcon.png';

const Navbar = () => {
  return (
    <nav className="navbar">
      {/* Left section: Logo/Flag + Title */}
      <div className="navbar-logo">
        <img src={flag} alt="Flag" className="flag" />
        <h1 className="app-title">Voting App</h1>
      </div>

      {/* Right section: Links and Vote Button */}
      <div className="navbar-links">
        <Link to="/">Home</Link>
        {/* <Link to="/info">Info</Link>  Example extra link */}
        {/* <Link to="/results">Results</Link>  Example extra link */}
        
        {/* Vote button or a separate component */}
        <Link to="/vote" className="vote-btn">Vote</Link>

      </div>
    </nav>
  );
};

export default Navbar;
