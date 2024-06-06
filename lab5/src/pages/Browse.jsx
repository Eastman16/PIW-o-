import React, { useEffect, useReducer, useState } from "react";
import arrow from "../Assets/Arrow.svg";
import { getHotels } from "../data/hotelService";
import { Link } from "react-router-dom";
import FilterModal from "../components/FilterModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart as regularHeart,
  faStar as regularStar,
} from "@fortawesome/free-regular-svg-icons";
import {
  faHeart as solidHeart,
  faStar as solidStar,
} from "@fortawesome/free-solid-svg-icons";
import { useUser } from "../data/userService";

const initialState = {
  hotels: [],
  displayedHotels: [],
  favorites: [],
  isFilterModalOpen: false,
  showFavorites: false,
  prevDisplayedHotels: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_HOTELS":
      return {
        ...state,
        hotels: action.payload,
        displayedHotels: action.payload.filter((hotel) =>
          ["0", "1", "2", "3"].includes(hotel.id.toString())
        ),
      };
    case "TOGGLE_FAVORITE":
      const updatedFavorites = state.favorites.includes(action.payload)
        ? state.favorites.filter((id) => id !== action.payload)
        : [...state.favorites, action.payload];

      localStorage.setItem(
        `favorites_${action.userId}`,
        JSON.stringify(updatedFavorites)
      );

      const updatedHotels = state.hotels.map((hotel) =>
        hotel.id === action.payload
          ? { ...hotel, isFavorite: !hotel.isFavorite }
          : hotel
      );

      const updatedDisplayedHotels = state.displayedHotels.map((hotel) =>
        hotel.id === action.payload
          ? { ...hotel, isFavorite: !hotel.isFavorite }
          : hotel
      );

      return {
        ...state,
        hotels: updatedHotels,
        displayedHotels: updatedDisplayedHotels,
        favorites: updatedFavorites,
      };
    case "APPLY_FILTERS":
      return {
        ...state,
        displayedHotels: action.payload,
        isFilterModalOpen: false,
      };
    case "CLEAR_FILTERS":
      return {
        ...state,
        displayedHotels: state.hotels.filter((hotel) =>
          ["0", "1", "2", "3"].includes(hotel.id.toString())
        ),
        isFilterModalOpen: false,
        showFavorites: false,
      };
    case "TOGGLE_FILTER_MODAL":
      return { ...state, isFilterModalOpen: !state.isFilterModalOpen };
    case "SET_DISPLAYED_HOTELS":
      return { ...state, displayedHotels: action.payload };
    case "TOGGLE_SHOW_FAVORITES":
      if (state.showFavorites) {
        return {
          ...state,
          showFavorites: false,
          displayedHotels: state.prevDisplayedHotels,
        };
      } else {
        const favoriteHotels = state.hotels.filter((hotel) =>
          state.favorites.includes(hotel.id)
        );
        return {
          ...state,
          showFavorites: true,
          prevDisplayedHotels: state.displayedHotels,
          displayedHotels: favoriteHotels,
        };
      }
    case "SET_FAVORITES":
      return { ...state, favorites: action.payload };
    case "RESET_HOTELS_FAVORITES":
      const resetHotels = state.hotels.map((hotel) => ({
        ...hotel,
        isFavorite: action.payload.includes(hotel.id),
      }));
      return {
        ...state,
        hotels: resetHotels,
        displayedHotels: resetHotels.filter((hotel) =>
          ["0", "1", "2", "3"].includes(hotel.id.toString())
        ),
      };
    default:
      return state;
  }
}

