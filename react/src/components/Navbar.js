import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/">Index</Link>
      <Link to="/coding">Coding</Link>
      <Link to="/design">Design</Link>
      <Link to="/about">About</Link>
    </nav>
  );
}

export default Navbar; 