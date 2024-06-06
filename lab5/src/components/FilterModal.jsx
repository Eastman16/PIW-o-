import React, { useState } from "react";

const FilterModal = ({ isOpen, onClose, onApplyFilters, onClearFilters }) => {
  const [priceRange, setPriceRange] = useState({ min: 0, max: 150 });
  const [starsRange, setStarsRange] = useState({ min: 1, max: 5 });

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setPriceRange((prev) => ({ ...prev, [name]: value }));
  };

  const handleStarsChange = (e) => {
    const { name, value } = e.target;
    setStarsRange((prev) => ({ ...prev, [name]: value }));
  };

  const handleApplyFilters = () => {
    onApplyFilters(priceRange, starsRange);
  };

  const handleClearFilters = () => {
    setPriceRange({ min: 0, max: 150 });
    setStarsRange({ min: 1, max: 5 });
    onClearFilters();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="relative bg-white p-8 rounded-medium w-full max-w-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-title-medium font-title">Filter Hotels</h2>
          <button className="text-xl" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="mb-4">
          <label className="">Price Range</label>
          <div className="flex gap-2">
            <input
              type="number"
              name="min"
              value={priceRange.min}
              onChange={handlePriceChange}
              placeholder="Min"
              min="0"
              className="w-full p-2 border border-primary-dark rounded-small"
            />
            <input
              type="number"
              name="max"
              value={priceRange.max}
              onChange={handlePriceChange}
              placeholder="Max"
              min="0"
              className="w-full p-2 border border-primary-dark rounded-small"
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="mb-2">Stars Range</label>
          <div className="flex gap-2">
            <input
              type="number"
              name="min"
              value={starsRange.min}
              onChange={handleStarsChange}
              placeholder="Min"
              min="1"
              max="5"
              className="w-full p-2 border border-primary-dark rounded-small"
            />
            <input
              type="number"
              name="max"
              value={starsRange.max}
              onChange={handleStarsChange}
              placeholder="Max"
              min="1"
              max="5"
              className="w-full p-2 border border-primary-dark rounded-small"
            />
          </div>
        </div>
        <div className="flex justify-end gap-4">
          <button
            className="flex items-center justify-center px-4 py-2 border border-primary-dark rounded-medium hover:bg-gray-300 transition duration-300"
            onClick={handleClearFilters}
          >
            Clear Filters
          </button>
          <button
            className="flex items-center justify-center px-4 py-2 bg-primary-light rounded-medium hover:bg-hover hover:text-neutral transition duration-300"
            onClick={handleApplyFilters}
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
