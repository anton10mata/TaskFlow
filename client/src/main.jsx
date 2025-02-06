import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import App from "./App.jsx";
import LoginPage from "./pages/login.jsx";
import RegisterPage from "./pages/register.jsx";
import Home from "./pages/home.jsx";
import Dashboard from "./pages/dashboard.jsx";  // Ensure this exists
import ProtectedRoute from "./components/ProtectedRoute.jsx"; // Correct import
import Calendar from "./components/Calendar.jsx";

// Apollo Client setup
const client = new ApolloClient({
  uri: "/graphql" || "https://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

// Router setup
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      { path: "home", element: <Home /> },
      { path: "calendar", element: <Calendar /> },
      { path: "dashboard", element: <Dashboard /> },  // Added the Dashboard route here
    ],
  },
]);

// Render the app with Apollo and RouterProvider
ReactDOM.createRoot(document.getElementById("root")).render(
  <ApolloProvider client={client}>
    <RouterProvider router={router} />
  </ApolloProvider>
);
