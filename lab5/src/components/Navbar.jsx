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
      <nav className="w-full p-5 bg-white flex justify-between items-center shadow-md z-50">
        <img
          className="h-9 w-auto cursor-pointer"
          src={logo}
          onClick={() => navigateTo("/")}
          alt="logo"
        />
        <ul className="hidden md:flex space-x-12">
          <li>
            <a
              className="text-primary-dark hover:text-hover transition duration-300"
              href="#"
              onClick={() => navigateTo("/")}
            >
              Home
            </a>
          </li>
          <li>
            <a
              className="text-primary-dark hover:text-hover transition duration-300"
              href="#"
              onClick={openAddHotelModal}
            >
              Add new offer
            </a>
          </li>
          <li>
            <a
              className="text-primary-dark hover:text-hover transition duration-300"
              href="#"
              onClick={() => navigateTo("/my-offers")}
            >
              My offers
            </a>
          </li>
          {user ? (
            <>
              <li>
                <span className="text-primary-dark">
                  Welcome, {user.displayName || "User"}!
                </span>
              </li>
              <li>
                <button
                  className="px-4 py-2 -mt-2 bg-primary-light rounded-medium hover:bg-hover hover:text-neutral transition duration-300"
                  onClick={handleLogout}
                >
                  Log out
                </button>
              </li>
            </>
          ) : (
            <li>
              <button
                className="px-4 py-2 -mt-2 bg-primary-light rounded-medium hover:bg-hover hover:text-neutral transition duration-300"
                onClick={openLoginModal}
              >
                Log in
              </button>
            </li>
          )}
        </ul>
        <button className="block md:hidden px-4 py-2 bg-primary-light rounded-medium hover:bg-hover hover:text-neutral transition duration-300">
          Menu
        </button>
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
