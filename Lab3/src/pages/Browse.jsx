import React, { useState } from "react";
import arrow from "../Assets/Arrow.svg";
import { hotels as initialHotels } from "../HotelData.ts";
import { Link } from "react-router-dom";

const Browse = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [displayedHotels, setDisplayedHotels] = useState(
    initialHotels.slice(0, 4)
  );

  const handleSearchChange = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    if (searchTerm) {
      const filtered = initialHotels
        .filter(
          (hotel) =>
            hotel.name.toLowerCase().includes(searchTerm) ||
            hotel.location.toLowerCase().includes(searchTerm)
        )
        .slice(0, 4);
      setDisplayedHotels(filtered);
    } else {
      setDisplayedHotels(initialHotels.slice(0, 4));
    }
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
