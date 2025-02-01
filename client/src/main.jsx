import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import App from "./App.jsx";
import LoginPage from "./pages/login.jsx";
import RegisterPage from "./pages/register.jsx";
import Home from "./pages/home.jsx";
import Dashboard from "./pages/dashboard.jsx"; // Ensure this exists
import ProtectedRoute from "./components/ProtectedRoute.jsx"; // Correct import

// Initialize Apollo Client
const client = new ApolloClient({
  uri: "http://localhost:5002/graphql",
  cache: new InMemoryCache(),
});

// Define routes properly
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "login", element: <LoginPage /> }, // ✅ Ensure this exists
      { path: "register", element: <RegisterPage /> }, // ✅ Ensure this exists
      { path: "dashboard", element: <ProtectedRoute />, children: [{ path: "", element: <Dashboard /> }] },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <ApolloProvider client={client}>
    <RouterProvider router={router} />
  </ApolloProvider>
);
