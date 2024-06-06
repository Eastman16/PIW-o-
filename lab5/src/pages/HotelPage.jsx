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
      <section id="hero" className="p-8">
        <h1 className="text-5xl font-title text-center mb-14">{hotel.name}</h1>
        <div className="flex flex-col md:flex-row items-start md:items-center">
          <div className="w-full md:w-2/3 flex justify-center">
            <div className="w-full h-96 md:h-[32rem] max-w-full md:max-w-4xl rounded-large overflow-hidden">
              <img
                src={hotel.image}
                alt={hotel.name}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
          <div className="w-full md:w-1/3 flex flex-col space-y-4">
            <p className="text-lg">
              <b>Location:</b> {hotel.location}
            </p>
            <p className="text-lg">
              <b>Local category:</b> {"★".repeat(hotel.stars)}
            </p>
            <p className="text-lg">
              <b>Price:</b> {hotel.price}€/room/night
            </p>
            <p className="text-lg">
              <b>Description:</b>
            </p>
            <p className="text-block">{hotel.description}</p>
            <div className="flex space-x-4">
              <button
                className="px-4 py-2 bg-primary-light rounded-medium hover:bg-hover hover:text-neutral transition duration-300"
                onClick={openModal}
              >
                Contact
              </button>
              {user && user.uid === hotel.userId && (
                <button
                  className="px-4 py-2 bg-primary-light rounded-medium hover:bg-hover hover:text-neutral transition duration-300"
                  onClick={openEditModal}
                >
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
