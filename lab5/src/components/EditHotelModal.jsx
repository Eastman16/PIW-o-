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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="relative bg-white p-8 rounded-medium w-full max-w-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-title-medium font-title">Edit Hotel</h2>
          <button className="text-xl" onClick={onClose}>
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            className="w-full p-2 border border-primary-dark rounded-small mb-4"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Provide the hotel name"
            required
          />
          <textarea
            className="h-[100px] w-full p-2 border border-primary-dark rounded-small mb-4"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Description"
            required
          />
          <input
            className="w-full p-2 border border-primary-dark rounded-small mb-4"
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            placeholder="City"
            required
          />
          <input
            className="w-full p-2 border border-primary-dark rounded-small mb-4"
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            placeholder="Cost per room per night"
            required
          />
          <select
            className="w-full p-2 border border-primary-dark rounded-small mb-4"
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
          <div className="flex justify-end gap-4">
            <button
              type="button"
              className="px-4 py-2 border border-primary-dark rounded-medium hover:bg-gray-300"
              onClick={onClose}
            >
              Close
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-primary-dark bg-primary-light rounded-medium hover:bg-hover hover:text-neutral"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditHotelModal;