const Browse = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [searchTerm, setSearchTerm] = useState("");
  const user = useUser();

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const hotelsList = await getHotels();
        const favorites = user
          ? JSON.parse(localStorage.getItem(`favorites_${user.uid}`)) || []
          : [];
        const hotelsWithFavorite = hotelsList.map((hotel) => ({
          ...hotel,
          isFavorite: favorites.includes(hotel.id),
        }));
        dispatch({ type: "SET_HOTELS", payload: hotelsWithFavorite });
        dispatch({ type: "SET_FAVORITES", payload: favorites });
      } catch (error) {
        console.error("Error fetching hotels:", error);
      }
    };

    fetchHotels();
  }, [user]);

  useEffect(() => {
    if (user) {
      const storedFavorites =
        JSON.parse(localStorage.getItem(`favorites_${user.uid}`)) || [];
      dispatch({ type: "SET_FAVORITES", payload: storedFavorites });
      dispatch({ type: "RESET_HOTELS_FAVORITES", payload: storedFavorites });
    } else {
      dispatch({ type: "SET_FAVORITES", payload: [] });
      dispatch({ type: "RESET_HOTELS_FAVORITES", payload: [] });
    }
  }, [user]);

  const handleSearchChange = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    if (searchTerm) {
      const filtered = state.hotels.filter(
        (hotel) =>
          hotel.name.toLowerCase().includes(searchTerm) ||
          hotel.location.toLowerCase().includes(searchTerm)
      );
      dispatch({ type: "SET_DISPLAYED_HOTELS", payload: filtered });
    } else {
      dispatch({
        type: "SET_DISPLAYED_HOTELS",
        payload: state.hotels.filter((hotel) =>
          ["0", "1", "2", "3"].includes(hotel.id.toString())
        ),
      });
    }
  };

  const handleApplyFilters = (priceRange, starsRange) => {
    const filtered = state.hotels.filter((hotel) => {
      const matchesPrice =
        (!priceRange.min || hotel.price >= priceRange.min) &&
        (!priceRange.max || hotel.price <= priceRange.max);
      const matchesStars =
        (!starsRange.min || hotel.stars >= starsRange.min) &&
        (!starsRange.max || hotel.stars <= starsRange.max);
      return matchesPrice && matchesStars;
    });
    dispatch({ type: "APPLY_FILTERS", payload: filtered });
  };

  const handleClearFilters = () => {
    dispatch({ type: "CLEAR_FILTERS" });
  };

  const toggleFavorite = (id) => {
    dispatch({ type: "TOGGLE_FAVORITE", payload: id, userId: user.uid });
  };

  const renderStars = (stars) => {
    const solidStars = Array(stars).fill(<FontAwesomeIcon icon={solidStar} />);
    const regularStars = Array(5 - stars).fill(
      <FontAwesomeIcon icon={regularStar} />
    );
    return [...solidStars, ...regularStars];
  };

  return (
    <>
      <section id="hero" className="grid">
        <p className="text-5xl font-title text-center mt-8 mb-10">
          Welcome, your tranquillity oasis awaits!
        </p>
      </section>
      <section
        id="browse"
        className="px-4 md:px-8 lg:px-16 min-h-screen"
        style={{ backgroundColor: "#e6e9d8" }}
      >
        <div className="flex justify-center items-center mb-8">
          <p className="text-2xl font-title mt-6">Explore the hotels</p>
        </div>
        <div className="flex flex-col items-center gap-4 mb-8">
          <input
            className="w-full max-w-md p-2 rounded-2xl"
            placeholder="Search by hotel name, place etc."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <div className="flex gap-4">
            <button
              className="px-4 py-2 bg-primary-light rounded-medium hover:bg-hover hover:text-neutral transition duration-300"
              onClick={() => dispatch({ type: "TOGGLE_FILTER_MODAL" })}
            >
              Filter
            </button>
            {user && (
              <button
                className="px-4 py-2 bg-primary-light rounded-medium hover:bg-hover hover:text-neutral transition duration-300"
                onClick={() => dispatch({ type: "TOGGLE_SHOW_FAVORITES" })}
              >
                {state.showFavorites ? "Clear favorites" : "Favorites"}
              </button>
            )}
          </div>
        </div>
        <FilterModal
          isOpen={state.isFilterModalOpen}
          onClose={() => dispatch({ type: "TOGGLE_FILTER_MODAL" })}
          onApplyFilters={handleApplyFilters}
          onClearFilters={handleClearFilters}
        />
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pb-16 pt-2">
          {state.displayedHotels.map((hotel) => (
            <article
              key={hotel.id}
              className="hotel-card bg-white shadow-lg rounded-2xl overflow-hidden mx-4"
            >
              <div
                className="card-image h-48 bg-cover bg-center relative"
                style={{ backgroundImage: `url(${hotel.image})` }}
              >
                <div className="absolute bottom-0 left-0 right-0 m-2 flex justify-between">
                  <p className="chip bg-white p-2 rounded-2xl">
                    {hotel.location}
                  </p>
                  {user && (
                    <FontAwesomeIcon
                      icon={hotel.isFavorite ? solidHeart : regularHeart}
                      className="bg-white p-3 rounded-lg cursor-pointer"
                      onClick={() => toggleFavorite(hotel.id)}
                    />
                  )}
                </div>
              </div>
              <div className="p-4">
                <p className="text-lg">{hotel.name}</p>
                <p className="text-sm text-gray-600 mt-2">
                  {hotel.description}
                </p>
                <div className="hotel-card-footer flex justify-between items-center mt-4">
                  <div className="flex">
                    {renderStars(hotel.stars).map((star, index) => (
                      <span key={index}>{star}</span>
                    ))}
                  </div>
                  <p className="text-lg">{`${hotel.price}€/room`}</p>
                </div>
                <Link
                  to={`/hotel/${hotel.id}`}
                  className="px-4 py-2 bg-primary-light rounded-medium hover:bg-hover hover:text-neutral mt-4 flex items-center justify-center transition duration-300"
                  style={{ textDecoration: "none" }}
                >
                  View offer <img src={arrow} alt="Arrow" className="ml-2" />
                </Link>
              </div>
            </article>
          ))}
        </section>
      </section>
    </>
  );
};

export default Browse;
