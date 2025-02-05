import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Calendar from "./components/Calendar";
import Navbar from './Navbar.jsx'; 

export default function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Outlet />
    </div>
  );


  // return (
  //   <div>
  //     <Calendar />
  //   </div>
  // );
}
