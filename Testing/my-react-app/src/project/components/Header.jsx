import React from 'react';

const Header = ({ logout }) => (
  <div className=" bg-dark text-white p-3 shadow-sm d-flex justify-content-between ">
    <h2  >
      User Portal
    </h2>
    <button
      onClick={logout}
      className="btn sm btn-outline-light me-3"
    >
      Logout
    </button>
  </div>
);

export default Header;