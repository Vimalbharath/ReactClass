import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({setActiveTab}) => (
  <div className="sidebar">
   <button onClick={()=>setActiveTab('dashboard')}>Dashboard</button>
    <button onClick={()=>setActiveTab('rating')}>Rating</button>
  </div>
);

export default Sidebar;
