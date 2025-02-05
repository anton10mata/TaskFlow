import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import { Link } from "react-router-dom";

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      message
    }
  }
`;

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [login] = useMutation(LOGIN_MUTATION);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await login({ variables: { email, password } });
  
      if (response.data.login.token) {
        localStorage.setItem("token", response.data.login.token); // Store token
        navigate("/dashboard"); // Redirect after login
      } else {
        setErrorMessage(response.data.login.message);
      }
    } catch (err) {
      setErrorMessage("Invalid email sor password.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-screen">
      <div>      
        <img src="/task-flow-logo.png" alt="Task Flow Logo" className="w-[500px] mt-4 mb-[30px]" />


        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="login-email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                id="login-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 block w-full p-3 border border-gray-300 text-black rounded-lg shadow-sm"
                required
              />
            </div>

            <div className="mb-4 relative">
              <label htmlFor="login-password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative flex items-center">
                <input
                  type={showPassword ? "text" : "password"}
                  id="login-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-2 block w-full p-3 border border-gray-300 text-black rounded-lg shadow-sm pr-10"
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-indigo-500 bg-transparent p-1"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            {errorMessage && <div className="mb-4 text-sm text-red-500">{errorMessage}</div>}

            <button type="submit" className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
              Login
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="text-indigo-600 hover:underline">
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};