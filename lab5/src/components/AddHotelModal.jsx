import React, { useState } from "react";
import { addHotel } from "../data/hotelService";
import { useUser } from "../data/userService";

const AddHotelModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    price: "",
    stars: "",
    description: "",
    image: "",
  });
  const user = useUser();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, location, price, stars, description, image } = formData;

    const newHotel = {
      name,
      location,
      price: parseFloat(price),
      stars: parseInt(stars),
      description,
      image,
      userId: user.uid,
    };

    try {
      await addHotel(newHotel);
      onClose();
    } catch (error) {
      console.error("Error adding hotel:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="relative bg-white p-8 rounded-medium w-full max-w-md shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-title-medium font-title">Add New Offer</h2>
          <button className="text-xl" onClick={onClose}>
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            className="w-full p-4 mb-4 border border-primary-dark rounded-medium"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Hotel Name"
            required
          />
          <textarea
            className="h-[100px] w-full p-4 mb-4 border border-primary-dark rounded-medium"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Description"
            required
          />
          <input
            className="w-full p-4 mb-4 border border-primary-dark rounded-medium"
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            placeholder="Location"
            required
          />
          <input
            className="w-full p-4 mb-4 border border-primary-dark rounded-medium"
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            placeholder="Price per night"
            required
          />
          <select
            className="w-full p-4 mb-4 border border-primary-dark rounded-medium"
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
          <input
            className="w-full p-4 mb-4 border border-primary-dark rounded-medium"
            type="text"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
            placeholder="Image URL"
            required
          />
          <div className="flex justify-end gap-4">
            <button
              type="button"
              className="px-4 py-2 border border-primary-dark rounded-medium hover:bg-gray-300 transition duration-300"
              onClick={onClose}
            >
              Close
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary-light rounded-medium hover:bg-hover hover:text-neutral transition duration-300"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddHotelModal;
