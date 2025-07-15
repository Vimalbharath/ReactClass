import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => (
  <div className="sidebar">
    <Link to="/">Login</Link>
    <Link to="/register">Register</Link>
    <Link to="/dashboard">Dashboard</Link>
  </div>
);

export default Sidebar;
