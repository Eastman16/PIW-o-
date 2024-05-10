import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { hotels } from "../HotelData.ts";
import ContactHotel from "../components/ContactHotel";

const HotelPage = () => {
  let { id } = useParams();
  const hotel = hotels.find((h) => h.id.toString() === id);
  const [isModalOpen, setModalOpen] = useState(false);

  if (!hotel) {
    return <p>Hotel not found</p>;
  }

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <>
      <section id="hero" className="grid hotel-page-section">
        <p className="title-large-hotel-page">{hotel.name}</p>
        <div className="hotel-page-container">
          <div
            className="hotel-page-image"
            style={{ backgroundImage: `url(${hotel.image})` }}
          ></div>
          <div className="hotel-page-text">
            <p>
              <b>Location:</b> {hotel.location}
            </p>
            <p>
              <b>Local category:</b> {"★".repeat(hotel.stars)}
            </p>
            <p>
              <b>Price:</b> {hotel.price}€/room/night
            </p>
            <p>
              <b>Description:</b>
            </p>
            <p className="text-block">{hotel.description}</p>
            <button className="button primary" onClick={openModal}>
              Contact
            </button>
          </div>
        </div>
      </section>
      <ContactHotel
        isOpen={isModalOpen}
        onClose={closeModal}
        hotelName={hotel.name}
      />
    </>
  );
};

export default HotelPage;
