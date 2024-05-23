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
            placeholder="Hotel Name"
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
            placeholder="Location"
            required
          />
          <input
            className="modal-input2"
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            placeholder="Price per night"
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
          <input
            className="modal-input2"
            type="text"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
            placeholder="Image URL"
            required
          />
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
