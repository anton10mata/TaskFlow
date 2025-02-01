import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";

const REGISTER_MUTATION = gql`
  mutation Register($email: String!, $password: String!) {
    register(email: $email, password: $password) {
      email
      token
    }
  }
`;

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const [register] = useMutation(REGISTER_MUTATION);

  const handleRegister = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    try {
      const response = await register({ variables: { email, password } });

      if (response.data.register.token) {
        localStorage.setItem("token", response.data.register.token);
        navigate("/calendar"); // Redirect after registration
      } else {
        setErrorMessage("Registration failed. Please try again.");
      }
    } catch (error) {
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4">Register</h2>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label htmlFor="register-email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="register-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-sm"
              required
            />
          </div>

          {/* ✅ Password Field with Show/Hide Button */}
          <div className="mb-4 relative">
            <label htmlFor="register-password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative flex items-center">
              <input
                type={showPassword ? "text" : "password"}
                id="register-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-sm pr-10"
                required
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

          {/* ✅ Confirm Password Field with Show/Hide Button */}
          <div className="mb-4 relative">
            <label htmlFor="register-confirm-password" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <div className="relative flex items-center">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="register-confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-sm pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-indigo-500 bg-transparent p-1"
              >
                {showConfirmPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {/* Show error message if passwords do not match */}
          {errorMessage && <div className="mb-4 text-sm text-red-500">{errorMessage}</div>}

          <button type="submit" className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
            Register
          </button>
        </form>

        {/* Added link to go back to Login Page */}
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};