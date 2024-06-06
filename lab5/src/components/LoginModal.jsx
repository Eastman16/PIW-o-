import React, { useState } from "react";
import {
  loginWithEmail,
  registerWithEmail,
  loginWithGoogle,
} from "../data/userService";

const LoginModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      onClose();
    } catch (error) {
      console.error("Google login failed", error);
      setError("Google login failed. Please try again.");
    }
  };

  const handleEmailLoginOrRegister = async (e) => {
    e.preventDefault();
    setError("");
    if (password.length < 6) {
      setError("Password should be at least 6 characters long.");
      return;
    }
    try {
      if (isRegistering) {
        await registerWithEmail(email, password);
      } else {
        await loginWithEmail(email, password);
      }
      onClose();
    } catch (error) {
      console.error("Email login/register failed", error);
      setError(error.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="relative bg-white p-8 rounded-medium w-full max-w-md shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-title-medium font-title">
            {isRegistering ? "Register" : "Log In"}
          </h2>
          <button className="text-xl" onClick={onClose}>
            ×
          </button>
        </div>
        {error && <div className="mb-4 text-red-600">{error}</div>}
        <form onSubmit={handleEmailLoginOrRegister}>
          <input
            className="w-full p-2 mb-4 border border-primary-dark rounded-small"
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Email"
            required
          />
          <input
            className="w-full p-2 mb-4 border border-primary-dark rounded-small"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Password"
            required
          />
          <div className="flex justify-between items-center mb-4">
            <button
              type="button"
              className="px-4 py-2 bg-transparent border border-primary-dark rounded-medium hover:bg-gray-300 transition duration-300"
              onClick={handleGoogleLogin}
            >
              Log in with Google
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary-light rounded-medium hover:bg-hover hover:text-neutral transition duration-300"
            >
              {isRegistering ? "Register" : "Log In"}
            </button>
          </div>
        </form>
        <div className="text-center">
          <button
            onClick={() => setIsRegistering(!isRegistering)}
            className="text-primary-dark hover:text-hover transition duration-300"
          >
            {isRegistering
              ? "Already have an account? Log In"
              : "Don't have an account? Register"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
