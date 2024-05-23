import React, { useEffect, useState } from "react";
import arrow from "../Assets/Arrow.svg";
import { getHotels } from "../data/hotelService";
import { Link } from "react-router-dom";
import FilterModal from "../components/FilterModal";

const Browse = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [allHotels, setAllHotels] = useState([]);
  const [displayedHotels, setDisplayedHotels] = useState([]);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const fetchHotels = async () => {
    try {
      const hotelsList = await getHotels();
      console.log("Initial fetched hotels:", hotelsList);
      setAllHotels(hotelsList);
      // Filter hotels with specific IDs: 0, 1, 2, 3
      const initialDisplayedHotels = hotelsList.filter((hotel) =>
        ["0", "1", "2", "3"].includes(hotel.id)
      );
      setDisplayedHotels(initialDisplayedHotels);
    } catch (error) {
      console.error("Error fetching hotels:", error);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  const handleSearchChange = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    if (searchTerm) {
      const filtered = allHotels.filter(
        (hotel) =>
          hotel.name.toLowerCase().includes(searchTerm) ||
          hotel.location.toLowerCase().includes(searchTerm)
      );
      setDisplayedHotels(filtered);
    } else {
      const initialDisplayedHotels = allHotels.filter((hotel) =>
        ["0", "1", "2", "3"].includes(hotel.id)
      );
      setDisplayedHotels(initialDisplayedHotels);
    }
  };

  const handleApplyFilters = (priceRange, starsRange) => {
    const filtered = allHotels.filter((hotel) => {
      const matchesPrice =
        (!priceRange.min || hotel.price >= priceRange.min) &&
        (!priceRange.max || hotel.price <= priceRange.max);
      const matchesStars =
        (!starsRange.min || hotel.stars >= starsRange.min) &&
        (!starsRange.max || hotel.stars <= starsRange.max);
      return matchesPrice && matchesStars;
    });
    setDisplayedHotels(filtered);
    setIsFilterModalOpen(false);
  };

  const handleClearFilters = () => {
    setDisplayedHotels(
      allHotels.filter((hotel) => ["0", "1", "2", "3"].includes(hotel.id))
    );
    setIsFilterModalOpen(false);
  };

  return (
    <>
      <section id="hero" className="grid small-hero-section">
        <p className="title-large">Welcome, your tranquillity oasis awaits</p>
      </section>
      <section id="browse" className="browse-section">
        <p className="title-middle">Explore the hotels</p>
        <input
          className="searchbar"
          placeholder="Search by hotel name, place etc."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button
          className="button primary"
          onClick={() => setIsFilterModalOpen(true)}
        >
          Filter
        </button>
        <FilterModal
          isOpen={isFilterModalOpen}
          onClose={() => setIsFilterModalOpen(false)}
          onApplyFilters={handleApplyFilters}
          onClearFilters={handleClearFilters}
        />
        <section className="grid hotel-cards">
          {displayedHotels.map((hotel) => (
            <article key={hotel.id} className="hotel-card">
              <div
                className="card-image"
                style={{ backgroundImage: `url(${hotel.image})` }}
              >
                <p className="chip">{hotel.location}</p>
              </div>

              <p className="text-middle">{hotel.name}</p>
              <p className="text-small">{hotel.description}</p>
              <div className="hotel-card-footer">
                <p className="text-middle">{"★".repeat(hotel.stars)}</p>
                <p className="text-middle">{`${hotel.price}€/room`}</p>
              </div>
              <Link
                to={`/hotel/${hotel.id}`}
                className="button primary"
                style={{ textDecoration: "none" }}
              >
                View offer <img src={arrow} alt="Arrow" />
              </Link>
            </article>
          ))}
        </section>
      </section>
    </>
  );
};

export default Browse;
