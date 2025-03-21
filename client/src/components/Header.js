// client/src/components/Header.js
import React, { useState, useEffect } from 'react';

const Header = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Retrieve username from localStorage
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    // Clear all auth info from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('username');
    // Redirect to login
    window.location.href = '/login';
  };

  return (
    <header className="d-flex justify-content-between align-items-center p-3 bg-primary text-white">
      {/* App Title */}
      <h1 className="m-0">Goals 4 Future</h1>

      {/* User Info / Logout */}
      <div>
        {username ? (
          <>
            <span className="me-3">
              Logged in as: <strong>{username}</strong>
            </span>
            <button
              onClick={handleLogout}
              className="btn btn-outline-light btn-sm"
            >
              Logout
            </button>
          </>
        ) : (
          <span>Not logged in</span>
        )}
      </div>
    </header>
  );
};

export default Header;
