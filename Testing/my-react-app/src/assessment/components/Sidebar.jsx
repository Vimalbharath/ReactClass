import React from 'react';

const Sidebar = ({ setActiveTab }) => {
  return (
   
    <div>
      <h5 className="text-center py-3 border-bottom ">App Menu</h5>

      <ul className="nav nav-pills flex-column ">
        <li className="nav-item">
          <button
            className={`nav-link `}
            onClick={() => setActiveTab('dashboard')}
          >
            Dashboard
          </button>
        </li>
        <li className="nav-item">
          <button
            className="nav-link "
            onClick={() => setActiveTab('rating')}
          >
            Leave Management
          </button>
        </li>
      
      </ul>
    
    </div>
  );
};

export default Sidebar;