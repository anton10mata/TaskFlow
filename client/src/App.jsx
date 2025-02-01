import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Redirect to login page if at the root
    if (location.pathname === "/") {
      navigate("/login");
    }
  }, [location, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full">
      <Outlet />
    </div>
  );
};
