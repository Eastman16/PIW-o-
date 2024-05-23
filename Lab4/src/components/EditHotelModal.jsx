import React, { useState } from "react";
import { updateHotel } from "../data/hotelService";

const EditHotelModal = ({ isOpen, onClose, hotelData, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: hotelData.name,
    location: hotelData.location,
    price: hotelData.price,
    stars: hotelData.stars,
    description: hotelData.description,
    image: hotelData.image,
    userId: hotelData.userId,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedHotel = await updateHotel(hotelData.id, formData);
      onUpdate(updatedHotel);
      onClose();
    } catch (error) {
      console.error("Error updating hotel:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title">Edit Hotel</h2>
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
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditHotelModal;
