import { useState } from "react";
import { Link } from "react-router-dom";

import useLogin from "../hooks/useLogin";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { login, error, isLoading } = useLogin();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!email) {
      errors.email = "Veuillez entrer votre adresse e-mail.";
      isValid = false;
    }

    // Validation d'email de base
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      errors.email = "Veuillez entrer une adresse e-mail valide.";
      isValid = false;
    }

    if (!password) {
      errors.password = "Veuillez entrer votre mot de passe.";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      await login(email, password);
    }
  };

  return (
    <div className="bg-neutral-200">
      <div className="flex items-center justify-center h-screen">
        <div className="border border-white p-8 bg-white rounded shadow-md w-full sm:w-96">
          <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-black"
              >
                Email
              </label>
              <input
                type="text"
                id="email"
                name="email"
                value={email}
                onChange={handleEmailChange}
                className={`mt-1 block w-full rounded-md bg-gray-200 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 ${
                  errors.email ? "border-red-500" : ""
                }`}
              />
              {errors.email && (
                <div className="text-red-500 text-sm">{errors.email}</div>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-black"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={handlePasswordChange}
                className={`mt-1 block w-full rounded-md bg-gray-200 border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 ${
                  errors.password ? "border-red-500" : ""
                }`}
              />
              {errors.password && (
                <div className="text-red-500 text-sm">{errors.password}</div>
              )}
            </div>
            <div className="flex items-center justify-between">
              <button
                disabled={isLoading}
                type="submit"
                className="bg-cyan-400 text-white py-2 px-4 rounded-md hover:bg-cyan-500 focus:outline-none focus:bg-blue-600"
              >
                {isLoading ? "LOADING..." : "Login"}
              </button>
              <Link to="/signup" className="text-white  hover:underline">
                create an account
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
