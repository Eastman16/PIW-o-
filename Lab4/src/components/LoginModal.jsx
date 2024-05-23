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
    <div className="modal-backdrop">
      <div className="login-modal-content">
        <div className="login-modal-header">
          <h2 className="login-modal-title">
            {isRegistering ? "Register" : "Log In"}
          </h2>
          <button className="login-modal-close" onClick={onClose}>
            ×
          </button>
        </div>
        {error && <div className="error">{error}</div>}{" "}
        <form onSubmit={handleEmailLoginOrRegister}>
          <input
            className="login-modal-input"
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Email"
            required
          />
          <input
            className="login-modal-input"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Password"
            required
          />
          <div className="login-modal-buttons">
            <button
              type="button"
              className="button secondary"
              onClick={handleGoogleLogin}
            >
              Log in with Google
            </button>
            <button type="submit" className="button primary">
              {isRegistering ? "Register" : "Log In"}
            </button>
          </div>
        </form>
        <div className="login-modal-footer">
          <button
            onClick={() => setIsRegistering(!isRegistering)}
            className="login-modal-link"
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
