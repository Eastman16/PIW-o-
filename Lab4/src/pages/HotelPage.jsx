import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getHotels } from "../data/hotelService";
import { useUser } from "../data/userService";
import ContactHotel from "../components/ContactHotel";
import EditHotelModal from "../components/EditHotelModal";

const HotelPage = () => {
  let { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const user = useUser();

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const hotelsList = await getHotels();
        const foundHotel = hotelsList.find((h) => h.id.toString() === id);
        setHotel(foundHotel);
      } catch (error) {
        console.error("Error fetching hotel:", error);
      }
    };

    fetchHotels();
  }, [id]);

  const handleUpdateHotel = (updatedHotel) => {
    setHotel(updatedHotel);
  };

  if (!hotel) {
    return <p>Hotel not found</p>;
  }

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const openEditModal = () => setEditModalOpen(true);
  const closeEditModal = () => setEditModalOpen(false);

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
            <div className="button-group">
              <button className="button primary" onClick={openModal}>
                Contact
              </button>
              {user && user.uid === hotel.userId && (
                <button className="button primary" onClick={openEditModal}>
                  Edit
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
      <ContactHotel
        isOpen={isModalOpen}
        onClose={closeModal}
        hotelName={hotel.name}
      />
      <EditHotelModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        hotelData={hotel}
        onUpdate={handleUpdateHotel}
      />
    </>
  );
};

export default HotelPage;
