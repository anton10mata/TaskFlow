import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
import logo from '/task-flow-logo-no-text.png'; 

const Navbar = ({ calendars, activeCalendar, setActiveCalendar }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">
          <img src={logo} alt="TaskFlow Logo" className="navbar-logo" />
          <span>TaskFlow</span> 
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
                  onClick={() => {
                    setActiveCalendar(calendar);
                    toggleDropdown();
                  }}
                  className={`calendar-dropdown-item ${calendar.id === activeCalendar?.id ? "active" : ""}`}
                >
                  {calendar.name}
                </button>
              ))}
            </div>
          )}
        </li>
        <li className="navbar-item">
          <Link to="/dashboard" className="navbar-link">Dashboard</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;