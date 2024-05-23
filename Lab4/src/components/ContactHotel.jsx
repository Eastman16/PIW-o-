import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { hotels } from "../HotelData.ts";

const ContactHotel = ({ isOpen, onClose, hotelName }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <button className="button close" onClick={onClose}>
          X
        </button>
        <p className="modal-text1">Contact</p>
        <p className="modal-text2">You're contacting the {hotelName} hotel</p>
        <form>
          <input className="modal-input" placeholder="Type your message here" />
          <div className="modal-buttons">
            <button type="button" className="button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="button primary">
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactHotel;
