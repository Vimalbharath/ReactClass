import React from 'react';
import { NavLink, Route, Routes, useParams } from 'react-router-dom';
import Profile from './Profile';
import Settings from './Settings';

const User = () => {
  const { username } = useParams();

  return (
    <div>
      <h1>Welcome User {username}</h1>

      <ul>
        <li><NavLink to="profile" style={({ isActive }) => isActive ? { color: 'blue' } : {}}>Profile</NavLink></li>
        <li><NavLink to="settings" style={({ isActive }) => isActive ? { color: 'blue' } : {}}>Settings</NavLink></li>
      </ul>

      <Routes>
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
      </Routes>
    </div>
  );
};

export default User;
