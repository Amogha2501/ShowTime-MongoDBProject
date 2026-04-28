import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        setUser(null);
      }
    };

    checkUser();
    // Listen for storage changes in the same window (custom events or manual triggers)
    window.addEventListener('storage', checkUser);
    
    return () => window.removeEventListener('storage', checkUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand">ShowTime</Link>
      <div className="search-bar">
        <input 
          type="text" 
          className="search-input" 
          placeholder="Search for Movies, Events, Plays, Sports and Activities" 
          onChange={(e) => {
            const val = e.target.value;
            if (val.trim()) {
              navigate(`/?search=${encodeURIComponent(val)}`);
            } else {
              navigate('/');
            }
          }}
        />
      </div>
      <div className="nav-right">
        {user ? (
          <div className="user-menu">
            <Link to="/profile" className="nav-link">My Bookings</Link>
            <span className="user-greeting">Hi, {user.username}</span>
            <button className="sign-in-btn logout-btn" onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <div className="auth-links">
            <Link to="/login" className="sign-in-btn">Sign In</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;