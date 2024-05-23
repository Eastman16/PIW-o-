import React, { useState } from "react";

const FilterModal = ({ isOpen, onClose, onApplyFilters, onClearFilters }) => {
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [starsRange, setStarsRange] = useState({ min: "", max: "" });

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
    setPriceRange({ min: "", max: "" });
    setStarsRange({ min: "", max: "" });
    onClearFilters();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="filter-modal-content">
        <div className="filter-modal-header">
          <h2 className="filter-modal-title">Filter Hotels</h2>
          <button className="filter-modal-close" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="filter-modal-body">
          <div className="filter-modal-input-group">
            <label>Price Range</label>
            <div className="filter-modal-input-row">
              <input
                type="number"
                name="min"
                value={priceRange.min}
                onChange={handlePriceChange}
                placeholder="Min"
              />
              <input
                type="number"
                name="max"
                value={priceRange.max}
                onChange={handlePriceChange}
                placeholder="Max"
              />
            </div>
          </div>
          <div className="filter-modal-input-group">
            <label>Stars Range</label>
            <div className="filter-modal-input-row">
              <input
                type="number"
                name="min"
                value={starsRange.min}
                onChange={handleStarsChange}
                placeholder="Min"
              />
              <input
                type="number"
                name="max"
                value={starsRange.max}
                onChange={handleStarsChange}
                placeholder="Max"
              />
            </div>
          </div>
        </div>
        <div className="filter-modal-footer">
          <button className="button secondary" onClick={handleClearFilters}>
            Clear Filters
          </button>
          <button className="button primary" onClick={handleApplyFilters}>
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
