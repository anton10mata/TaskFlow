import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'; 
import './index.css';
import App from './App.jsx'; 
import LoginPage from './pages/login.jsx';
import RegisterPage from './pages/register.jsx';
import Home from './pages/home.jsx';



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // errorElement: <ErrorPage />, 
    children: [
      {
        index: true,
        element: <Home />  // change this to <LoginPage /> once server side code is working. leave as home for development purposes
      },
      {
        element: <RegisterPage />
      },
      // {
      //   element: <Home />
      // },
    ]
  }
]);


const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}

