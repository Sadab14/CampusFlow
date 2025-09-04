import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          CampusFlow
        </Link>
        <div className="nav-links">
          <Link to="/" className="nav-link">Courses</Link>
          <Link to="/courses/new" className="nav-link">Add Course</Link>
          <Link to="/calendar" className="nav-link">Calendar</Link>
          <span className="nav-user">Welcome, {user?.name}</span>
          <button onClick={handleLogout} className="nav-logout">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;