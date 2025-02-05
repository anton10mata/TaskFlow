import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react"; 
import Navbar from './Navbar.jsx'; 
import './index.css'

export default function App() {
  const navigate = useNavigate();
  const [calendars, setCalendars] = useState([
    { id: 1, name: 'Work' },
    { id: 2, name: 'School' },
    { id: 3, name: 'Personal' },
  ]);
  const [activeCalendar, setActiveCalendar] = useState(null); 

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      setActiveCalendar(calendars[0]); 
    }
  }, [navigate, calendars]); 

  return (
    <div className="flex flex-col min-h-screen"> 
      <Navbar 
        calendars={calendars} 
        activeCalendar={activeCalendar} 
        setActiveCalendar={setActiveCalendar} 
      /> {/* Add Navbar and pass props */}
      <div className="flex-grow"> 
        <Outlet />
      </div>
    </div>
  );
}