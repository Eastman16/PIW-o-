import React, { useState } from "react";
import logo from "../Assets/logo.svg";
import AddHotel from "./AddHotel";

const Navbar = () => {
  const [isAddHotelModalOpen, setIsAddHotelModalOpen] = useState(false);

  const openAddHotelModal = () => {
    setIsAddHotelModalOpen(true);
  };

  const closeAddHotelModal = () => {
    setIsAddHotelModalOpen(false);
  };

  return (
    <>
      <nav className="fixed-navigation">
        <img className="logo" src={logo} />
        <ul className="nav-links">
          <li>
            <a className="nav-link" href="#">
              Home
            </a>
          </li>
          <li>
            <a className="nav-link" href="#find">
              Find offers
            </a>
          </li>
          <li>
            <a className="nav-link" href="#" onClick={openAddHotelModal}>
              Add new offer
            </a>
          </li>
          <li>
            <a className="nav-link" href="#my">
              My offers
            </a>
          </li>
          <li>
            <a className="nav-link" href="#favorites">
              Favorites
            </a>
          </li>
          <button className="button primary">Log out</button>
        </ul>
        <button className="button primary hidden">Menu</button>
      </nav>
      <AddHotel isOpen={isAddHotelModalOpen} onClose={closeAddHotelModal} />
    </>
  );
};

export default Navbar;
