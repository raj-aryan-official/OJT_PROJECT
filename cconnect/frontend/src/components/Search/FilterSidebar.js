import React from 'react';
import './FilterSidebar.css';

const FilterSidebar = ({ filters, onFilterChange, activeTab }) => {
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    onFilterChange({
      [name]: type === 'checkbox' ? checked : value
    });
  };

  return (
    <div className="filter-sidebar">
      <h3>Filters</h3>

      {activeTab === 'all' || activeTab === 'products' ? (
        <>
          <div className="filter-section">
            <h4>Category</h4>
            <select
              name="category"
              value={filters.category}
              onChange={handleInputChange}
              className="filter-select"
            >
              <option value="">All Categories</option>
              <option value="electronics">Electronics</option>
              <option value="clothing">Clothing</option>
              <option value="food">Food</option>
              <option value="books">Books</option>
              <option value="home">Home & Garden</option>
            </select>
          </div>

          <div className="filter-section">
            <h4>Price Range</h4>
            <div className="price-inputs">
              <input
                type="number"
                name="minPrice"
                value={filters.minPrice}
                onChange={handleInputChange}
                placeholder="Min"
                className="price-input"
              />
              <span>to</span>
              <input
                type="number"
                name="maxPrice"
                value={filters.maxPrice}
                onChange={handleInputChange}
                placeholder="Max"
                className="price-input"
              />
            </div>
          </div>

          <div className="filter-section">
            <label className="filter-checkbox">
              <input
                type="checkbox"
                name="inStock"
                checked={filters.inStock}
                onChange={handleInputChange}
              />
              In Stock Only
            </label>
          </div>
        </>
      ) : null}

      {activeTab === 'all' || activeTab === 'shops' ? (
        <>
          <div className="filter-section">
            <h4>Location</h4>
            <input
              type="text"
              name="city"
              value={filters.city}
              onChange={handleInputChange}
              placeholder="Enter city"
              className="filter-input"
            />
          </div>

          <div className="filter-section">
            <label className="filter-checkbox">
              <input
                type="checkbox"
                name="isOpen"
                checked={filters.isOpen}
                onChange={handleInputChange}
              />
              Open Now
            </label>
          </div>
        </>
      ) : null}

      <button
        className="clear-filters"
        onClick={() => onFilterChange({
          category: '',
          minPrice: '',
          maxPrice: '',
          inStock: false,
          city: '',
          isOpen: false
        })}
      >
        Clear All Filters
      </button>
    </div>
  );
};

export default FilterSidebar; 