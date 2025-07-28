import React from 'react';

const Header = ({ logout }) => (
  // Changed bg-primary to bg-dark to match the footer.
  // The rest of the styling (text-white, p-3, shadow-sm, flexbox) remains.
  <nav className="navbar navbar-expand-lg bg-dark text-white p-3 shadow-sm d-flex justify-content-between align-items-center">
    {/* Ensure text-white for the brand against the dark background */}
    <a className="navbar-brand text-white fw-bold ms-3" href="#">
      User Portal
    </a>

    {/* Ensure btn-outline-light stands out against the dark background */}
    <button
      onClick={logout}
      className="btn btn-outline-light me-3"
    >
      Logout
    </button>
  </nav>
);

export default Header;