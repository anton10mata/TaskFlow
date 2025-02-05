import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Navbar = ({ onLogout }) => {
    const navigate = useNavigate(); // Initialize useNavigate inside Navbar

  return (
    <nav className="bg-emerald-500 p-4 w-full flex justify-between items-center fixed top-0 z-50">
      <div className="flex items-center">
        <img src="/task-flow-logo.png" alt="Task Flow Logo" className="h-12 mr-4" />
        <h1 className="text-2xl font-bold text-black">My Calendar</h1>
      </div>
      <div>
        <button onClick={onLogout} className="px-4 py-2 bg-black text-white rounded-md">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;