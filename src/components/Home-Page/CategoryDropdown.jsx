import PropTypes from 'prop-types';
import React from 'react';

const CategoryDropdown = ({ categories, setCategory }) => {
  return (
    <div className="category-dropdown">
      <select onChange={(e) => setCategory(e.target.value)} className="category-select">
        <option value="">All</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

CategoryDropdown.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  setCategory: PropTypes.func.isRequired,
};

export default CategoryDropdown;
