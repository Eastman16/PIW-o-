import React, { useState } from "react";
import { hotels } from "../HotelData.ts";
import { Card1, Card2, Card3, Card4 } from "../Assets";

const images = [Card1, Card2, Card3, Card4];

const AddHotelModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    price: "",
    stars: "",
    description: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, location, price, stars, description } = formData;

    const randomImageIndex = Math.floor(Math.random() * images.length);
    const image = images[randomImageIndex];

    const newHotel = {
      id: hotels.length + 1,
      name,
      location,
      price: parseFloat(price),
      stars: parseInt(stars),
      description,
      image,
    };

    hotels.push(newHotel);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title">Add New Offer</h2>
          <button className="close" onClick={onClose}>
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            className="modal-input2"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Provide the hotel name"
            required
          />
          <textarea
            className="modal-input"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Description"
            required
            style={{ height: "100px", resize: "vertical" }}
          />
          <input
            className="modal-input2"
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            placeholder="City"
            required
          />
          <input
            className="modal-input2"
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            placeholder="Cost per room per night"
            required
          />
          <select
            className="modal-input2"
            name="stars"
            value={formData.stars}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Rating</option>
            {[1, 2, 3, 4, 5].map((star) => (
              <option key={star} value={star}>
                {star} Star(s)
              </option>
            ))}
          </select>
          <div className="modal-buttons">
            <button type="button" className="button" onClick={onClose}>
              Close
            </button>
            <button type="submit" className="button primary">
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddHotelModal;
