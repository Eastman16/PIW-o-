import React, { useState } from "react";
import logo from "../Assets/logo.svg";
import AddHotelModal from "./AddHotelModal";
import LoginModal from "./LoginModal";
import { useUser, logout } from "../data/userService";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isAddHotelModalOpen, setIsAddHotelModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const user = useUser();
  const navigate = useNavigate();

  const openAddHotelModal = () => {
    if (user) {
      setIsAddHotelModalOpen(true);
    } else {
      setIsLoginModalOpen(true);
    }
  };

  const closeAddHotelModal = () => {
    setIsAddHotelModalOpen(false);
  };

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const navigateTo = (path) => {
    navigate(path);
  };

  return (
    <>
      <nav className="fixed-navigation">
        <img className="logo" src={logo} onClick={() => navigateTo("/")} />
        <ul className="nav-links">
          <li>
            <a className="nav-link" href="#" onClick={() => navigateTo("/")}>
              Home
            </a>
          </li>
          <li>
            <a
              className="nav-link"
              href="#"
              onClick={() => navigateTo("/find-offers")}
            >
              Find offers
            </a>
          </li>
          <li>
            <a className="nav-link" href="#" onClick={openAddHotelModal}>
              Add new offer
            </a>
          </li>
          <li>
            <a
              className="nav-link"
              href="#"
              onClick={() => navigateTo("/my-offers")}
            >
              My offers
            </a>
          </li>
          <li>
            <a
              className="nav-link"
              href="#"
              onClick={() => navigateTo("/favorites")}
            >
              Favorites
            </a>
          </li>
          {user ? (
            <>
              <li>
                <span className="nav-link">
                  Welcome, {user.displayName || "User"}!
                </span>
              </li>
              <li>
                <button className="button primary" onClick={handleLogout}>
                  Log out
                </button>
              </li>
            </>
          ) : (
            <li>
              <button className="button primary" onClick={openLoginModal}>
                Log in
              </button>
            </li>
          )}
        </ul>
        <button className="button primary hidden">Menu</button>
      </nav>
      <AddHotelModal
        isOpen={isAddHotelModalOpen}
        onClose={closeAddHotelModal}
      />
      <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
    </>
  );
};

export default Navbar;
