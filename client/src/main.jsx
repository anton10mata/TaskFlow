import React from "react";
import "./index.css";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider, from } from "@apollo/client";
import App from "./App.jsx";

import LoginPage from "./pages/login.jsx";
import RegisterPage from "./pages/register.jsx";
import Home from "./pages/home.jsx";
import Dashboard from "./pages/dashboard.jsx"; // Ensure this exists
import ProtectedRoute from "./components/ProtectedRoute.jsx"; // Correct import
import Calendar from "./components/Calendar.jsx";

const client = new ApolloClient({
  uri: "http://localhost:5002/graphql",
  cache: new InMemoryCache(),
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "login", element: <LoginPage /> }, // Ensure this exists
      { path: "register", element: <RegisterPage /> }, // Ensure this exists
      { path: "calendar", element: <Calendar />, }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <ApolloProvider client={client}>
    <RouterProvider router={router} />
  </ApolloProvider>
);

// const router = createBrowserRouter([
//   {
//     path: "/", 
//     element: <App />, 
//   }
// ]);


// const rootElement = document.getElementById("root");
// if (rootElement) {
//   ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
// }