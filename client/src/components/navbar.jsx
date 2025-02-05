import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './navbar.css';
import logo from '/task-flow-logo-no-text.png'; 

const Navbar = ({ calendars, activeCalendar, setActiveCalendar }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation(); // To detect the current page

  // Render navbar on all pages except login and sign-up
  if (location.pathname === '/login' || location.pathname === '/register') {
    return null; // Hide navbar on login and sign-up pages
  }

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Function to handle calendar selection
  const selectCalendar = (calendar) => {
    setActiveCalendar(calendar);
    setIsDropdownOpen(false); // Close the dropdown
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">
          <img src={logo} alt="TaskFlow Logo" className="navbar-logo" />
        </Link>
      </div>
      <ul className="navbar-links">
        <li className="navbar-item">
          <Link to="/calendar" className="navbar-link">Calendar</Link>
        </li>
        <li className="navbar-item">
          <button onClick={toggleDropdown} className="calendar-dropdown-toggle">
            {activeCalendar ? activeCalendar.name : "Select Calendar"} ▼
          </button>
          {isDropdownOpen && (
            <div className="calendar-dropdown">
              {calendars.map((calendar) => (
                <button
                  key={calendar.id}
                  onClick={() => selectCalendar(calendar)}
                  className={`calendar-dropdown-item ${calendar.id === activeCalendar?.id ? "active" : ""}`}
                >
                  {calendar.name}
                </button>
              ))}
            </div>
          )}

          <Link to="/dashboard" className="navbar-link">Dashboard</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;