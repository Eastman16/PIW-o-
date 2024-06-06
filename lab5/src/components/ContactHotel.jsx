import React, { useState, useRef } from "react";

const ContactHotel = ({ isOpen, onClose, hotelName }) => {
  console.log("ContactHotel component rendered");

  const messageRef = useRef(null);
  const [mailSent, setMailSent] = useState(false);
  const [sentMessage, setSentMessage] = useState("");

  const handleSend = (event) => {
    event.preventDefault();
    const message = messageRef.current.value;
    setSentMessage(message);
    setMailSent(true);
    console.log(`Mail sent to ${hotelName} with message: ${message}`);
  };

  const handleClose = () => {
    setMailSent(false);
    setSentMessage("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="relative bg-white p-8 rounded-medium w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-title-medium font-title">Contact</h2>
          <button className="text-xl" onClick={handleClose}>
            ×
          </button>
        </div>
        <p className="text-lg font-title pb-6 pt-2">
          You're contacting the {hotelName} hotel
        </p>
        <form onSubmit={handleSend}>
          <input
            className="w-full p-4 mb-6 border border-primary-dark rounded-medium"
            placeholder="Type your message here"
            ref={messageRef}
          />
          <div className="flex justify-end gap-4">
            <button
              type="button"
              className="px-4 py-2 border border-primary-dark rounded-medium hover:bg-gray-300 transition duration-300"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary-light rounded-medium hover:bg-hover hover:text-neutral transition duration-300"
            >
              Send
            </button>
          </div>
        </form>
        {mailSent && (
          <p className="text-green-500 mt-4">
            Mail sent to {hotelName} with message: {sentMessage}
          </p>
        )}
      </div>
    </div>
  );
};

export default ContactHotel;
