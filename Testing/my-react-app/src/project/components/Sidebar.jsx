import React from 'react';

const Sidebar = ({ setActiveTab, activeTab, className }) => {
  return (
    // The `className` from Layout will bring the bg-primary, text-white etc.
    <div className={`sidebar ${className} d-flex flex-column sticky-top`} style={{ minHeight: '100vh' }}>
      <h5 className="text-center py-3 border-bottom border-secondary">App Menu</h5>

      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <button
            className={`nav-link w-100 text-start `}
            onClick={() => setActiveTab('dashboard')}
          >
            Dashboard
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link w-100 text-start `}
            onClick={() => setActiveTab('rating')}
          >
            Rating
          </button>
        </li>
      
      </ul>
      <div className="mt-auto p-3 text-center border-top border-secondary">
        <small>&copy; 2025 My App</small>
      </div>
    </div>
  );
};

export default Sidebar;